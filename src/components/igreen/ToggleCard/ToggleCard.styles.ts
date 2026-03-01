/**
 * Estilos do ToggleCard
 * 
 * Centraliza estilos baseados em tokens semânticos do iGreen.
 * Refinado com base em node-id=2568-6640 e 2794-6791.
 */
export const toggleCardStyles = {
    // ===== CONTAINER PRINCIPAL =====
    container: {
        base: "flex flex-col bg-bg-muted border border-border rounded-lg p-3.5 transition-all duration-300 ease-in-out",
        checked: "",
        unchecked: "",
    },

    // ===== ESTADOS GERAIS =====
    disabled: "opacity-60 pointer-events-none",

    // ===== HEADER (Icon + Texts + Toggle) =====
    header: {
        container: "flex items-center gap-3 w-full flex-wrap md:flex-nowrap",
    },

    // ===== ÍCONE =====
    icon: {
        container: "flex items-center justify-center shrink-0 size-[42px] bg-bg-surface rounded-base border border-border shadows-boxshadow-xs",
        inner: "size-6 flex items-center justify-center [&_svg]:size-full text-fg-strong",
    },

    // ===== TEXTOS =====
    content: {
        container: "flex flex-col flex-1 min-w-0 gap-px",
        title: "text-body-lg-semibold text-fg-strong",
        description: "text-caption-sm text-fg-muted",
    },

    // ===== TOGGLE SWITCH (Sim/Não) =====
    toggle: {
        container: "flex items-center p-1 gap-1 bg-bg-background rounded-base border border-border shrink-0 w-full md:w-auto mt-0 md:mt-0",

        button: {
            base: "flex items-center justify-center h-[34px] min-w-[54px] px-4 rounded-sm text-body-sm-semibold transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring-primary focus-visible:outline-none flex-1 md:flex-none w-full md:w-auto",

            // Estado Ativo (Selecionado)
            activeMatches: {
                true: "bg-bg-primary text-fg-on-primary shadow-sm",
                false: "bg-bg-fill text-fg-on-primary shadow-sm",
            },

            // Estado Inativo (Não Selecionado)
            inactive: "bg-transparent text-fg-muted hover:text-fg-strong",
        }
    },

    // ===== CHILDREN EXPANSION =====
    expansion: {
        wrapper: "grid transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]",
        visible: "grid-rows-[1fr] opacity-100",
        hidden: "grid-rows-[0fr] opacity-0",
        inner: "overflow-hidden",
        content: "pt-2 border-t border-border-muted mt-2 border-solid",
    }
};
