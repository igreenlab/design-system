export const choiceStyles = {
    group: {
        container: "flex flex-col gap-3 p-3 bg-bg-muted border border-border rounded-base",
    },
    item: {
        base: "group flex items-center gap-3 p-2.5 pr-[18px] rounded-base border border-transparent transition-all duration-300 ease-in-out cursor-pointer text-left w-full relative active:scale-[0.99] active:duration-100 hover:border-border-muted/50",
        variants: {
            active: "bg-bg-surface border-border-muted shadows-boxshadow-base ring-1 ring-border-muted",
            inactive: "bg-transparent hover:bg-bg-surface hover:shadows-boxshadow-base",
        },
        iconWrapper: {
            base: "shrink-0 size-9 md:size-[42px] flex items-center justify-center rounded-sm transition-all duration-300 ease-in-out group-active:scale-95",
            active: "bg-bg-primary-subtle text-fg-primary",
            inactive: "bg-bg-surface text-fg-strong group-hover:bg-bg-muted",
            inner: "size-6 flex items-center justify-center [&_svg]:size-full transition-transform duration-300",
        },
        content: {
            container: "flex flex-col gap-[1px] flex-1 transition-opacity duration-200",
            title: "text-body-md-semibold text-fg-strong",
            description: "text-body-xs-medium text-fg-muted group-hover:text-fg-main transition-colors",
        },
        selectionIndicator: {
            base: "shrink-0 transition-transform duration-300 ease-out",
            active: "text-fg-primary scale-100",
            inactive: "text-fg-muted scale-95 group-hover:scale-100 group-hover:text-fg-main",
        }
    }
};
