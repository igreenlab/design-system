export const cardListStyles = {
    container: "flex flex-col overflow-hidden rounded-base border border-border bg-bg-background shadows-boxshadow-base",
    item: {
        base: "flex items-center gap-4 bg-white px-4.5 py-3.5",
        separator: "border-b border-border-muted",
    },
    icon: {
        container: "flex shrink-0 items-center justify-center size-9 rounded-sm bg-bg-primary-subtle border border-border-primary-muted",
        inner: "size-[18px] flex items-center justify-center [&_svg]:size-full text-fg-primary",
    },
    text: "text-body-md-semibold text-fg-strong",
};
