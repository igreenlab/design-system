"use client";

import { Code2, FolderTree, Layers, Palette, Terminal, Play, FileCode, Box, Moon, Smartphone, Sparkles, BookOpen, Component, Puzzle } from "lucide-react";

export default function DocumentationPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="border-b border-border-muted bg-bg-surface sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-display-lg text-fg-strong">
                            Documentation
                        </h1>
                        <span className="bg-bg-primary-subtle text-fg-primary text-caption-sm font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Guide
                        </span>
                    </div>
                    <p className="text-body-lg-medium text-fg-muted">
                        Visão geral técnica, arquitetura detalhada e padrões do projeto iGreen Link
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">

                {/* 1. Tech Stack & Overview */}
                <section className="space-y-6">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Code2 className="size-5 text-fg-primary" />
                        Tecnologias & Stack
                    </h2>
                    <p className="text-body-md-medium text-fg-muted max-w-4xl">
                        O projeto é construído sobre uma fundação moderna de React, focado em performance,
                        acessibilidade e manutenabilidade. Utilizamos o ecossistema Next.js
                        para renderização híbrida e rotas otimizadas.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        <div className="bg-bg-surface p-4 rounded-lg border border-border shadow-sm">
                            <div className="text-caption-sm text-fg-muted mb-1 font-mono">Framework</div>
                            <div className="text-body-lg-semibold text-fg-strong">Next.js 16</div>
                            <div className="text-caption-sm text-fg-success mt-1">App Router</div>
                        </div>
                        <div className="bg-bg-surface p-4 rounded-lg border border-border shadow-sm">
                            <div className="text-caption-sm text-fg-muted mb-1 font-mono">Styling</div>
                            <div className="text-body-lg-semibold text-fg-strong">Tailwind CSS v4</div>
                            <div className="text-caption-sm text-fg-warning mt-1">Oxide Engine</div>
                        </div>
                        <div className="bg-bg-surface p-4 rounded-lg border border-border shadow-sm">
                            <div className="text-caption-sm text-fg-muted mb-1 font-mono">UI Base</div>
                            <div className="text-body-lg-semibold text-fg-strong">Shadcn UI</div>
                            <div className="text-caption-sm text-fg-primary mt-1">Component Library</div>
                        </div>
                        <div className="bg-bg-surface p-4 rounded-lg border border-border shadow-sm">
                            <div className="text-caption-sm text-fg-muted mb-1 font-mono">Primitives</div>
                            <div className="text-body-lg-semibold text-fg-strong">Radix UI</div>
                            <div className="text-caption-sm text-fg-info mt-1">Headless UI</div>
                        </div>
                        <div className="bg-bg-surface p-4 rounded-lg border border-border shadow-sm">
                            <div className="text-caption-sm text-fg-muted mb-1 font-mono">Language</div>
                            <div className="text-body-lg-semibold text-fg-strong">TypeScript</div>
                            <div className="text-caption-sm text-fg-info mt-1">Strict Mode</div>
                        </div>
                    </div>
                </section>

                {/* 2. Arquitetura de Pastas COMPLETA */}
                <section className="space-y-8">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <FolderTree className="size-5 text-fg-info" />
                        Arquitetura do Projeto
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Tree View Completa */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-body-sm-bold text-fg-muted uppercase mb-4 tracking-wider">Estrutura Raiz</h3>
                            <pre className="font-mono text-body-sm-medium text-fg-main leading-relaxed overflow-x-auto">
                                {`igreenlink/
├── src/
│   ├── app/                   → Next.js App Router
│   │   ├── layout.tsx         → Root layout + providers
│   │   ├── globals.css        → Imports dos tokens
│   │   └── styleguide/        → Design System docs
│   │
│   ├── components/
│   │   ├── igreen/            → Componentes custom
│   │   └── shadcn/            → Primitives base
│   │
│   ├── lib/
│   │   └── utils.ts           → cn() e helpers
│   │
│   └── img/                   → Assets SVG/PNG
│
├── themes/default/            → Design Tokens
│   ├── primitives/            → Valores base
│   │   ├── colors.css         → Escalas OKLCH
│   │   └── sizes.css          → Heights, radius
│   │
│   └── semantic/              → Tokens semânticos
│       ├── colors.css         → bg-*, fg-*, border-*
│       ├── typography.css     → Classes de texto
│       ├── utilities.css      → Shadows
│       └── compatibility.css  → Shadcn bridge
│
├── prompts/                   → Guidelines IA
│   ├── create-igreen-component.md
│   ├── create-shadcn-component.md
│   ├── create-styleguide-page.md
│   └── extract-component-figma.md
│
└── public/                    → Static assets`}
                            </pre>
                        </div>

                        {/* Explicações */}
                        <div className="space-y-4">
                            <div className="bg-bg-subtle p-4 rounded-lg border border-border">
                                <h4 className="text-body-sm-bold text-fg-strong mb-2 flex items-center gap-2">
                                    <Layers className="size-4 text-fg-primary" />
                                    src/app/
                                </h4>
                                <p className="text-caption-md text-fg-muted">
                                    Diretório do App Router. Cada pasta é uma rota. <code className="text-fg-primary">layout.tsx</code> define
                                    providers globais, tema e fontes. <code className="text-fg-primary">globals.css</code> importa os tokens.
                                </p>
                            </div>
                            <div className="bg-bg-subtle p-4 rounded-lg border border-border">
                                <h4 className="text-body-sm-bold text-fg-strong mb-2 flex items-center gap-2">
                                    <Box className="size-4 text-fg-success" />
                                    src/components/
                                </h4>
                                <p className="text-caption-md text-fg-muted">
                                    <strong>igreen/</strong>: Componentes proprietários do design system (Choice, Dialog, InputText).
                                    <br />
                                    <strong>shadcn/</strong>: Primitivos base (Button, Input, Checkbox).
                                </p>
                            </div>
                            <div className="bg-bg-subtle p-4 rounded-lg border border-border">
                                <h4 className="text-body-sm-bold text-fg-strong mb-2 flex items-center gap-2">
                                    <Palette className="size-4 text-fg-warning" />
                                    themes/default/
                                </h4>
                                <p className="text-caption-md text-fg-muted">
                                    Single source of truth para Design Tokens. Primitives definem valores brutos,
                                    Semantic mapeia para contexto de uso (bg-primary, fg-muted).
                                </p>
                            </div>
                            <div className="bg-bg-subtle p-4 rounded-lg border border-border">
                                <h4 className="text-body-sm-bold text-fg-strong mb-2 flex items-center gap-2">
                                    <Sparkles className="size-4 text-fg-info" />
                                    prompts/
                                </h4>
                                <p className="text-caption-md text-fg-muted">
                                    Guidelines para assistentes de IA. Definem padrões obrigatórios para criar
                                    componentes, páginas do styleguide e extrair designs do Figma.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Arquitetura de Design Tokens */}
                <section className="space-y-8">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Palette className="size-5 text-fg-warning" />
                        Arquitetura de Design Tokens
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Primitives */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="size-8 rounded-lg bg-bg-primary-subtle flex items-center justify-center">
                                    <span className="text-lg">🎨</span>
                                </div>
                                <h3 className="text-body-lg-semibold text-fg-strong">Primitives</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Valores de baixo nível. Nunca usados diretamente em componentes.
                            </p>
                            <div className="bg-bg-muted p-3 rounded font-mono text-xs text-fg-main">
                                {`/* colors.css */
--color-brand-500: oklch(0.68 0.17 154);
--color-neutral-100: oklch(0.97 0 0);

/* sizes.css */
--height-form-md: 46px;
--radius-base: 12px;`}
                            </div>
                        </div>

                        {/* Semantic */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="size-8 rounded-lg bg-bg-success-subtle flex items-center justify-center">
                                    <span className="text-lg">✨</span>
                                </div>
                                <h3 className="text-body-lg-semibold text-fg-strong">Semantic</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Tokens com significado contextual. Usados diretamente via classes.
                            </p>
                            <div className="bg-bg-muted p-3 rounded font-mono text-xs text-fg-main">
                                {`/* Mapeamento */
--bg-primary: var(--color-brand-500);
--fg-muted: var(--color-neutral-500);
--border: var(--color-neutral-200);

/* Dark mode automático */
.dark {
  --bg-surface: var(--color-neutral-900);
}`}
                            </div>
                        </div>

                        {/* Usage */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="size-8 rounded-lg bg-bg-info-subtle flex items-center justify-center">
                                    <span className="text-lg">📦</span>
                                </div>
                                <h3 className="text-body-lg-semibold text-fg-strong">Uso no Código</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Tokens são consumidos via classes Tailwind no JSX.
                            </p>
                            <div className="bg-bg-muted p-3 rounded font-mono text-xs text-fg-main">
                                {`// ❌ PROIBIDO
className="text-[14px] bg-[#F3F4F6]"

// ✅ OBRIGATÓRIO
className="text-body-md-medium bg-bg-muted"
className="rounded-base h-[var(--height-form-md)]"`}
                            </div>
                        </div>
                    </div>

                    {/* Color Scales */}
                    <div className="bg-bg-surface border border-border rounded-lg p-6">
                        <h3 className="text-body-sm-bold text-fg-muted uppercase mb-4 tracking-wider">Escalas de Cores (OKLCH)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-strong">Brand (Verde)</div>
                                <div className="space-y-1">
                                    {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(shade => (
                                        <div key={shade} className="flex items-center gap-2">
                                            <div className={`size-4 rounded`} style={{ backgroundColor: `var(--color-brand-${shade})` }} />
                                            <span className="text-caption-xs text-fg-muted font-mono">{shade}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-strong">Neutral</div>
                                <div className="space-y-1">
                                    {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(shade => (
                                        <div key={shade} className="flex items-center gap-2">
                                            <div className={`size-4 rounded border border-border`} style={{ backgroundColor: `var(--color-neutral-${shade})` }} />
                                            <span className="text-caption-xs text-fg-muted font-mono">{shade}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-success">Success</div>
                                <div className="space-y-1">
                                    {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(shade => (
                                        <div key={shade} className="flex items-center gap-2">
                                            <div className={`size-4 rounded`} style={{ backgroundColor: `var(--color-success-${shade})` }} />
                                            <span className="text-caption-xs text-fg-muted font-mono">{shade}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-warning">Warning</div>
                                <div className="space-y-1">
                                    {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(shade => (
                                        <div key={shade} className="flex items-center gap-2">
                                            <div className={`size-4 rounded`} style={{ backgroundColor: `var(--color-warning-${shade})` }} />
                                            <span className="text-caption-xs text-fg-muted font-mono">{shade}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-critical">Critical</div>
                                <div className="space-y-1">
                                    {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(shade => (
                                        <div key={shade} className="flex items-center gap-2">
                                            <div className={`size-4 rounded`} style={{ backgroundColor: `var(--color-critical-${shade})` }} />
                                            <span className="text-caption-xs text-fg-muted font-mono">{shade}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-info">Info</div>
                                <div className="space-y-1">
                                    {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(shade => (
                                        <div key={shade} className="flex items-center gap-2">
                                            <div className={`size-4 rounded`} style={{ backgroundColor: `var(--color-info-${shade})` }} />
                                            <span className="text-caption-xs text-fg-muted font-mono">{shade}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Dark Mode & Responsiveness */}
                <section className="space-y-6">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Moon className="size-5 text-fg-info" />
                        Dark Mode & Responsividade
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dark Mode */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Moon className="size-4 text-fg-primary" />
                                <h3 className="text-body-lg-semibold text-fg-strong">Dark Mode</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Implementado via classe <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded">.dark</code> no <code className="text-fg-main">&lt;html&gt;</code>.
                                Todos os tokens semânticos possuem variante dark.
                            </p>
                            <div className="bg-bg-muted p-3 rounded font-mono text-xs text-fg-main mb-4">
                                {`/* semantic/colors.css */
:root {
  --bg-surface: var(--color-neutral-0);
  --fg-strong: var(--color-neutral-900);
}

.dark {
  --bg-surface: var(--color-neutral-900);
  --fg-strong: var(--color-neutral-50);
}`}
                            </div>
                            <p className="text-caption-sm text-fg-muted">
                                Use o ThemeToggle no sidebar para testar.
                            </p>
                        </div>

                        {/* Responsiveness */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Smartphone className="size-4 text-fg-warning" />
                                <h3 className="text-body-lg-semibold text-fg-strong">Responsividade</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Typography tokens possuem media queries embutidas. Componentes usam breakpoints Tailwind.
                            </p>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-bg-muted rounded">
                                    <span className="text-body-sm-medium text-fg-muted">Mobile</span>
                                    <code className="text-fg-warning font-mono text-sm">&lt;768px (md)</code>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-bg-muted rounded">
                                    <span className="text-body-sm-medium text-fg-muted">Tablet</span>
                                    <code className="text-fg-info font-mono text-sm">&lt;1024px (lg)</code>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-bg-muted rounded">
                                    <span className="text-body-sm-medium text-fg-muted">Desktop</span>
                                    <code className="text-fg-success font-mono text-sm">≥1280px (xl)</code>
                                </div>
                            </div>
                            <div className="mt-4 bg-bg-muted p-3 rounded font-mono text-xs text-fg-main">
                                {`/* Tipografia responsiva */
.text-display-lg {
  font-size: 32px;    /* mobile */
}

@media (min-width: 768px) {
  .text-display-lg {
    font-size: 40px;  /* desktop */
  }
}`}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Estrutura de Componentes */}
                <section className="space-y-8">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Component className="size-5 text-fg-success" />
                        Estrutura de Componentes
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Estrutura de Pasta */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-body-sm-bold text-fg-muted uppercase mb-4 tracking-wider">Pasta de Componente iGreen</h3>
                            <pre className="font-mono text-body-sm-medium text-fg-main leading-relaxed">
                                {`src/components/igreen/ComponentName/
├── index.ts              → Barrel export
├── component-name.tsx    → View (lógica + composição)
├── component-name.styles.ts  → Estilos centralizados
├── component-name.types.ts   → Interfaces TypeScript
├── component-name.hooks.ts   → Hooks específicos (opcional)
└── component-name.utils.ts   → Helpers internos (opcional)`}
                            </pre>
                        </div>

                        {/* Regras */}
                        <div className="space-y-4">
                            <div className="bg-bg-critical-subtle p-4 rounded-lg border border-border-critical">
                                <h4 className="text-body-sm-bold text-fg-critical mb-2">❌ Proibido</h4>
                                <ul className="list-disc pl-5 space-y-1 text-caption-md text-fg-muted">
                                    <li>Valores hardcoded (colors, sizes, fonts)</li>
                                    <li>Estilos inline no componente .tsx</li>
                                    <li>Importar primitives diretamente</li>
                                    <li>Classes arbitrárias como <code>text-[14px]</code></li>
                                </ul>
                            </div>
                            <div className="bg-bg-success-subtle p-4 rounded-lg border border-border-success">
                                <h4 className="text-body-sm-bold text-fg-success mb-2">✅ Obrigatório</h4>
                                <ul className="list-disc pl-5 space-y-1 text-caption-md text-fg-muted">
                                    <li>Todos os estilos no arquivo .styles.ts</li>
                                    <li>Usar tokens semânticos (bg-primary, text-body-md)</li>
                                    <li>JSDoc em todas as props</li>
                                    <li>Exportar via barrel (index.ts)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Exemplo de Código */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="bg-bg-surface border border-border rounded-lg p-4">
                            <div className="text-caption-sm text-fg-muted mb-2 font-mono">component.types.ts</div>
                            <pre className="font-mono text-xs text-fg-main leading-relaxed overflow-x-auto">
                                {`export interface CardProps {
  /** Título principal */
  title: string;
  /** Descrição opcional */
  description?: string;
  /** Estado ativo */
  active?: boolean;
  /** Classes adicionais */
  className?: string;
}`}
                            </pre>
                        </div>
                        <div className="bg-bg-surface border border-border rounded-lg p-4">
                            <div className="text-caption-sm text-fg-muted mb-2 font-mono">component.styles.ts</div>
                            <pre className="font-mono text-xs text-fg-main leading-relaxed overflow-x-auto">
                                {`export const cardStyles = {
  container: "bg-bg-surface border " +
    "border-border rounded-lg p-4",
  title: "text-body-lg-semibold " +
    "text-fg-strong",
  description: "text-body-sm-medium " +
    "text-fg-muted mt-1",
  active: "border-border-primary " +
    "bg-bg-primary-subtle",
};`}
                            </pre>
                        </div>
                        <div className="bg-bg-surface border border-border rounded-lg p-4">
                            <div className="text-caption-sm text-fg-muted mb-2 font-mono">component.tsx</div>
                            <pre className="font-mono text-xs text-fg-main leading-relaxed overflow-x-auto">
                                {`import { cn } from "@/lib/utils";
import { cardStyles } from "./styles";
import { CardProps } from "./types";

export function Card({
  title, description,
  active, className
}: CardProps) {
  return (
    <div className={cn(
      cardStyles.container,
      active && cardStyles.active,
      className
    )}>
      <h3 className={cardStyles.title}>
        {title}
      </h3>
      {description && (
        <p className={cardStyles.description}>
          {description}
        </p>
      )}
    </div>
  );
}`}
                            </pre>
                        </div>
                    </div>
                </section>

                {/* 6. Prompts para IA */}
                <section className="space-y-6">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Sparkles className="size-5 text-fg-primary" />
                        Prompts & Guidelines para IA
                    </h2>
                    <p className="text-body-md-medium text-fg-muted max-w-4xl">
                        A pasta <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded">prompts/</code> contém
                        guias detalhados que instruem assistentes de IA sobre os padrões obrigatórios do projeto.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-bg-surface border border-border rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-lg bg-bg-primary-subtle flex items-center justify-center">
                                    <Puzzle className="size-5 text-fg-primary" />
                                </div>
                                <div>
                                    <h4 className="text-body-md-semibold text-fg-strong">create-igreen-component.md</h4>
                                    <p className="text-caption-sm text-fg-muted">469 linhas</p>
                                </div>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted">
                                Define a arquitetura obrigatória para componentes custom: estrutura de pastas,
                                separação de concerns, mapeamento de tokens e exemplos completos.
                            </p>
                        </div>

                        <div className="bg-bg-surface border border-border rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-lg bg-bg-info-subtle flex items-center justify-center">
                                    <Box className="size-5 text-fg-info" />
                                </div>
                                <div>
                                    <h4 className="text-body-md-semibold text-fg-strong">create-shadcn-component.md</h4>
                                    <p className="text-caption-sm text-fg-muted">~300 linhas</p>
                                </div>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted">
                                Guia para adicionar componentes primitivos do Shadcn UI ao projeto,
                                incluindo customizações de estilo e integração com tokens.
                            </p>
                        </div>

                        <div className="bg-bg-surface border border-border rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-lg bg-bg-success-subtle flex items-center justify-center">
                                    <BookOpen className="size-5 text-fg-success" />
                                </div>
                                <div>
                                    <h4 className="text-body-md-semibold text-fg-strong">create-styleguide-page.md</h4>
                                    <p className="text-caption-sm text-fg-muted">474 linhas</p>
                                </div>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted">
                                Template completo para criar páginas de documentação no styleguide,
                                com seções padronizadas e componentes reutilizáveis.
                            </p>
                        </div>

                        <div className="bg-bg-surface border border-border rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-lg bg-bg-warning-subtle flex items-center justify-center">
                                    <FileCode className="size-5 text-fg-warning" />
                                </div>
                                <div>
                                    <h4 className="text-body-md-semibold text-fg-strong">extract-component-figma.md</h4>
                                    <p className="text-caption-sm text-fg-muted">~500 linhas</p>
                                </div>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted">
                                Workflow para extrair designs do Figma e convertê-los em componentes React,
                                mapeando propriedades visuais para tokens do design system.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 7. CLI Commands */}
                <section className="space-y-6">
                    <h2 className="text-section-title text-fg-strong mb-6 flex items-center gap-2 border-b border-border pb-4">
                        <Terminal className="size-5 text-fg-critical" />
                        CLI Reference
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-bg-subtle border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Play className="size-4 text-fg-success" />
                                <span className="font-bold text-fg-strong">Dev Server</span>
                            </div>
                            <code className="block bg-bg-muted p-3 rounded font-mono text-sm border border-border text-fg-main">npm run dev</code>
                            <p className="text-caption-sm text-fg-muted mt-2">Inicia o servidor local em :3000</p>
                        </div>
                        <div className="bg-bg-subtle border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Code2 className="size-4 text-fg-info" />
                                <span className="font-bold text-fg-strong">Type Check</span>
                            </div>
                            <code className="block bg-bg-muted p-3 rounded font-mono text-sm border border-border text-fg-main">npx tsc --noEmit</code>
                            <p className="text-caption-sm text-fg-muted mt-2">Verifica erros de TypeScript</p>
                        </div>
                        <div className="bg-bg-subtle border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Layers className="size-4 text-fg-warning" />
                                <span className="font-bold text-fg-strong">Build</span>
                            </div>
                            <code className="block bg-bg-muted p-3 rounded font-mono text-sm border border-border text-fg-main">npm run build</code>
                            <p className="text-caption-sm text-fg-muted mt-2">Gera o bundle de produção</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
