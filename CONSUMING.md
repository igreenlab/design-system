# Como Consumir o iGreen Design System

Este guia explica como usar o **iGreenLink Design System** em outro projeto via **Git Submodule**.

## 1. Adicionar como Submodule

No diretório raiz do seu projeto consumidor:

```bash
git submodule add https://github.com/snksergio/igreenlink.git igreenlink
git commit -m "feat: add igreenlink design system as submodule"
```

Isso cria a pasta `igreenlink/` dentro do seu projeto.

## 2. Configurar `tsconfig.json`

Adicione os path aliases para que o TypeScript resolva os imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@igreenlink/*": ["./igreenlink/src/*"],
      "@igreenlink-themes/*": ["./igreenlink/themes/*"]
    }
  }
}
```

## 3. Importar os Tokens (CSS)

No seu arquivo CSS principal (ex: `globals.css`), importe os tokens do design system:

```css
/* Importar os design tokens do iGreenLink */
@import "../igreenlink/themes/index.css";

/* Seu Tailwind CSS v4 */
@import "tailwindcss";

@theme {
  /* Registre os tokens que deseja usar como classes Tailwind.
     Copie os mapeamentos relevantes de igreenlink/src/app/globals.css */
  
  /* Exemplo: Cores semânticas */
  --color-bg-primary: var(--color-bg-primary);
  --color-fg-main: var(--color-fg-main);
  /* ... adicione os tokens que precisar */
}
```

> **Dica:** O arquivo `igreenlink/src/app/globals.css` contém o mapeamento completo de todos os tokens. Use-o como referência.

## 4. Configurar Tailwind Merge

Para que o `cn()` funcione corretamente com os tokens customizados:

```ts
// src/lib/utils.ts
import { cn } from "@igreenlink-themes/tailwind-merge.config";
export { cn };
```

## 5. Usar Componentes

```tsx
// Importar componentes diretamente
import { Button } from "@igreenlink/components/shadcn/button";
import { InputText } from "@igreenlink/components/igreen";

// Ou via barrel export
import { Button, InputText } from "@igreenlink/components";
```

## 6. Instalar Dependências Peer

Os componentes dependem destas libs. Instale no seu projeto:

```bash
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-select \
  @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-tabs \
  @radix-ui/react-separator @radix-ui/react-progress @radix-ui/react-collapsible \
  @radix-ui/react-dropdown-menu \
  class-variance-authority clsx tailwind-merge lucide-react framer-motion
```

## 7. Atualizar o Design System

Quando o design system receber atualizações:

```bash
# Puxar a última versão
git submodule update --remote igreenlink
git add igreenlink
git commit -m "chore: update igreenlink design system"
```

## 8. Clone com Submodules

Quando alguém clonar o projeto consumidor pela primeira vez:

```bash
git clone --recurse-submodules <url-do-projeto-consumidor>

# Ou se já clonou sem a flag:
git submodule init
git submodule update
```

---

## Estrutura de Referência

```
seu-projeto/
├── igreenlink/                  ← submodule
│   ├── src/
│   │   ├── components/
│   │   │   ├── igreen/          ← componentes customizados
│   │   │   ├── shadcn/          ← componentes Shadcn estilizados
│   │   │   └── index.ts         ← barrel export
│   │   └── lib/
│   │       └── utils.ts         ← cn() bridge
│   └── themes/
│       ├── default/             ← tokens (primitives + semantic)
│       ├── index.css            ← entry point dos tokens
│       └── tailwind-merge.config.ts
├── src/
│   └── app/
│       ├── globals.css          ← importa tokens do igreenlink
│       └── ...
├── tsconfig.json                ← path aliases configurados
└── package.json
```
