"use client";

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/shadcn/collapsible";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import type { TextCollapseProps } from "./text-collapse.types";
import { textCollapseStyles } from "./text-collapse.styles";

export function TextCollapse({
    title,
    description,
    children,
    className,
    defaultOpen = false,
    open,
    onOpenChange,
    ...props
}: TextCollapseProps) {
    // If open/onOpenChange are controlled, we use them. Otherwise we might rely on internal state if shadcn collapsible supports unmount logic?
    // Shadcn Collapsible supports controlled and uncontrolled.

    // We need to know the state to switch the icon between Plus and Minus.
    // If it is uncontrolled, we need local state to track it for the icon, 
    // OR we can use CSS groups (data-state=open) to show/hide icons if we render both.
    // Let's fallback to local state if uncontrolled to ensure icon sync, or simply trust data-state.

    // Better approach: Render both icons and toggle visibility with CSS based on group data-state.
    // Plus: visible when closed (data-state=closed). Hidden when open.
    // Minus: visible when open. Hidden when closed.

    return (
        <Collapsible
            defaultOpen={defaultOpen}
            open={open}
            onOpenChange={onOpenChange}
            className={cn(textCollapseStyles.root, className)}
            {...props}
        >
            <CollapsibleTrigger className={textCollapseStyles.trigger.base}>
                <span className={textCollapseStyles.trigger.text}>
                    {title}
                </span>

                {/* Icon Wrapper */}
                <div className={textCollapseStyles.iconWrapper}>
                    <Plus className={cn(
                        textCollapseStyles.icons.base,
                        textCollapseStyles.icons.plus
                    )} />
                    <Minus className={cn(
                        textCollapseStyles.icons.base,
                        textCollapseStyles.icons.minus
                    )} />
                </div>
            </CollapsibleTrigger>

            <CollapsibleContent className={textCollapseStyles.content.base}>
                {children || description}
            </CollapsibleContent>
        </Collapsible>
    );
}
