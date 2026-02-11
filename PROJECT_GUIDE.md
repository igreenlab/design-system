# 📘 iGreen Link — Guia Completo do Projeto

> **Versão**: 0.1.0  
> **Stack**: Next.js 16 · React 19 · Tailwind CSS v4 · Shadcn UI (new-york) · TypeScript 5  
> **Objetivo**: Sistema de cadastro iGreen com Design System próprio, componentes customizados e Styleguide integrado.

---

## Índice

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Estrutura de Pastas](#2-estrutura-de-pastas)
3. [Arquivos de Configuração na Raiz](#3-arquivos-de-configuração-na-raiz)
4. [Dependências e Para Que Servem](#4-dependências-e-para-que-servem)
5. [Tailwind CSS v4 — Como Funciona Neste Projeto](#5-tailwind-css-v4--como-funciona-neste-projeto)
6. [Sistema de Temas (themes/)](#6-sistema-de-temas-themes)
7. [O Fluxo Completo dos Design Tokens](#7-o-fluxo-completo-dos-design-tokens)
8. [Shadcn UI — Integração e Camada de Compatibilidade](#8-shadcn-ui--integração-e-camada-de-compatibilidade)
9. [Componentes — Hierarquia e Padrões](#9-componentes--hierarquia-e-padrões)
10. [Tailwind Merge e a Função `cn()`](#10-tailwind-merge-e-a-função-cn)
11. [Styleguide — Documentação Visual](#11-styleguide--documentação-visual)
12. [Prompts para IA](#12-prompts-para-ia)
13. [Fontes e Tipografia](#13-fontes-e-tipografia)
14. [Dark Mode](#14-dark-mode)
15. [Responsividade](#15-responsividade)
16. [Regras e Convenções do Projeto](#16-regras-e-convenções-do-projeto)
17. [Como Rodar o Projeto](#17-como-rodar-o-projeto)
18. [Checklist para IAs: O Que Precisa Existir para Funcionar](#18-checklist-para-ias-o-que-precisa-existir-para-funcionar)

---

## 1. Visão Geral da Arquitetura

O projeto segue uma arquitetura em **3 camadas de tokens** que fluem da base para a superfície:

```
┌─────────────────────────────────────────────────────────┐
│                    APLICAÇÃO (src/)                      │
│  Componentes usam classes Tailwind geradas pelos tokens  │
│  Ex: bg-bg-primary, text-fg-strong, rounded-base        │
├─────────────────────────────────────────────────────────┤
│               PONTE / BRIDGE (globals.css)               │
│  @theme {} registra CSS vars como tokens do Tailwind     │
│  Shadcn compatibility layer mapeia tokens → Shadcn vars  │
├─────────────────────────────────────────────────────────┤
│               TEMAS (themes/default/)                    │
│  Semantic → referencia primitivas (--color-bg-primary)   │
│  Primitives → valores OKLCH reais (--color-brand-600)    │
└─────────────────────────────────────────────────────────┘
```

### Diagrama de Dependências

```
globals.css
  ├── @import "../../themes/index.css"         ←── Carrega o tema
  │     ├── themes/default/primitives/index.css
  │     │     ├── colors.css    (valores OKLCH reais)
  │     │     └── sizes.css     (alturas, radius, ring, breakpoints)
  │     └── themes/default/semantic/index.css
  │           ├── colors.css      (bg-*, fg-*, border-*, ring-*)
  │           ├── typography.css  (classes .text-display-lg, etc.)
  │           └── utilities.css   (classes .shadows-boxshadow-*)
  │
  ├── @import "tailwindcss"                    ←── Engine do Tailwind v4
  ├── @plugin "tailwindcss-animate"            ←── Animações para Shadcn
  ├── @custom-variant dark (&:is(.dark *))     ←── Dark mode via classe
  │
  ├── @theme { ... }                           ←── PONTE: var() → Tailwind
  │
  └── @import "../../themes/default/semantic/compatibility.css"
        └── Shadcn vars (--primary, --background, etc.)
```

---

## 2. Estrutura de Pastas

```
igreenlink/
│
├── 📄 package.json              # Dependências e scripts
├── 📄 tsconfig.json             # TypeScript + path aliases
├── 📄 next.config.ts            # Configuração do Next.js
├── 📄 postcss.config.mjs        # PostCSS → @tailwindcss/postcss
├── 📄 eslint.config.mjs         # ESLint flat config
├── 📄 components.json           # Configuração do Shadcn CLI
│
├── 📁 themes/                   # 🎨 DESIGN SYSTEM - Fonte única de verdade
│   ├── 📄 index.css             # Entry point do tema (importa default/)
│   ├── 📄 tailwind-merge.config.ts  # Configuração do cn() / twMerge
│   └── 📁 default/              # Tema padrão
│       ├── 📁 primitives/       # Valores base (cores OKLCH, tamanhos)
│       │   ├── 📄 index.css     # Entry point das primitivas
│       │   ├── 📄 colors.css    # Escalas de cor: brand, neutral, etc.
│       │   └── 📄 sizes.css     # Form heights, radius, ring, breakpoints
│       └── 📁 semantic/         # Tokens semânticos (referenciam primitivas)
│           ├── 📄 index.css     # Entry point dos semânticos
│           ├── 📄 colors.css    # bg-*, fg-*, border-*, ring-* + dark mode
│           ├── 📄 typography.css    # Classes de texto (.text-display-lg, etc.)
│           ├── 📄 utilities.css     # Sombras (.shadows-boxshadow-*)
│           └── 📄 compatibility.css # Ponte Shadcn (--primary, --background, etc.)
│
├── 📁 prompts/                  # 🤖 Prompts para IAs
│   ├── 📄 create-igreen-component.md   # Como criar componente iGreen
│   ├── 📄 create-shadcn-component.md   # Como instalar componente Shadcn
│   ├── 📄 create-styleguide-page.md    # Como criar página do styleguide
│   └── 📄 extract-component-figma.md   # Como extrair do Figma
│
├── 📁 src/                      # 🏗️ CÓDIGO-FONTE
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── 📄 globals.css       # 🔑 ARQUIVO CENTRAL - Ponte tema↔Tailwind
│   │   ├── 📄 layout.tsx        # Root Layout (fontes Geist, metadata)
│   │   ├── 📄 page.tsx          # Página raiz
│   │   └── 📁 styleguide/      # Documentação visual do Design System
│   │       ├── 📄 layout.tsx    # Layout do styleguide (sidebar + conteúdo)
│   │       ├── 📄 navigation.ts # Configuração da navegação lateral
│   │       ├── 📄 page.tsx      # Página principal (Design Tokens)
│   │       ├── 📁 colors/       # Página de cores
│   │       ├── 📁 typography/   # Página de tipografia
│   │       ├── 📁 sizes/        # Página de tamanhos
│   │       ├── 📁 shadows/      # Página de sombras
│   │       ├── 📁 radius/       # Página de border-radius
│   │       ├── 📁 documentation/    # Documentação geral
│   │       ├── 📁 installation/     # Guia de instalação
│   │       ├── 📁 components/       # Páginas de cada componente
│   │       │   ├── 📁 button/
│   │       │   ├── 📁 input/
│   │       │   ├── 📁 input-text/
│   │       │   ├── 📁 dialog/
│   │       │   └── ... (24 subpastas)
│   │       ├── 📁 examples/     # Exemplos de uso real
│   │       └── 📁 ui/           # Componentes auxiliares do styleguide
│   │
│   ├── 📁 components/           # Todos os componentes do projeto
│   │   ├── 📁 igreen/          # 🟢 Componentes CUSTOMIZADOS do Design System
│   │   │   ├── 📄 index.ts     # Barrel export de todos os iGreen
│   │   │   ├── 📁 AccordionSelect/
│   │   │   ├── 📁 Choice/
│   │   │   ├── 📁 Dialog/
│   │   │   ├── 📁 DialogAlert/
│   │   │   ├── 📁 FileDropZone/
│   │   │   ├── 📁 Icon/
│   │   │   ├── 📁 InputText/
│   │   │   ├── 📁 ProgressCard/
│   │   │   ├── 📁 ScreenStep/
│   │   │   ├── 📁 ScreenSteppers/
│   │   │   ├── 📁 StepperProgress/
│   │   │   ├── 📁 TextCollapse/
│   │   │   └── 📁 ToggleCard/
│   │   └── 📁 shadcn/          # 🔷 Componentes Shadcn UI (customizados)
│   │       ├── 📄 alert.tsx
│   │       ├── 📄 button.tsx
│   │       ├── 📄 checkbox.tsx
│   │       ├── 📄 collapsible.tsx
│   │       ├── 📄 dialog.tsx
│   │       ├── 📄 dropdown-menu.tsx
│   │       ├── 📄 field.tsx
│   │       ├── 📄 input-group.tsx
│   │       ├── 📄 input.tsx
│   │       ├── 📄 label.tsx
│   │       ├── 📄 progress.tsx
│   │       ├── 📄 select.tsx
│   │       ├── 📄 separator.tsx
│   │       ├── 📄 spinner.tsx
│   │       ├── 📄 tabs.tsx
│   │       └── 📄 textarea.tsx
│   │
│   ├── 📁 img/                 # Imagens estáticas do projeto
│   └── 📁 lib/                 # Utilitários
│       └── 📄 utils.ts         # Re-exporta cn() do tailwind-merge.config.ts
│
├── 📁 public/                   # Assets estáticos servidos pelo Next.js
└── 📁 favicon/                  # Ícones do app
```

---

## 3. Arquivos de Configuração na Raiz

### 3.1 `package.json`

```json
{
  "name": "igreenlink",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

**Scripts disponíveis**:
| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `npm run dev` | Inicia o servidor de desenvolvimento |
| `build` | `npm run build` | Gera o build de produção |
| `start` | `npm run start` | Inicia o servidor de produção |
| `lint` | `npm run lint` | Executa o ESLint |

---

### 3.2 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"],
      "@themes/*": ["./themes/*"]
    }
  }
}
```

**Path aliases críticos**:
| Alias | Aponta para | Uso |
|-------|------------|-----|
| `@/*` | `./src/*` | Acesso a qualquer arquivo dentro de `src/` |
| `@themes/*` | `./themes/*` | Acesso direto ao sistema de temas |

**Exemplos de uso**:
```typescript
import { Button } from "@/components/shadcn/button"      // @/* → src/*
import { cn } from "@/lib/utils"                          // @/* → src/lib/utils.ts
import { cn as themeCn } from "@themes/tailwind-merge.config" // @themes/* → themes/*
```

---

### 3.3 `postcss.config.mjs`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

> **CRÍTICO**: No Tailwind v4, **NÃO existe `tailwind.config.js`**. O PostCSS usa `@tailwindcss/postcss` como plugin. Toda a configuração é feita dentro do `globals.css` usando `@theme {}`.

---

### 3.4 `next.config.ts`

```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
```

Configuração mínima — o Next.js 16 com App Router faz a maior parte automaticamente.

---

### 3.5 `eslint.config.mjs`

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
export default eslintConfig;
```

ESLint flat config (v9) com regras de Core Web Vitals e TypeScript.

---

### 3.6 `components.json` (Shadcn CLI)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/shadcn",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

**Pontos críticos**:
| Campo | Valor | Explicação |
|-------|-------|------------|
| `style` | `"new-york"` | Estilo visual do Shadcn (mais compacto, moderno) |
| `rsc` | `true` | Suporte a React Server Components |
| `tailwind.config` | `""` (vazio) | Não usa `tailwind.config.js` — é Tailwind v4 |
| `tailwind.css` | `"src/app/globals.css"` | Arquivo CSS principal |
| `aliases.ui` | `"@/components/shadcn"` | Shadcn instala componentes em `src/components/shadcn/` |
| `aliases.utils` | `"@/lib/utils"` | Aponta para o arquivo que exporta `cn()` |

---

## 4. Dependências e Para Que Servem

### 4.1 Dependências de Produção (`dependencies`)

| Pacote | Versão | Função |
|--------|--------|--------|
| `next` | `16.1.4` | Framework React com App Router, SSR e RSC |
| `react` | `19.2.3` | Biblioteca de UI — versão 19 com hooks modernos |
| `react-dom` | `19.2.3` | Renderização DOM do React |
| `postcss` | `^8.5.6` | Processador CSS necessário para o Tailwind v4 |
| `tailwind-merge` | `^3.4.0` | Resolve conflitos de classes Tailwind inteligentemente |
| `clsx` | `^2.1.1` | Construção condicional de strings de classes |
| `class-variance-authority` | `^0.7.1` | Criação de variantes de componentes (usado pelo Shadcn) |
| `@radix-ui/react-checkbox` | `^1.3.3` | Primitiva acessível de checkbox |
| `@radix-ui/react-collapsible` | `^1.1.12` | Primitiva acessível de collapsible |
| `@radix-ui/react-dialog` | `^1.1.15` | Primitiva acessível de dialog/modal |
| `@radix-ui/react-dropdown-menu` | `^2.1.16` | Primitiva acessível de dropdown menu |
| `@radix-ui/react-label` | `^2.1.8` | Primitiva acessível de label |
| `@radix-ui/react-progress` | `^1.1.8` | Primitiva acessível de barra de progresso |
| `@radix-ui/react-select` | `^2.2.6` | Primitiva acessível de select |
| `@radix-ui/react-separator` | `^1.1.8` | Primitiva acessível de separador |
| `@radix-ui/react-slot` | `^1.2.4` | Permite compor componentes via prop `asChild` |
| `@radix-ui/react-tabs` | `^1.1.13` | Primitiva acessível de tabs |
| `lucide-react` | `^0.562.0` | Biblioteca de ícones SVG (usada pelo Shadcn) |
| `framer-motion` | `^12.29.0` | Animações declarativas para React |
| `geist` | `^1.5.1` | Fonte Geist (sans + mono) da Vercel |

### 4.2 Dependências de Desenvolvimento (`devDependencies`)

| Pacote | Versão | Função |
|--------|--------|--------|
| `tailwindcss` | `^4.1.18` | ⚡ Engine do Tailwind CSS v4 |
| `@tailwindcss/postcss` | `^4.1.18` | Plugin PostCSS para Tailwind v4 (substitui `tailwindcss` como plugin PostCSS) |
| `tailwindcss-animate` | `^1.0.7` | Plugin de animações (usado pelo Shadcn para transições) |
| `typescript` | `^5` | Linguagem TypeScript |
| `@types/node` | `^20` | Tipos do Node.js |
| `@types/react` | `^19` | Tipos do React 19 |
| `@types/react-dom` | `^19` | Tipos do ReactDOM 19 |
| `eslint` | `^9` | Linter de código |
| `eslint-config-next` | `16.1.4` | Configuração ESLint otimizada para Next.js |

### Relação entre Dependências

```
Shadcn UI Components
  ├── @radix-ui/* (primitivas acessíveis)
  ├── class-variance-authority (variantes)
  ├── clsx + tailwind-merge (composição de classes → cn())
  └── lucide-react (ícones)

Tailwind CSS v4 Pipeline
  ├── tailwindcss (engine)
  ├── @tailwindcss/postcss (plugin PostCSS)
  ├── postcss (processador)
  └── tailwindcss-animate (plugin de animações)

Next.js 16 App
  ├── react + react-dom (v19)
  ├── geist (fonte)
  └── framer-motion (animações)
```

---

## 5. Tailwind CSS v4 — Como Funciona Neste Projeto

### 5.1 Diferenças Fundamentais (v3 → v4)

| Conceito | Tailwind v3 | Tailwind v4 (este projeto) |
|----------|------------|---------------------------|
| Config | `tailwind.config.js` | ❌ **Não existe**. Tudo no CSS |
| Plugin PostCSS | `tailwindcss` | `@tailwindcss/postcss` |
| Import | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Temas | `theme.extend` no JS | `@theme {}` no CSS |
| Plugins | `plugins: [...]` no JS | `@plugin "nome"` no CSS |
| Custom variants | JS config | `@custom-variant` no CSS |
| CSS Variables | Opcional | **Nativo** — base de tudo |

### 5.2 O Arquivo `globals.css` — Coração do Sistema

Este é o arquivo **mais importante** do projeto. Ele conecta os design tokens com o Tailwind:

```css
/* 1. IMPORTA O TEMA (CSS custom properties) */
@import "../../themes/index.css";

/* 2. IMPORTA O TAILWIND v4 */
@import "tailwindcss";

/* 3. REGISTRA O PLUGIN DE ANIMAÇÕES */
@plugin "tailwindcss-animate";

/* 4. DEFINE DARK MODE VIA CLASSE */
@custom-variant dark (&:is(.dark *));

/* 5. PONTE: CSS Variables → Tailwind Utilities */
@theme {
  --color-brand-500: var(--color-brand-500);     /* → bg-brand-500, text-brand-500 */
  --color-bg-primary: var(--color-bg-primary);   /* → bg-bg-primary */
  --color-fg-strong: var(--color-fg-strong);     /* → text-fg-strong */
  --height-form-md: var(--height-form-md);       /* → h-form-md */
  --radius-base: var(--radius-base);             /* → rounded-base */
  /* ... centenas de tokens */
}

/* 6. COMPATIBILIDADE SHADCN (importado APÓS @theme) */
@import "../../themes/default/semantic/compatibility.css";

/* 7. ESTILOS BASE */
@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
```

### 5.3 Como o `@theme {}` Funciona

O bloco `@theme {}` é o **equivalente** ao `theme.extend` do Tailwind v3, mas declarado diretamente no CSS.

**Regra de ouro**: Qualquer CSS custom property que você quiser usar como classe Tailwind **precisa** ser registrada dentro do `@theme {}`.

```css
@theme {
  /* Registrar esta variável... */
  --color-bg-primary: var(--color-bg-primary);
}
```

...permite usar no JSX:
```tsx
<div className="bg-bg-primary">  {/* ✅ Funciona */}
```

Se **não** registrar no `@theme {}`:
```tsx
<div className="bg-bg-primary">  {/* ❌ Classe não existe */}
```

### 5.4 Convenção de Nomes no Tailwind v4

O Tailwind v4 gera classes utilitárias automaticamente a partir das variáveis no `@theme {}`:

| Variável CSS no `@theme` | Classe Tailwind gerada | Uso |
|--------------------------|----------------------|-----|
| `--color-bg-primary` | `bg-bg-primary` | Backgrounds |
| `--color-fg-strong` | `text-fg-strong` | Texto |
| `--color-border` | `border-border` | Bordas |
| `--color-ring-primary` | `ring-ring-primary` | Focus rings |
| `--height-form-md` | `h-form-md` | Alturas |
| `--radius-base` | `rounded-base` | Border radius |
| `--color-brand-600` | `bg-brand-600`, `text-brand-600` | Cores primitivas |

---

## 6. Sistema de Temas (`themes/`)

### 6.1 Entry Point: `themes/index.css`

```css
/* Default Theme */
@import "./default/primitives/index.css";
@import "./default/semantic/index.css";
```

Para trocar de tema, basta apontar para outra pasta:
```css
/* @import "./ocean/primitives/index.css"; */
/* @import "./ocean/semantic/index.css"; */
```

### 6.2 Camada Primitiva (`themes/default/primitives/`)

#### `colors.css` — Cores Base (OKLCH)

Define **todas as escalas de cor** do Design System com valores OKLCH reais:

| Escala | Propósito | Range |
|--------|-----------|-------|
| `--color-brand-*` | Verde principal da marca | 50–950 |
| `--color-neutral-*` | Cinza para texto, fundo, bordas | 0–950 |
| `--color-success-*` | Feedback positivo (verde) | 50–950 |
| `--color-warning-*` | Alerta (laranja) | 50–950 |
| `--color-critical-*` | Erro/danger (vermelho) | 50–950 |
| `--color-info-*` | Informação (azul) | 50–950 |
| `--color-static-black/white` | Preto e branco absolutos | — |

**Por que OKLCH?** Oferece interpolação de cores perceptualmente uniforme, ideal para gerar escalas consistentes.

Exemplo:
```css
:root {
  --color-brand-600: oklch(0.6413 0.165272 152.9579);
  --color-neutral-950: oklch(0.1776 0 0);
}
```

#### `sizes.css` — Tamanhos, Raios e Breakpoints

```css
:root {
  /* Breakpoints */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --breakpoint-desktop: 1280px;

  /* Form Heights */
  --height-form-xxs: 26px;
  --height-form-xs: 36px;
  --height-form-sm: 40px;
  --height-form-md: 46px;
  --height-form-lg: 52px;
  --height-form-xl: 60px;

  /* Border Radius */
  --radius-sm: 10px;
  --radius-base: 14px;
  --radius-lg: 18px;
  --radius-xl: 32px;

  /* Ring */
  --ring-base: 3px;
}

/* Mobile override */
@media (max-width: 768px) {
  :root {
    --height-form-md: 38px; /* Menor no mobile */
    --radius-base: 8px;     /* Menor no mobile */
  }
}
```

### 6.3 Camada Semântica (`themes/default/semantic/`)

#### `colors.css` — Tokens Semânticos de Cor

Mapeia **intenção** → **primitiva**. Alterar uma primitiva atualiza automaticamente todos os tokens semânticos que a referenciam.

```css
:root {
  /* Backgrounds */
  --color-bg-primary: var(--color-brand-600);       /* Botão principal */
  --color-bg-primary-hover: var(--color-brand-700); /* Hover do principal */
  --color-bg-canvas: var(--color-neutral-0);        /* Fundo da página */
  --color-bg-muted: var(--color-neutral-100);       /* Fundo sutil */

  /* Foregrounds (Texto) */
  --color-fg-strong: var(--color-neutral-950);      /* Texto principal */
  --color-fg-muted: var(--color-neutral-500);       /* Texto secundário */
  --color-fg-primary: var(--color-brand-600);       /* Links, destaque */

  /* Borders */
  --color-border: var(--color-neutral-200);         /* Borda padrão */
  --color-border-primary: var(--color-brand-600);   /* Borda de foco */

  /* Rings (Focus States) — com transparência via relative color syntax */
  --color-ring-primary: oklch(from var(--color-brand-600) l c h / 15%);
}
```

**Categorias de tokens semânticos**:
| Prefixo | Quantidade | Uso |
|---------|-----------|-----|
| `bg-*` | ~40 tokens | Backgrounds (surface, canvas, status colors, hover states) |
| `fg-*` | ~30 tokens | Foreground/texto (main, subtle, muted, on-primary, status) |
| `border-*` | ~15 tokens | Bordas (default, muted, strong, status) |
| `ring-*` | 6 tokens | Focus rings (primary, secondary, status) |

#### `typography.css` — Classes de Texto

Define classes CSS utilitárias para tipografia (não variáveis, mas classes completas):

| Classe | Font Size | Weight | Line Height | Uso |
|--------|-----------|--------|-------------|-----|
| `.text-display-lg` | 26px | 700 | 34px | Títulos grandes |
| `.text-display-md` | 24px | 700 | 28px | Títulos médios |
| `.text-display-sm` | 18px | 700 | 24px | Títulos pequenos |
| `.text-page-title` | 26px | 700 | 34px | Título de página |
| `.text-page-subtitle` | 14px | 500 | 20px | Subtítulo de página |
| `.text-section-title` | 18px | 700 | 24px | Título de seção |
| `.text-modal-title` | 24px | 700 | 26px | Título de modal |
| `.text-label` | 11px | 700 | 16px | Labels (UPPERCASE) |
| `.text-body-lg-medium` | 14px | 500 | 20px | Corpo grande |
| `.text-body-md-semibold` | 13px | 600 | 18px | Corpo médio |
| `.text-body-sm-medium` | 12px | 500 | 18px | Corpo pequeno |
| `.text-body-xs-medium` | 11px | 500 | 16px | Corpo extra pequeno |
| `.text-button-md` | 13px | 600 | 20px | Texto de botão |
| `.text-caption-md` | 12px | 500 | 16px | Captions |
| `.text-caption-sm` | 11px | 500 | 14px | Captions pequenos |

#### `utilities.css` — Sombras

Classes de box-shadow com variantes light/dark:

| Classe | Light Mode | Dark Mode |
|--------|-----------|-----------|
| `.shadows-boxshadow-xs` | `0px 1px 1px rgba(0,0,0,0.02)` | Opacidade 0.4 |
| `.shadows-boxshadow-sm` | `0px 1px 2px rgba(0,0,0,0.05)` | Opacidade 0.5 |
| `.shadows-boxshadow-base` | `0px 1px 1px rgba(156,163,175,0.1)` | Com borda sutil |
| `.shadows-boxshadow-xl` | Multi-layer shadow | Opacidade aumentada |

#### `compatibility.css` — Ponte Shadcn

Mapeia os tokens do iGreen Design System para as variáveis que o Shadcn espera:

```css
:root {
  --background: var(--color-bg-surface);
  --foreground: var(--color-fg-strong);
  --primary: var(--color-bg-primary);
  --primary-foreground: var(--color-fg-on-primary);
  --secondary: var(--color-bg-secondary);
  --destructive: var(--color-bg-critical);
  --border: var(--color-border);
  --input: var(--color-border);
  --ring: var(--color-ring-primary);
  --muted: var(--color-bg-muted);
  /* ... sidebar, chart, card, popover, accent */
}
```

---

## 7. O Fluxo Completo dos Design Tokens

### Da Primitiva até o Componente

```
1. PRIMITIVA (themes/default/primitives/colors.css)
   --color-brand-600: oklch(0.6413 0.165272 152.9579);
                        │
                        ▼
2. SEMÂNTICA (themes/default/semantic/colors.css)
   --color-bg-primary: var(--color-brand-600);
                        │
                        ▼
3. PONTE @theme (src/app/globals.css)
   @theme { --color-bg-primary: var(--color-bg-primary); }
                        │
                        ▼
4. TAILWIND GERA a classe utilitária
   bg-bg-primary → background-color: var(--color-bg-primary);
                        │
                        ▼
5. COMPONENTE usa a classe
   <Button className="bg-bg-primary text-fg-on-primary">
```

### Para cores Shadcn, há uma camada extra:

```
3.5 COMPATIBILIDADE (themes/default/semantic/compatibility.css)
    --primary: var(--color-bg-primary);
                        │
                        ▼
3.6 PONTE @theme (globals.css)
    @theme { --color-primary: var(--primary); }
                        │
                        ▼
4. TAILWIND GERA
   bg-primary → background-color: var(--primary);
                        │
                        ▼
5. COMPONENTE SHADCN
   <Button variant="default"> /* usa bg-primary internamente */
```

---

## 8. Shadcn UI — Integração e Camada de Compatibilidade

### 8.1 O que é Shadcn neste Projeto

Shadcn UI **NÃO** é uma biblioteca instalável. É um **gerador de código** — você copia os arquivos para o projeto e customiza livremente.

Neste projeto, componentes Shadcn ficam em `src/components/shadcn/` e já foram **customizados** para usar os tokens do iGreen Design System.

### 8.2 Como Instalar um Novo Componente Shadcn

```bash
npx shadcn@latest add nome-do-componente
```

O CLI lê o `components.json` e sabe:
- Instalar em `src/components/shadcn/` (alias `ui`)
- Usar `src/lib/utils.ts` para `cn()`
- Usar `src/app/globals.css` como CSS base
- Instalar dependências do Radix automaticamente

### 8.3 Componentes Shadcn Instalados

| Componente | Arquivo | Dependência Radix |
|-----------|---------|------------------|
| Alert | `alert.tsx` | Nenhuma |
| Button | `button.tsx` | `@radix-ui/react-slot` |
| Checkbox | `checkbox.tsx` | `@radix-ui/react-checkbox` |
| Collapsible | `collapsible.tsx` | `@radix-ui/react-collapsible` |
| Dialog | `dialog.tsx` | `@radix-ui/react-dialog` |
| Dropdown Menu | `dropdown-menu.tsx` | `@radix-ui/react-dropdown-menu` |
| Field | `field.tsx` | Nenhuma (composição) |
| Input | `input.tsx` | Nenhuma |
| Input Group | `input-group.tsx` | Nenhuma (composição) |
| Label | `label.tsx` | `@radix-ui/react-label` |
| Progress | `progress.tsx` | `@radix-ui/react-progress` |
| Select | `select.tsx` | `@radix-ui/react-select` |
| Separator | `separator.tsx` | `@radix-ui/react-separator` |
| Spinner | `spinner.tsx` | Nenhuma |
| Tabs | `tabs.tsx` | `@radix-ui/react-tabs` |
| Textarea | `textarea.tsx` | Nenhuma |

---

## 9. Componentes — Hierarquia e Padrões

### 9.1 Duas Categorias de Componentes

```
src/components/
├── shadcn/      → Primitivas UI (Radix + Tailwind)
│                  Arquivos simples (1 arquivo .tsx por componente)
│                  Base para composição
│
└── igreen/      → Componentes complexos do Design System
                   Pasta por componente (4 arquivos)
                   Compostos a partir de primitivas Shadcn
```

### 9.2 Estrutura de um Componente iGreen (Padrão Gold Standard)

Cada componente iGreen segue **exatamente** esta estrutura de 4 arquivos:

```
src/components/igreen/NomeDoComponente/
├── index.ts              # Barrel export
├── component.tsx         # Lógica e renderização
├── component.types.ts    # Interfaces e tipos
└── component.styles.ts   # Estilos (classes Tailwind)
```

#### `index.ts` — Barrel Export
```typescript
export * from './component';
export * from './component.types';
```

#### `component.types.ts` — Tipos
```typescript
import { ComponentProps, ReactNode } from "react";

export type InputTextStatus = "default" | "error" | "warning" | "completed";

export interface InputTextProps extends Omit<ComponentProps<"input">, "size"> {
  label?: string;
  helperText?: string;
  status?: InputTextStatus;
  size?: "md" | "lg";
  startIcon?: ReactNode | IconName;
  endIcon?: ReactNode | IconName;
  isLoading?: boolean;
}
```

#### `component.styles.ts` — Estilos
```typescript
export const inputTextStyles = {
  container: "flex flex-col gap-1.5 w-full",
  label: "text-label uppercase text-fg-main transition-colors",
  status: {
    default: "",
    error: "text-fg-critical",
    warning: "text-fg-warning",
    completed: "text-fg-success",
  },
  input: "placeholder:text-fg-subtle text-fg-strong w-full flex-1",
  helper: {
    base: "text-caption-sm transition-colors",
    default: "text-fg-main",
    error: "text-fg-critical font-medium",
  },
};
```

> **Regra**: Estilos são **strings simples**, não arrays com `.join(" ")`. Classes usam **tokens do Design System** (nunca valores hardcoded).

#### `component.tsx` — Implementação
```typescript
"use client";
import { cn } from "@/lib/utils";
import { inputTextStyles as styles } from "./component.styles";
import type { InputTextProps } from "./component.types";

export function InputText({ label, status = "default", ...props }: InputTextProps) {
  return (
    <div className={cn(styles.container)}>
      {label && <label className={cn(styles.label, styles.status[status])}>{label}</label>}
      <input className={cn(styles.input)} {...props} />
    </div>
  );
}
```

### 9.3 Barrel Export Global

`src/components/igreen/index.ts` exporta todos os componentes:
```typescript
export * from "./Choice";
export * from "./InputText";
export * from "./FileDropZone";
export * from "./ToggleCard";
export * from "./ProgressCard";
export * from "./StepperProgress";
export * from "./ScreenSteppers";
export * from "./ScreenStep";
```

### 9.4 Hierarquia de Composição

```
                    iGreen Components (alto nível)
                    ┌────────────────────────┐
                    │  InputText             │ ← Compõe Field + InputGroup + Input
                    │  FileDropZone          │ ← Usa Icon, Button
                    │  DialogAlert           │ ← Compõe Dialog + Icon + Button
                    │  ScreenSteppers        │ ← Compõe ScreenStep + StepperProgress
                    └───────────┬────────────┘
                                │ usa
                    ┌───────────▼────────────┐
                    │  Shadcn Components     │
                    │  (src/components/shadcn)│
                    │  Button, Input, Dialog,│
                    │  Select, Field, etc.   │
                    └───────────┬────────────┘
                                │ wraps
                    ┌───────────▼────────────┐
                    │  Radix UI Primitives   │
                    │  (@radix-ui/react-*)    │
                    │  Acessibilidade, ARIA   │
                    └───────────┬────────────┘
                                │ styled by
                    ┌───────────▼────────────┐
                    │  Tailwind CSS v4        │
                    │  Classes geradas pelos  │
                    │  tokens do @theme {}    │
                    └────────────────────────┘
```

---

## 10. Tailwind Merge e a Função `cn()`

### 10.1 O Que é o `cn()`

A função `cn()` combina `clsx` (composição condicional de classes) com `tailwind-merge` (resolução de conflitos). É o **pilar central** de estilização.

### 10.2 Cadeia de Resolução

```
themes/tailwind-merge.config.ts  ←  Define cn() com extensões customizadas
          │
          ▼
src/lib/utils.ts                 ←  Re-exporta cn() (bridge para Shadcn)
          │
          ▼
Todos os componentes             ←  import { cn } from "@/lib/utils"
```

### 10.3 `themes/tailwind-merge.config.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Tipografia customizada
      'font-size': [{
        'text': [
          'display-lg', 'display-md', 'display-sm',
          'page-title', 'page-subtitle', 'section-title', 'modal-title',
          'label',
          'body-lg-medium', 'body-lg-semibold',
          'body-md-bold', 'body-md-semibold', 'body-md-medium',
          'body-sm-bold', 'body-sm-semibold', 'body-sm-medium',
          'body-xs-medium', 'body-xs-semibold',
          'button-md', 'button-sm',
          'caption-md', 'caption-sm',
        ]
      }],

      // Sombras customizadas
      'shadow': [
        'shadows-boxshadow-xs', 'shadows-boxshadow-sm',
        'shadows-boxshadow-base', 'shadows-boxshadow-xl',
      ],

      // Alturas de form
      'h': ['form-xxs', 'form-xs', 'form-sm', 'form-md', 'form-lg', 'form-xl'],

      // Ring width
      'ring-w': [{ 'ring': ['base'] }],

      // Border radius
      'rounded': [{
        'rounded': ['sm', 'base', 'lg', 'xl', 'none', 'full']
      }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 10.4 Por Que Isso é Necessário?

Sem essa configuração, `tailwind-merge` **não sabe** que `text-display-lg` é um tamanho de fonte e não faria merge correto:

```tsx
// SEM configuração:
cn("text-sm", "text-display-lg")  → "text-sm text-display-lg" ❌ (conflito)

// COM configuração:
cn("text-sm", "text-display-lg")  → "text-display-lg" ✅ (merge correto)
```

### 10.5 `src/lib/utils.ts` — Bridge

```typescript
import { cn as themeCn } from "@themes/tailwind-merge.config";

/**
 * Utility Bridge
 * Re-exports the configured utility from themes/.
 * Shadcn components expect this file at @/lib/utils.
 */
export const cn = themeCn;
```

Este arquivo existe **exclusivamente** porque o Shadcn CLI espera encontrar `cn()` em `@/lib/utils`. Ele simplesmente re-exporta a implementação real do `themes/`.

---

## 11. Styleguide — Documentação Visual

### 11.1 Estrutura

O styleguide é um mini-site dentro do projeto, acessível em `/styleguide`:

```
src/app/styleguide/
├── layout.tsx        # Layout com sidebar + conteúdo
├── navigation.ts     # Definição dos itens da sidebar
├── page.tsx          # Design Tokens overview
├── colors/           # Visualização de todas as cores
├── typography/       # Visualização da tipografia
├── sizes/            # Alturas de form, etc.
├── shadows/          # Box shadows
├── radius/           # Border radius
├── documentation/    # Guia do projeto
├── installation/     # Como instalar
├── components/       # Página de cada componente
└── examples/         # Exemplos de uso real
```

### 11.2 Seções da Navegação

| Seção | Itens | Descrição |
|-------|-------|-----------|
| **Guide** | Documentation, Installation | Guias e tutoriais |
| **Foundation** | Design Tokens, Colors, Typography, Sizes, Shadows, Radius | Tokens visuais |
| **Components** | 20+ componentes | Documentação interativa de cada componente |
| **Template Components** | Screen Steppers, Screen Step | Componentes de layout/template |
| **Examples** | Initial Step | Exemplos de telas reais |

---

## 12. Prompts para IA

O projeto inclui 4 prompts detalhados para IAs na pasta `prompts/`:

| Arquivo | Propósito |
|---------|-----------|
| `create-igreen-component.md` | Instruções passo a passo para criar um componente iGreen com a estrutura de 4 arquivos |
| `create-shadcn-component.md` | Como instalar e customizar um componente Shadcn UI |
| `create-styleguide-page.md` | Como criar uma página de documentação no styleguide |
| `extract-component-figma.md` | Como extrair tokens e specs de um componente no Figma |

---

## 13. Fontes e Tipografia

### 13.1 Configuração da Fonte

O projeto usa a **fonte Geist** (da Vercel) em duas variantes:

```typescript
// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

A fonte é aplicada como variável CSS no `<body>`:
```tsx
<body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
```

E conectada ao Tailwind via `@theme`:
```css
@theme {
  --font-family-sans: var(--font-geist-sans);
  --font-family-mono: var(--font-geist-mono);
}
```

---

## 14. Dark Mode

### 14.1 Estratégia

O dark mode usa a **estratégia de classe** (não media query):

```css
/* globals.css */
@custom-variant dark (&:is(.dark *));
```

Para ativar o dark mode, basta adicionar a classe `dark` no `<html>`:
```html
<html class="dark">
```

### 14.2 Tokens que Mudam no Dark Mode

Cada camada de tokens tem sua versão dark:

1. **`semantic/colors.css`** — Block `.dark {}` com ~130 tokens remapeados:
   ```css
   .dark {
     --color-bg-canvas: var(--color-neutral-950);     /* branco → quase preto */
     --color-fg-strong: var(--color-neutral-0);       /* preto → branco */
     --color-border: var(--color-neutral-800);        /* cinza claro → escuro */
   }
   ```

2. **`semantic/compatibility.css`** — Block `.dark {}` para variáveis Shadcn

3. **`semantic/utilities.css`** — Sombras `.dark .shadows-boxshadow-*` com opacidades maiores

---

## 15. Responsividade

### 15.1 Breakpoints

Definidos em `themes/default/primitives/sizes.css`:

| Variável | Valor | Uso |
|----------|-------|-----|
| `--breakpoint-mobile` | `768px` | `@media (max-width: 768px)` |
| `--breakpoint-tablet` | `1024px` | `@media (max-width: 1024px)` |
| `--breakpoint-desktop` | `1280px` | `@media (max-width: 1280px)` |

### 15.2 O Que Muda no Mobile

**Sizes** (`sizes.css`):
- Form heights reduzem (~20%)
- Border radius reduzem (~40%)
- Ring width reduz (3px → 2px)

**Typography** (`typography.css`):
- Display/title fonts reduzem 2–4px
- Body text reduz 1–2px
- Button/caption text reduz 1–2px

> **Regra**: A responsividade de primitivas/tokens é feita via **CSS media queries nos próprios arquivos de token**, não via classes Tailwind responsivas (`md:`, `lg:`). Classes Tailwind responsivas são usadas **apenas** para layout.

---

## 16. Regras e Convenções do Projeto

### 16.1 Estilização

1. **Nunca** use valores hardcoded de cor, tamanho ou radius. Use tokens.
2. **Sempre** use `cn()` para compor classes — nunca string concatenation.
3. Estilos de componentes iGreen ficam em `component.styles.ts` — **nunca inline**.
4. Strings de estilo são **simples** (não arrays com `.join(" ")`).
5. Use tokens semânticos (`bg-bg-primary`) em vez de primitivos (`bg-brand-600`) quando possível.

### 16.2 Componentes

1. Componentes iGreen seguem a estrutura de **4 arquivos** (index, component, types, styles).
2. Shadcn componentes ficam em `src/components/shadcn/` como arquivos únicos.
3. Nomes de pasta: **PascalCase** para iGreen, **kebab-case** para arquivos Shadcn.
4. Todo componente iGreen é exportado via barrel em `igreen/index.ts`.

### 16.3 Git/Build

1. Rode `npm run build` localmente antes de fazer push.
2. O projeto faz deploy automático via **Vercel**.

---

## 17. Como Rodar o Projeto

```bash
# 1. Clone
git clone <repo-url>
cd igreenlink

# 2. Instale dependências
npm install

# 3. Rode o dev server
npm run dev

# 4. Acesse
# Aplicação: http://localhost:3000
# Styleguide: http://localhost:3000/styleguide

# 5. Build de produção
npm run build
npm run start
```

---

## 18. Checklist para IAs: O Que Precisa Existir para Funcionar

Abaixo está uma lista completa de **tudo que precisa existir e estar configurado** para o projeto funcionar:

### Arquivos Obrigatórios na Raiz

- [ ] `package.json` — com todas as dependências listadas na seção 4
- [ ] `tsconfig.json` — com os aliases `@/*` e `@themes/*`
- [ ] `postcss.config.mjs` — com `@tailwindcss/postcss` como plugin
- [ ] `next.config.ts` — mesmo que vazio
- [ ] `components.json` — com aliases `ui: @/components/shadcn` e `utils: @/lib/utils`
- [ ] `eslint.config.mjs` — flat config ESLint v9

### Arquivos Obrigatórios do Tema

- [ ] `themes/index.css` — importa primitivas e semânticas
- [ ] `themes/tailwind-merge.config.ts` — exporta `cn()` customizado
- [ ] `themes/default/primitives/index.css` — importa colors + sizes
- [ ] `themes/default/primitives/colors.css` — escalas OKLCH em `:root`
- [ ] `themes/default/primitives/sizes.css` — heights, radius, ring, breakpoints
- [ ] `themes/default/semantic/index.css` — importa colors + typography + utilities
- [ ] `themes/default/semantic/colors.css` — tokens semânticos + `.dark {}`
- [ ] `themes/default/semantic/typography.css` — classes `.text-*` + mobile
- [ ] `themes/default/semantic/utilities.css` — classes `.shadows-*` + dark
- [ ] `themes/default/semantic/compatibility.css` — variáveis Shadcn + `.dark {}`

### Arquivos Obrigatórios do Source

- [ ] `src/app/globals.css` — **CRÍTICO**: importa tudo, define `@theme {}`
- [ ] `src/app/layout.tsx` — root layout com fontes Geist e `import "./globals.css"`
- [ ] `src/lib/utils.ts` — bridge que re-exporta `cn()` de `@themes/tailwind-merge.config`

### Ordem de Carga no `globals.css` (crítica!)

```
1. @import "../../themes/index.css"               ← PRIMEIRO: carrega CSS vars
2. @import "tailwindcss"                           ← SEGUNDO: engine Tailwind
3. @plugin "tailwindcss-animate"                   ← TERCEIRO: plugin
4. @custom-variant dark (...)                      ← QUARTO: dark mode
5. @theme { ... }                                  ← QUINTO: ponte vars → Tailwind
6. @import "../../themes/.../compatibility.css"    ← SEXTO: Shadcn compat (APÓS @theme)
7. @layer base { ... }                             ← SÉTIMO: estilos base
```

> **⚠️ ATENÇÃO**: O `compatibility.css` **DEVE** ser importado **APÓS** o bloco `@theme {}` para que as referências `var()` funcionem corretamente.

### Dependências Node.js Obrigatórias

**Produção** (sem elas, build quebra):
```
next react react-dom postcss tailwind-merge clsx class-variance-authority
@radix-ui/react-slot lucide-react geist
```

**Dev** (sem elas, dev server não sobe):
```
tailwindcss @tailwindcss/postcss tailwindcss-animate typescript
```

**Radix (instalar conforme componentes usados)**:
```
@radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-select
@radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-progress
@radix-ui/react-separator @radix-ui/react-tabs @radix-ui/react-collapsible
```

---

> **Este documento é a fonte única de verdade sobre a arquitetura do projeto iGreen Link.**  
> Qualquer IA que leia este arquivo terá o contexto completo para entender, modificar e estender o projeto sem quebrar a cadeia de dependências.
