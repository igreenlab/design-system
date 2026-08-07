# Auditoria de Segurança — 2026-08-07

Biblioteca de componentes UI (Next.js 16 / React 19 / Tailwind v4 / Shadcn),
consumida por outros projetos via git submodule (não publicada no npm).
Sem backend, sem rotas de API, sem autenticação/rede além de um carregamento
de script client-side. Autor: Dario C Oliveira.

Sem segredo hardcoded (código, histórico do git, `.gitignore` cobre
corretamente `.env*`/`*.pem`), sem `dangerouslySetInnerHTML`/`innerHTML`,
sem CI/CD (não há `.github/`, então nada a auditar em pipeline/token de
publish).

## Histórico de correções

| Item | Auditoria | Status no `main` |
|---|---|---|
| PDF.js carregado via CDN sem SRI | 2026-08-07 | ⏳ Aguardando merge de `security` |
| `build_log.txt` commitado com dados de máquina local | 2026-08-07 | ⏳ Aguardando merge de `security` |
| `package.json`/`CONSUMING.md` apontam para repo pessoal fora da org | 2026-08-07 | 🟡 Não corrigido — ver Pendências |

## Corrigido nesta revisão

### Médio

- **PDF.js carregado via CDN sem SRI** (`FileDropZone/utils/pdfValidator.ts`,
  `loadPdfJs`): injeta um `<script>` apontando pro cdnjs sem `integrity`
  nem `crossorigin` — qualquer app que use `FileDropZone` (upload de PDF)
  carrega e executa esse script de terceiro, em tempo de execução, na
  origem do app consumidor. Se o CDN for comprometido ou houver MITM sem
  pinning, o script roda com os privilégios da página do consumidor.
  Adicionado `integrity` (hash SRI publicado pelo próprio cdnjs pra essa
  versão exata, `3.11.174`) e `crossorigin="anonymous"` — o browser agora
  recusa o script se o conteúdo servido não bater com o hash.

### Baixo

- **`build_log.txt` commitado com dados de máquina de desenvolvedor**:
  continha saída bruta de `next build` incluindo nome de usuário Windows
  local e caminho de pasta pessoal em português. Removido do
  versionamento e adicionado ao `.gitignore`.

## Pendências antes de fechar

- [ ] **Médio — `package.json`/`CONSUMING.md` apontam pra um repositório
      GitHub pessoal (`snksergio/igreenlink`), fora do controle da
      organização, em vez de `igreenlab/design-system`**
      (`package.json:5-7`, `CONSUMING.md:10`): a documentação oficial de
      consumo deste design system instrui `git submodule add` contra a
      conta pessoal — se ela for comprometida, desativada ou o conteúdo
      divergir, qualquer app que seguir a instrução literal fica exposto
      a um repositório fora da governança da org. **Não corrigi isso**:
      não tenho como confirmar a partir daqui que `igreenlab/design-system`
      tem o mesmo histórico/conteúdo/tags que `snksergio/igreenlink` pra
      garantir que trocar a URL não quebra quem já usa o submodule
      apontando pra conta pessoal — trocar errado seria pior que não
      trocar. Precisa de decisão do time: confirmar qual é o repositório
      canônico de fato, migrar consumidores existentes de forma
      coordenada, e só então atualizar `package.json`/`CONSUMING.md`.
