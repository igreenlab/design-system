export const accordionSelectStyles = {
    // Main container (list wrapper)
    root: {
        base: "flex flex-col w-full bg-bg-surface rounded-base overflow-hidden border border-border-muted",
        disabled: "opacity-50 pointer-events-none",
    },

    // Item container (row)
    item: {
        base: "group relative flex items-center justify-between w-full p-3 md:p-4 pl-3.5 md:pl-[18px] pr-4 md:pr-6 border-b border-border-muted last:border-b-0 cursor-pointer transition-colors hover:bg-bg-subtle/50 active:bg-bg-subtle",
        // Specific style for selected item view
        selectedView: "border-none p-3 md:p-4 pl-3.5 md:pl-[18px] pr-4 md:pr-6 cursor-default hover:bg-transparent",
    },

    // Animation Containers
    animation: {
        wrapper: "grid transition-all duration-300 ease-in-out",
        expanded: "grid-rows-[1fr] opacity-100",
        collapsed: "grid-rows-[0fr] opacity-0 invisible",
        inner: "overflow-hidden",
        list: "flex flex-col w-full",
    },

    // Left side content (Icon + Text)
    content: {
        wrapper: "flex items-center gap-3.5 flex-1 min-w-0 pr-4",
    },

    // Icon Wrapper
    iconWrapper: {
        base: "flex items-center justify-center size-9 md:size-[42px] rounded-[var(--radius-sm)] bg-bg-primary-subtle shrink-0 text-fg-primary",
    },

    // Text Content
    text: {
        wrapper: "flex flex-col gap-0.5 min-w-0",
        title: "text-body-md-semibold text-fg-strong truncate",
        description: "text-caption-sm text-fg-muted truncate",
    },

    // Action Icon
    action: {
        wrapper: "flex items-center justify-center text-fg-muted transition-colors group-hover:text-fg-main",
        editWrapper: "cursor-pointer p-2 rounded-full hover:bg-bg-subtle text-fg-muted hover:text-fg-main transition-colors",
        icon: "size-[18px]",
    },
};
