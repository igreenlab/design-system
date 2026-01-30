import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    // Base styles - usando tokens do design system
    [
        "inline-flex items-center justify-center whitespace-nowrap",
        "gap-3",  // 12px gap do Figma
        "cursor-pointer",
        "transition-colors",
        "border",
        "focus-visible:outline-none focus-visible:ring-ring-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        "disabled:pointer-events-none disabled:opacity-50"
    ],
    {
        variants: {
            variant: {
                default: "",
                soft: "",
                link: "text-fg-primary underline-offset-4 hover:!underline border-none bg-transparent shadow-none px-0 h-auto gap-2",
            },
            color: {
                primary: "",
                secondary: "",
                warning: "",
                critical: "",
            },
            size: {
                // Usando CSS custom properties para altura + classes de typography
                md: "h-[var(--height-form-md)] px-4 text-button-sm",  // 46px + 16px padding + classe CSS
                lg: "h-[var(--height-form-lg)] px-5 text-button-md",  // 52px + 20px padding + classe CSS  
                xl: "h-[var(--height-form-xl)] px-6 text-button-md",  // 60px + 24px padding + classe CSS
            },
            onlyIcon: {
                true: "",
                false: "",
            },
        },
        compoundVariants: [
            // Primary + Default
            {
                variant: "default",
                color: "primary",
                className: "bg-bg-primary text-fg-on-primary border-transparent hover:bg-bg-primary-hover",
            },
            // Primary + Soft
            {
                variant: "soft",
                color: "primary",
                className: "bg-bg-primary-subtle text-fg-primary border-border-primary-muted hover:bg-bg-primary-subtle-hover",
            },
            // Secondary + Default
            {
                variant: "default",
                color: "secondary",
                className: "bg-bg-secondary text-fg-on-secondary border-border hover:bg-bg-secondary-hover",
            },
            // Secondary + Soft
            {
                variant: "soft",
                color: "secondary",
                className: "bg-bg-secondary-subtle text-fg-secondary border-border hover:bg-bg-muted",
            },
            // Warning + Default
            {
                variant: "default",
                color: "warning",
                className: "bg-bg-warning text-fg-on-warning border-transparent hover:bg-bg-warning-hover",
            },
            // Warning + Soft
            {
                variant: "soft",
                color: "warning",
                className: "bg-bg-warning-subtle text-fg-warning border-border-warning-muted hover:bg-bg-warning-subtle-hover",
            },
            // Critical + Default
            {
                variant: "default",
                color: "critical",
                className: "bg-bg-critical text-fg-on-critical border-transparent hover:bg-bg-critical-hover",
            },
            // Critical + Soft
            {
                variant: "soft",
                color: "critical",
                className: "bg-bg-critical-subtle text-fg-critical border-border-critical-muted hover:bg-bg-critical-muted",
            },
            // Only Icon variants (square buttons) - usando CSS custom properties
            {
                onlyIcon: true,
                size: "md",
                className: "w-[var(--height-form-md)] h-[var(--height-form-md)] px-0",  // 46×46px
            },
            {
                onlyIcon: true,
                size: "lg",
                className: "w-[var(--height-form-lg)] h-[var(--height-form-lg)] px-0",  // 52×52px
            },
            {
                onlyIcon: true,
                size: "xl",
                className: "w-[var(--height-form-xl)] h-[var(--height-form-xl)] px-0",  // 60×60px
            },
        ],
        defaultVariants: {
            variant: "default",
            color: "primary",
            size: "lg",
            onlyIcon: false,
        },
    }
);

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    loading?: boolean;
}>(
    (
        {
            className,
            variant,
            color,
            size,
            onlyIcon,
            asChild = false,
            startIcon,
            endIcon,
            loading,
            disabled,
            children,
            style,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        // Icon size - 24px for onlyIcon (Figma), 18px otherwise
        const iconSizeClass = onlyIcon ? "w-[24px] h-[24px]" : "w-[18px] h-[18px]";

        return (
            <Comp
                className={cn(buttonVariants({ variant, color, size, onlyIcon, className }))}
                style={{
                    borderRadius: "var(--radius-base)",  // Usando --radius-base do design system
                    ...style
                }}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg
                        className={cn("animate-spin", iconSizeClass)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}

                {!loading && startIcon && (
                    <span className={cn("shrink-0 flex items-center justify-center", iconSizeClass)}>
                        {startIcon}
                    </span>
                )}

                {!onlyIcon && children}

                {!loading && endIcon && (
                    <span className={cn("shrink-0 flex items-center justify-center", iconSizeClass)}>
                        {endIcon}
                    </span>
                )}

                {onlyIcon && !loading && !startIcon && !endIcon && (
                    <Slot className={iconSizeClass}>
                        {children}
                    </Slot>
                )}
            </Comp>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;
