/**
 * Estilos do Dialog
 * 
 * Mapeamento baseado no Figma Node 2508-8998
 */

export const dialogStyles = {
    // ===== UTILS =====
    overlay: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",

    // ===== CONTAINER DE CONTEÚDO =====
    content: {
        base: "fixed left-0 top-auto bottom-0 z-50 grid w-full max-w-none translate-x-0 translate-y-0 position-relative" +
            "gap-6 sm:gap-8 bg-bg-surface p-7 sm:px-9 sm:py-10 shadow-lg " +
            // Configurações de Animação (Slide Up no Mobile)
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out " +
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 " +
            "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full " +
            // Estilo Visual & Layout Flex para Scroll
            "rounded-t-[24px] rounded-b-none border-t border-border focus-visible:outline-none flex flex-col max-h-[85vh] sm:max-h-[80vh] " +
            // Breakpoints Desktop (Mantendo sua lógica intacta)
            "sm:left-[50%] sm:top-[50%] sm:bottom-auto sm:w-full sm:max-w-[550px] " +
            "sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl sm:border " +
            "sm:data-[state=closed]:slide-out-to-top-[48%] sm:data-[state=open]:slide-in-from-top-[48%] " +
            "sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95",
        /** Full height variant - 100vh on mobile */
        fullHeight: "max-h-[100vh] sm:max-h-[80vh] rounded-none sm:rounded-xl",
    },

    // ===== HEADER =====
    header: {
        container: "flex flex-row gap-[18px] items-start w-full text-left",
        textContainer: "flex flex-col gap-[6px] flex-1 text-left",
        title: "text-modal-title",
        description: "text-body-lg-medium text-fg-muted",
    },

    // ===== ÍCONE =====
    icon: {
        wrapper: "hidden md:flex items-center justify-center shrink-0 size-[52px] rounded-sm bg-bg-primary-subtle",
        inner: "size-6 flex items-center justify-center text-fg-primary [&_svg]:size-full",
    },

    // ===== CLOSE BUTTON =====
    closeButton: {
        base: "absolute top-8 right-8 rounded-sm disabled:pointer-events-none text-fg-main hover:text-fg-strong transition-colors",
    },

    // ===== FOOTER =====
    footer: {
        base: "!grid grid-cols-2 gap-3 w-full",
    },

    // ===== CONTENT WRAPPER =====
    contentWrapper: "w-full overflow-y-auto flex-1 min-h-0",

    // ===== BUTTONS =====
    actionButton: "w-full",

    // ===== UTILITIES =====
    // Oculta buttons absolutos que NÃO tenham o atributo data-igreen-close
    hideDefaultClose: "[&>button[type=button].absolute:not([data-igreen-close])]:hidden",
};
