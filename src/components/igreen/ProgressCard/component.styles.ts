/**
 * Estilos do ProgressCard
 */
export const progressCardStyles = {
    container: {
        base: "flex flex-col p-4 md:p-[18px] bg-bg-surface border border-border rounded-base shadows-boxshadow-sm transition-all duration-200",
        variants: {
            default: "",
        }
    },
    header: {
        wrapper: "flex items-start justify-between gap-3",
        leftContent: "flex items-center gap-3 min-w-0 flex-1",
    },
    icon: {
        wrapper: "shrink-0 flex items-center justify-center size-9 md:size-10 rounded-sm transition-colors border border-border",
        clickable: "cursor-pointer hover:opacity-80 hover:bg-bg-muted",
        main: "size-5",
        variants: {
            loading: "bg-bg-surface text-fg-primary",
            extracting: "bg-bg-surface text-fg-primary",
            analyzing: "bg-bg-surface text-fg-primary",
            concluding: "bg-bg-surface text-fg-success",
            completed: "bg-bg-surface text-fg-success",
            error: "bg-bg-surface text-fg-critical",
        }
    },
    content: {
        wrapper: "flex flex-col min-w-0",
        title: "text-body-md-semibold text-fg-strong truncate",
        statusRow: "flex items-center gap-1 mt-0.5",
        statusIcon: {
            base: "size-4",
            success: "size-4 text-fg-success",
            error: "size-4 text-fg-critical",
            loading: "text-bg-primary",
            spin: "animate-spin",
        },
        statusText: "text-body-sm-medium text-fg-muted",
        statusTextError: "text-body-sm-medium text-fg-critical",
    },
    action: {
        button: "shrink-0 text-fg-muted hover:text-fg-strong transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary rounded-md p-1",
        icon: "size-5",
    },
    progressBar: {
        container: "mt-2",
        containerError: "mt-2 text-fg-critical",
        wrapper: "relative w-full h-1.5 bg-bg-muted rounded-full overflow-hidden mt-1",
        indicator: {
            indeterminate: "animate-progress-linear absolute top-0 left-0 h-full w-1/2 bg-bg-primary rounded-full",
            determinate: "h-full bg-bg-primary transition-all duration-500 rounded-full",
            full: "w-full",
            completed: "bg-bg-success",
            error: "bg-bg-critical",
        }
    },
    alert: {
        container: "mt-4",
        iconWrapper: "flex size-9 items-center justify-center rounded-[var(--radius-sm)] bg-bg-critical shrink-0",
        icon: "size-[18px] text-static-white",
    },
    childrenContainer: "mt-4",
};

export const animationStyles = `
    @keyframes progress-linear {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
    }
    .animate-progress-linear {
        animation: progress-linear 2s linear infinite;
    }
`;
