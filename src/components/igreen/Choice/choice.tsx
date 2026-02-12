import React from "react";
import type { ChoiceGroupProps, ChoiceItemProps } from "./choice.types";
import { choiceStyles } from "./choice.styles";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/igreen/Icon";

export const ChoiceGroup: React.FC<ChoiceGroupProps> = ({ children, className }) => {
    return (
        <div className={cn(choiceStyles.group.container, className)}>
            {children}
        </div>
    );
};

export const ChoiceItem: React.FC<ChoiceItemProps> = ({
    title,
    description,
    icon,
    active = false,
    onClick,
    className
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                choiceStyles.item.base,
                active ? choiceStyles.item.variants.active : choiceStyles.item.variants.inactive,
                className
            )}
        >
            {/* Icon Wrapper */}
            <div className={cn(
                choiceStyles.item.iconWrapper.base,
                active ? choiceStyles.item.iconWrapper.active : choiceStyles.item.iconWrapper.inactive
            )}>
                <div className={choiceStyles.item.iconWrapper.inner}>
                    {icon}
                </div>
            </div>

            {/* Content */}
            <div className={choiceStyles.item.content.container}>
                <span className={choiceStyles.item.content.title}>
                    {title}
                </span>
                <span className={choiceStyles.item.content.description}>
                    {description}
                </span>
            </div>

            {/* Selected Indicator */}
            <div className={cn(
                choiceStyles.item.selectionIndicator.base,
                active ? choiceStyles.item.selectionIndicator.active : choiceStyles.item.selectionIndicator.inactive
            )}>
                {active ? (
                    <Icon name="line-outline" size="18px" />
                ) : (
                    <Icon name="line-outline" size="18px" />
                )}
            </div>
        </button>
    );
};
