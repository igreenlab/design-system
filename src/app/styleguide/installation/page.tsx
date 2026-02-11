"use client";

import { Terminal, Play, Palette, Layers, Code2, Box, Puzzle, ArrowRight, Copy, Check, RefreshCw } from "lucide-react";
import { useState } from "react";

/* ============================================================
   COPY BUTTON – Reusable inline code-copy button
   ============================================================ */
function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-bg-muted hover:bg-bg-fill transition-colors text-fg-muted hover:text-fg-strong"
            aria-label="Copiar código"
        >
            {copied ? <Check className="size-3.5 text-fg-success" /> : <Copy className="size-3.5" />}
        </button>
    );
}

/* ============================================================
   CODE BLOCK – Styled <pre> with copy button
   ============================================================ */
function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
    return (
        <div className="relative group">
            <CopyButton text={code} />
            <pre className="bg-bg-inverse text-fg-on-dark p-4 rounded-lg font-mono text-sm leading-relaxed overflow-x-auto">
                <code>{code}</code>
            </pre>
            <div className="absolute bottom-2 right-3 text-[10px] text-fg-muted-on-inverted font-mono opacity-50">
                {language}
            </div>
        </div>
    );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function InstallationPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="border-b border-border-muted bg-bg-surface sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-display-lg text-fg-strong">
                            Installation
                        </h1>
                        <span className="bg-bg-primary-subtle text-fg-primary text-caption-sm font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Guide
                        </span>
                    </div>
                    <p className="text-body-lg-medium text-fg-muted">
                        Clone, instale e comece a construir com o iGreen Design System em minutos
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">

                {/* ============================================================
                   1. QUICK START
                   ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Play className="size-5 text-fg-success" />
                        Quick Start
                    </h2>
                    <p className="text-body-md-medium text-fg-muted max-w-4xl">
                        O iGreen Design System é um projeto Next.js pronto para uso. Basta clonar o repositório,
                        instalar as dependências e iniciar o servidor de desenvolvimento.
                    </p>

                    {/* Prerequisites */}
                    <div className="bg-bg-warning-subtle border border-border-warning-muted rounded-lg p-4">
                        <h4 className="text-body-sm-bold text-fg-warning mb-2">📋 Pré-requisitos</h4>
                        <ul className="list-disc pl-5 space-y-1 text-body-sm-medium text-fg-muted">
                            <li><strong>Node.js 18+</strong> — recomendado LTS</li>
                            <li><strong>Git</strong> — para clonar o repositório</li>
                            <li><strong>npm</strong> ou <strong>yarn</strong> ou <strong>pnpm</strong></li>
                        </ul>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center size-6 rounded-full bg-bg-primary text-fg-on-primary text-caption-sm font-bold">1</span>
                                <span className="text-body-md-semibold text-fg-strong">Clone o repositório</span>
                            </div>
                            <CodeBlock code="git clone https://github.com/snksergio/igreenlink.git" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center size-6 rounded-full bg-bg-primary text-fg-on-primary text-caption-sm font-bold">2</span>
                                <span className="text-body-md-semibold text-fg-strong">Entre na pasta do projeto</span>
                            </div>
                            <CodeBlock code="cd igreenlink" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center size-6 rounded-full bg-bg-primary text-fg-on-primary text-caption-sm font-bold">3</span>
                                <span className="text-body-md-semibold text-fg-strong">Instale as dependências</span>
                            </div>
                            <CodeBlock code="npm install" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center size-6 rounded-full bg-bg-primary text-fg-on-primary text-caption-sm font-bold">4</span>
                                <span className="text-body-md-semibold text-fg-strong">Inicie o servidor de desenvolvimento</span>
                            </div>
                            <CodeBlock code="npm run dev" />
                        </div>
                    </div>

                    <div className="bg-bg-success-subtle border border-border-success-muted rounded-lg p-4">
                        <p className="text-body-sm-bold text-fg-success mb-1">✅ Pronto!</p>
                        <p className="text-body-sm-medium text-fg-muted">
                            Acesse <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono">http://localhost:3000</code> no navegador.
                            O styleguide estará em <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono">/styleguide</code>.
                        </p>
                    </div>
                </section>

                {/* ============================================================
                   2. HELLO WORLD – Consumindo tokens
                   ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Code2 className="size-5 text-fg-primary" />
                        Hello World — Usando Tokens
                    </h2>
                    <p className="text-body-md-medium text-fg-muted max-w-4xl">
                        Crie um arquivo em <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono">src/app/hello/page.tsx</code> e
                        use tokens de <strong>cores</strong>, <strong>tipografia</strong> e <strong>sombras</strong> do design system diretamente como classes Tailwind.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Code */}
                        <div>
                            <div className="text-caption-sm text-fg-muted font-mono mb-2">src/app/hello/page.tsx</div>
                            <CodeBlock
                                language="tsx"
                                code={`export default function HelloPage() {
  return (
    <div className="min-h-screen bg-bg-canvas p-8">
      {/* Card com sombra e border radius */}
      <div className="max-w-md mx-auto bg-bg-surface
        border border-border rounded-base
        shadows-boxshadow-sm p-6 space-y-4">

        {/* Título – token de tipografia */}
        <h1 className="text-display-lg text-fg-strong">
          Hello World 🌱
        </h1>

        {/* Subtítulo – cor semântica */}
        <p className="text-body-md-medium text-fg-muted">
          Este card usa tokens do iGreen Design System.
        </p>

        {/* Badge – background e foreground primários */}
        <span className="inline-block bg-bg-primary
          text-fg-on-primary text-caption-sm
          font-bold px-3 py-1 rounded-full">
          iGreen Token
        </span>

        {/* Alerta com sombra XL */}
        <div className="bg-bg-warning-subtle
          border border-border-warning-muted
          rounded-lg shadows-boxshadow-xl p-4">
          <p className="text-body-sm-semibold
            text-fg-warning">
            ⚠️ Exemplo de feedback warning
          </p>
        </div>
      </div>
    </div>
  );
}`}
                            />
                        </div>

                        {/* Preview */}
                        <div>
                            <div className="text-caption-sm text-fg-muted font-mono mb-2">Preview</div>
                            <div className="bg-bg-canvas p-6 rounded-lg border border-border min-h-[300px] flex items-start justify-center">
                                <div className="max-w-md w-full bg-bg-surface border border-border rounded-base shadows-boxshadow-sm p-6 space-y-4">
                                    <h1 className="text-display-lg text-fg-strong">Hello World 🌱</h1>
                                    <p className="text-body-md-medium text-fg-muted">
                                        Este card usa tokens do iGreen Design System.
                                    </p>
                                    <span className="inline-block bg-bg-primary text-fg-on-primary text-caption-sm font-bold px-3 py-1 rounded-full">
                                        iGreen Token
                                    </span>
                                    <div className="bg-bg-warning-subtle border border-border-warning-muted rounded-lg shadows-boxshadow-xl p-4">
                                        <p className="text-body-sm-semibold text-fg-warning">⚠️ Exemplo de feedback warning</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tokens Used */}
                    <div className="bg-bg-surface border border-border rounded-lg p-6">
                        <h3 className="text-body-sm-bold text-fg-muted uppercase mb-4 tracking-wider">Tokens utilizados neste exemplo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-primary">🎨 Cores</div>
                                <div className="space-y-1 font-mono text-xs text-fg-main">
                                    <div><code className="text-fg-success">bg-bg-canvas</code> — fundo da página</div>
                                    <div><code className="text-fg-success">bg-bg-surface</code> — fundo do card</div>
                                    <div><code className="text-fg-success">bg-bg-primary</code> — fundo do badge</div>
                                    <div><code className="text-fg-success">text-fg-strong</code> — texto principal</div>
                                    <div><code className="text-fg-success">text-fg-muted</code> — texto secundário</div>
                                    <div><code className="text-fg-success">text-fg-on-primary</code> — texto sobre primário</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-info">📝 Tipografia</div>
                                <div className="space-y-1 font-mono text-xs text-fg-main">
                                    <div><code className="text-fg-success">text-display-lg</code> — título grande</div>
                                    <div><code className="text-fg-success">text-body-md-medium</code> — corpo médio</div>
                                    <div><code className="text-fg-success">text-body-sm-semibold</code> — corpo pequeno bold</div>
                                    <div><code className="text-fg-success">text-caption-sm</code> — caption pequena</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-caption-sm font-semibold text-fg-warning">✨ Sombras & Radius</div>
                                <div className="space-y-1 font-mono text-xs text-fg-main">
                                    <div><code className="text-fg-success">shadows-boxshadow-sm</code> — sombra leve</div>
                                    <div><code className="text-fg-success">shadows-boxshadow-xl</code> — sombra pronunciada</div>
                                    <div><code className="text-fg-success">rounded-base</code> — radius padrão (12px)</div>
                                    <div><code className="text-fg-success">rounded-full</code> — totalmente redondo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================
                   3. THEME ARCHITECTURE
                   ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Palette className="size-5 text-fg-warning" />
                        Arquitetura de Temas
                    </h2>

                    <p className="text-body-md-medium text-fg-muted max-w-4xl">
                        O tema funciona em <strong>3 camadas</strong>: os valores primitivos definem as cores brutas, os tokens semânticos
                        dão significado contextual, e o <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono">globals.css</code> faz
                        a ponte para o Tailwind CSS v4 gerar classes utilitárias.
                    </p>

                    {/* Flow Diagram */}
                    <div className="bg-bg-surface border border-border rounded-lg p-6 overflow-x-auto">
                        <h3 className="text-body-sm-bold text-fg-muted uppercase mb-6 tracking-wider">Fluxo de Tokens</h3>
                        <div className="flex items-center gap-3 min-w-[700px]">
                            {/* Step 1 */}
                            <div className="flex-1 bg-bg-primary-subtle border border-border-primary-muted rounded-lg p-4 text-center">
                                <div className="text-caption-sm font-bold text-fg-primary mb-1">1. Primitives</div>
                                <div className="font-mono text-xs text-fg-muted">themes/default/primitives/</div>
                                <div className="mt-2 bg-bg-muted rounded p-2 font-mono text-[10px] text-fg-main text-left">
                                    --color-brand-500: oklch(...)
                                </div>
                            </div>
                            <ArrowRight className="size-5 text-fg-muted shrink-0" />
                            {/* Step 2 */}
                            <div className="flex-1 bg-bg-success-subtle border border-border-success-muted rounded-lg p-4 text-center">
                                <div className="text-caption-sm font-bold text-fg-success mb-1">2. Semantic</div>
                                <div className="font-mono text-xs text-fg-muted">themes/default/semantic/</div>
                                <div className="mt-2 bg-bg-muted rounded p-2 font-mono text-[10px] text-fg-main text-left">
                                    --bg-primary: var(--color-brand-500)
                                </div>
                            </div>
                            <ArrowRight className="size-5 text-fg-muted shrink-0" />
                            {/* Step 3 */}
                            <div className="flex-1 bg-bg-info-subtle border border-border-info-muted rounded-lg p-4 text-center">
                                <div className="text-caption-sm font-bold text-fg-info mb-1">3. globals.css @theme</div>
                                <div className="font-mono text-xs text-fg-muted">src/app/globals.css</div>
                                <div className="mt-2 bg-bg-muted rounded p-2 font-mono text-[10px] text-fg-main text-left">
                                    --color-bg-primary: var(--bg-primary)
                                </div>
                            </div>
                            <ArrowRight className="size-5 text-fg-muted shrink-0" />
                            {/* Step 4 */}
                            <div className="flex-1 bg-bg-warning-subtle border border-border-warning-muted rounded-lg p-4 text-center">
                                <div className="text-caption-sm font-bold text-fg-warning mb-1">4. Tailwind Classes</div>
                                <div className="font-mono text-xs text-fg-muted">Uso no JSX</div>
                                <div className="mt-2 bg-bg-muted rounded p-2 font-mono text-[10px] text-fg-main text-left">
                                    className=&quot;bg-bg-primary&quot;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Explanations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* themes/index.css */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="size-4 text-fg-primary" />
                                <h3 className="text-body-lg-semibold text-fg-strong">themes/index.css</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Ponto de entrada do tema. Importa os primitivos e semânticos na ordem correta.
                                Para criar um tema novo (ex: <code className="text-fg-primary">ocean</code>), basta criar uma pasta
                                e trocar os imports.
                            </p>
                            <CodeBlock
                                language="css"
                                code={`/* themes/index.css */
/* Default Theme */
@import "./default/primitives/index.css";
@import "./default/semantic/index.css";

/* Future themes: */
/* @import "./ocean/primitives/index.css"; */`}
                            />
                        </div>

                        {/* globals.css */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="size-4 text-fg-info" />
                                <h3 className="text-body-lg-semibold text-fg-strong">globals.css — O Bridge</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                O <code className="text-fg-primary">globals.css</code> importa os tokens de <code className="text-fg-primary">themes/</code> e os re-exporta dentro
                                do bloco <code className="text-fg-primary">@theme {`{}`}</code> do Tailwind v4. Isso permite que o Tailwind
                                gere classes utilitárias como <code className="text-fg-success">bg-bg-primary</code> automaticamente — <strong>sem precisar usar <code>var(--...)</code></strong>.
                            </p>
                            <CodeBlock
                                language="css"
                                code={`/* src/app/globals.css */
@import "../../themes/index.css";
@import "tailwindcss";

@theme {
  /* Re-exporta tokens como "Tailwind tokens" */
  --color-bg-primary: var(--bg-primary);
  --color-fg-strong: var(--fg-strong);
  --color-bg-surface: var(--bg-surface);
  /* ... todos os tokens semânticos */
}

/* Resultado: podemos usar diretamente */
/* className="bg-bg-primary text-fg-strong" */`}
                            />
                        </div>

                        {/* Shadcn Compatibility */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Puzzle className="size-4 text-fg-warning" />
                                <h3 className="text-body-lg-semibold text-fg-strong">compatibility.css — Shadcn Bridge</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                O arquivo <code className="text-fg-primary">themes/default/semantic/compatibility.css</code> mapeia tokens iGreen para tokens
                                que o Shadcn UI espera (ex: <code className="text-fg-primary">--primary</code>, <code className="text-fg-primary">--border</code>). Assim, componentes Shadcn
                                funcionam automaticamente com as cores do design system, tanto em light quanto em dark mode.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CodeBlock
                                    language="css"
                                    code={`:root {
  --primary: var(--color-bg-primary);
  --primary-foreground: var(--color-fg-on-primary);
  --border: var(--color-border);
  --background: var(--color-bg-surface);
  --destructive: var(--color-bg-critical);
  /* ... */
}`}
                                />
                                <CodeBlock
                                    language="css"
                                    code={`.dark {
  --primary: oklch(0.922 0 0);
  --background: oklch(0.145 0 0);
  --border: oklch(1 0 0 / 10%);
  --destructive: oklch(0.704 0.191 22.216);
  /* ... */
}`}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================
                   4. TAILWIND MERGE & CN()
                   ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <RefreshCw className="size-5 text-fg-info" />
                        Tailwind Merge & <code className="font-mono text-fg-primary">cn()</code>
                    </h2>

                    <p className="text-body-md-medium text-fg-muted max-w-4xl">
                        A função <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono">cn()</code> combina
                        <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono mx-1">clsx</code> (composição condicional de classes) com
                        <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono ml-1">tailwind-merge</code> (resolução de conflitos).
                        Ela é <strong>essencial</strong> para compor estilos com variações sem duplicar classes.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* tailwind-merge.config.ts */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-body-md-semibold text-fg-strong mb-3">Por que configurar o Tailwind Merge?</h3>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                O <code className="text-fg-primary">tailwind-merge</code> por padrão só conhece as classes nativas do Tailwind.
                                Nossos tokens customizados (<code className="text-fg-primary">text-display-lg</code>, <code className="text-fg-primary">shadows-boxshadow-sm</code>, <code className="text-fg-primary">h-form-md</code>)
                                precisam ser registrados para que o merge saiba que eles <strong>pertencem ao mesmo grupo</strong> e devem se sobrescrever corretamente.
                            </p>
                            <CodeBlock
                                language="typescript"
                                code={`// themes/tailwind-merge.config.ts
import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Tipografia: 'text-display-lg' substitui 'text-sm'
      'font-size': [
        { 'text': [
          'display-lg', 'display-md', 'display-sm',
          'page-title', 'section-title',
          'body-lg-medium', 'body-md-semibold',
          'button-md', 'caption-sm',
          // ... todos os tokens de texto
        ]}
      ],
      // Sombras customizadas
      'shadow': [
        'shadows-boxshadow-xs',
        'shadows-boxshadow-sm',
        'shadows-boxshadow-base',
        'shadows-boxshadow-xl',
      ],
      // Heights de formulário
      'h': ['form-xxs', 'form-xs', 'form-sm',
            'form-md', 'form-lg', 'form-xl'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                            />
                        </div>

                        {/* Uso prático do cn() */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <h3 className="text-body-md-semibold text-fg-strong mb-3">Usando <code className="text-fg-primary">cn()</code> na prática</h3>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Use <code className="text-fg-primary">cn()</code> para compor estilos base com variações condicionais.
                                O merge resolve conflitos automaticamente — a última classe vence.
                            </p>
                            <CodeBlock
                                language="tsx"
                                code={`import { cn } from "@/lib/utils";

// Exemplo 1: Estilos condicionais
<div className={cn(
  "bg-bg-surface text-fg-main rounded-base",
  isActive && "bg-bg-primary text-fg-on-primary",
  className // permite override pelo consumidor
)} />

// Exemplo 2: Component styles file
export const cardStyles = {
  base: "bg-bg-surface border border-border " +
    "rounded-base shadows-boxshadow-sm",
  active: "border-border-primary bg-bg-primary-subtle",
};

// No componente:
<div className={cn(
  cardStyles.base,
  active && cardStyles.active,
  className
)} />`}
                            />
                        </div>
                    </div>

                    {/* Bridge Explanation */}
                    <div className="bg-bg-info-subtle border border-border-info-muted rounded-lg p-4">
                        <h4 className="text-body-sm-bold text-fg-info mb-2">🔗 Bridge: lib/utils.ts → themes/tailwind-merge.config.ts</h4>
                        <p className="text-body-sm-medium text-fg-muted mb-3">
                            O arquivo <code className="text-fg-primary">src/lib/utils.ts</code> simplesmente <strong>re-exporta</strong> a
                            função <code className="text-fg-primary">cn()</code> do config de temas. Shadcn UI espera importar de <code className="text-fg-primary">@/lib/utils</code>,
                            então esse bridge mantém compatibilidade.
                        </p>
                        <CodeBlock
                            language="typescript"
                            code={`// src/lib/utils.ts
import { cn as themeCn } from "@themes/tailwind-merge.config"
export const cn = themeCn`}
                        />
                    </div>
                </section>

                {/* ============================================================
                   5. SHADCN COMPONENTS
                   ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-section-title text-fg-strong flex items-center gap-2 border-b border-border pb-4">
                        <Box className="size-5 text-fg-success" />
                        Componentes Shadcn UI
                    </h2>

                    <p className="text-body-md-medium text-fg-muted max-w-4xl">
                        Os componentes em <code className="text-fg-primary bg-bg-primary-subtle px-1.5 py-0.5 rounded font-mono">src/components/shadcn/</code> são
                        baseados no Shadcn UI mas possuem <strong>alterações visuais</strong> para se adequar ao iGreen Design System — como cores, sombras,
                        border-radius e tipografia customizados.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Custom vs Raw */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="size-8 rounded-lg bg-bg-primary-subtle flex items-center justify-center">
                                    <Palette className="size-4 text-fg-primary" />
                                </div>
                                <h3 className="text-body-lg-semibold text-fg-strong">Customizado (padrão)</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Os componentes já vêm estilizados com os tokens iGreen. Basta importar e usar — cores,
                                radius, sombras e tipografia já estão aplicados.
                            </p>
                            <CodeBlock
                                language="tsx"
                                code={`// Já customizado com tokens iGreen
import { Button } from "@/components/shadcn/button"

<Button variant="default">
  Enviar  {/* bg-bg-primary, rounded-base... */}
</Button>`}
                            />
                        </div>

                        {/* Resetting to raw */}
                        <div className="bg-bg-surface border border-border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="size-8 rounded-lg bg-bg-warning-subtle flex items-center justify-center">
                                    <RefreshCw className="size-4 text-fg-warning" />
                                </div>
                                <h3 className="text-body-lg-semibold text-fg-strong">Restaurar Shadcn original</h3>
                            </div>
                            <p className="text-body-sm-medium text-fg-muted mb-4">
                                Se você preferir usar o componente <strong>cru do Shadcn</strong> (com a estrutura base da documentação oficial), basta
                                re-instalar o componente e <strong>escolher a opção de sobrescrever</strong>.
                            </p>
                            <CodeBlock
                                language="bash"
                                code={`# Reinstala o Button do Shadcn original
npx shadcn@latest add button

# Quando perguntar se deseja sobrescrever:
# > Would you like to overwrite?  Yes
# Selecione "Yes" para substituir`}
                            />
                        </div>
                    </div>

                    <div className="bg-bg-info-subtle border border-border-info-muted rounded-lg p-4">
                        <h4 className="text-body-sm-bold text-fg-info mb-2">💡 Importante</h4>
                        <p className="text-body-sm-medium text-fg-muted">
                            Mesmo ao sobrescrever um componente Shadcn, as <strong>cores do tema são mantidas</strong> automaticamente, pois vêm da
                            camada de <code className="text-fg-primary">compatibility.css</code> — que mapeia tokens como <code className="text-fg-primary">--primary</code>, <code className="text-fg-primary">--border</code>, <code className="text-fg-primary">--destructive</code> para os
                            valores do iGreen Design System. A diferença é apenas na <strong>estrutura do componente</strong> (classes de layout, animações, etc).
                        </p>
                    </div>

                    {/* Components List */}
                    <div className="bg-bg-surface border border-border rounded-lg p-6">
                        <h3 className="text-body-sm-bold text-fg-muted uppercase mb-4 tracking-wider">Componentes Shadcn customizados</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                "Alert", "Button", "Checkbox", "Collapsible", "Dialog",
                                "Dropdown Menu", "Field", "Input", "Input Group", "Label",
                                "Progress", "Select", "Separator", "Spinner", "Tabs", "Textarea"
                            ].map(name => (
                                <span key={name} className="bg-bg-muted text-fg-main text-caption-sm font-mono px-2.5 py-1 rounded-lg border border-border">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
