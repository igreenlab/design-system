import React, { forwardRef } from "react";
import { Mail } from "lucide-react";

import type { InputTextProps } from "./component.types";
import { inputTextStyles } from "./component.styles";
import { cn } from "@/lib/utils";

// Shadcn Primitives
import { Field, FieldLabel, FieldDescription } from "@/components/shadcn/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/shadcn/input-group";
import { Icon, type IconName } from "@/components/igreen/Icon";

// ===========================================
// HELPERS
// ===========================================

/**
 * Renders an icon from a string name or ReactNode.
 */
const renderIcon = (iconProp: React.ReactNode | IconName, defaultClass?: string) => {
    if (typeof iconProp === "string") {
        return <Icon name={iconProp as IconName} className={cn("size-5", defaultClass)} />;
    }
    return iconProp;
};

// ===========================================
// COMPONENT
// ===========================================

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
    (
        {
            label,
            helperText,
            status = "default",
            size = "md",
            startIcon,
            endIcon,
            isLoading,
            className,
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        const { type } = props;

        // ===========================================
        // STATE & STYLES
        // ===========================================

        const statusColorClass = inputTextStyles.status[status];
        const iconBaseColor = status !== "default" ? inputTextStyles.icon[status] : inputTextStyles.icon.base;

        // Helper text styling
        const helperStyle = status === "default"
            ? inputTextStyles.helper.default
            : inputTextStyles.helper[status];

        // Map Status to InputGroup variant (completed -> success)
        const inputGroupStatus = status === "completed" ? "success" : status;

        // Size mapping (InputGroup uses 'default' for 'lg' sizing logic usually, keeping consistent with Shadcn)
        const inputGroupSize = size === "lg" ? "default" : size;

        // ===========================================
        // CONTENT RESOLUTION
        // ===========================================

        // Start Icon: Check type="email" default override
        let resolvedStartIcon = renderIcon(startIcon);
        if (type === "email" && startIcon === undefined) {
            resolvedStartIcon = <Mail />;
        }

        // End Icon: Priority -> Loading > Completed > Prop
        let endContent: React.ReactNode = null;
        let endContentClass = iconBaseColor;

        if (isLoading) {
            endContent = <Icon name="line-loading" className="animate-spin size-5" />;
            endContentClass = inputTextStyles.icon.loading;
        } else if (status === "completed") {
            endContent = <Icon name="fill-check-circle" className="size-5" />;
            endContentClass = inputTextStyles.icon.completed;
        } else {
            endContent = renderIcon(endIcon);
        }

        // ===========================================
        // RENDER
        // ===========================================

        return (
            <Field className={cn(inputTextStyles.container, className)}>
                {label && (
                    <FieldLabel
                        htmlFor={id}
                        className={cn(inputTextStyles.label, statusColorClass)}
                    >
                        {label}
                    </FieldLabel>
                )}

                <InputGroup
                    size={inputGroupSize}
                    status={inputGroupStatus}
                    className={inputTextStyles.group.default}
                    data-disabled={disabled}
                >
                    {resolvedStartIcon && (
                        <InputGroupAddon className={cn(iconBaseColor)}>
                            {resolvedStartIcon}
                        </InputGroupAddon>
                    )}

                    <InputGroupInput
                        id={id}
                        disabled={disabled || isLoading}
                        ref={ref}
                        className={inputTextStyles.input}
                        aria-invalid={status === "error"}
                        {...props}
                    />

                    {endContent && (
                        <InputGroupAddon align="inline-end" className={cn(endContentClass)}>
                            {endContent}
                        </InputGroupAddon>
                    )}
                </InputGroup>

                {helperText && (
                    <FieldDescription className={cn(inputTextStyles.helper.base, helperStyle)}>
                        {helperText}
                    </FieldDescription>
                )}
            </Field>
        );
    }
);

InputText.displayName = "InputText";
