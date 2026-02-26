"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            // Layout
            "inline-flex items-center justify-center",
            // Background & Shape (from Figma: bg-muted, radius-base)
            "bg-bg-muted p-1 gap-1",
            "rounded-[var(--radius-base)]",
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            // Dimensions (from Figma: h-form-sm, radius-sm, px-3, gap-2.5)
            "h-form-sm flex-1 px-3",
            "rounded-sm",
            "inline-flex items-center justify-center gap-2.5",
            "whitespace-nowrap",
            // Typography (from Figma: text-body-md/semibold)
            "text-body-md-semibold",
            // Transitions & Cursor
            "cursor-pointer transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            // Inactive state (from Figma: fg-muted)
            "text-fg-muted",
            // Active state (from Figma: bg-surface, fg-primary, boxshadow-sm)
            "data-[state=active]:bg-bg-surface",
            "data-[state=active]:text-fg-primary",
            "data-[state=active]:shadow-[0px_1px_2px_rgba(0,0,0,0.05)]",
            className
        )}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
