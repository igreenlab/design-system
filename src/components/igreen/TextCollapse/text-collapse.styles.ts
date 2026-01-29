export const textCollapseStyles = {
    // Main container
    root: "w-full bg-bg-surface rounded-base p-3.5 shadows-boxshadow-xs flex flex-col data-[state=open]:gap-3 transition-all duration-300 ease-in-out",

    // Trigger button
    trigger: {
        base: "flex items-center justify-between w-full group outline-none cursor-pointer",
        text: "text-body-xs-semibold text-fg-main group-data-[state=open]:text-fg-primary transition-colors duration-300 ease-in-out text-left",

    },

    // Content area
    content: {
        base: "bg-bg-muted rounded-[10px] p-3 text-body-xs-medium text-fg-muted overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
    },
    // Icon Wrapper
    iconWrapper: "relative size-[14px]",

    // Icons
    icons: {
        base: "absolute inset-0 transition-opacity duration-300 ease-in-out size-[14px] text-fg-main group-data-[state=open]:text-fg-primary",
        plus: "opacity-100 group-data-[state=open]:opacity-0",
        minus: "opacity-0 group-data-[state=open]:opacity-100",
    },
};
