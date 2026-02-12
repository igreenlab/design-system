"use client";

import React from "react";
import type { ToggleCardProps } from "./ToggleCard.types";
import { toggleCardStyles } from "./ToggleCard.styles";
import { cn } from "@/lib/utils";

/**
 * ToggleCard - Card com alternância Sim/Não e expansão de conteúdo
 * 
 * @example
 * <ToggleCard 
 *   title="Possui placas solares?" 
 *   description="Texto auxiliar"
 *   checked={hasSolar}
 *   onCheckedChange={setHasSolar}
 * >
 *   <InputText placeholder="Potência..." />
 * </ToggleCard>
 */
export const ToggleCard: React.FC<ToggleCardProps> = ({
    title,
    description,
    icon,
    checked = false,
    onCheckedChange,
    fullLabel = "Sim",
    offLabel = "Não",
    children,
    className,
    disabled = false,
    ...props
}) => {
    // Handlers
    const handleSetTrue = () => !disabled && onCheckedChange?.(true);
    const handleSetFalse = () => !disabled && onCheckedChange?.(false);

    // Helper para renderizar os botões de toggle (Sim/Não) para evitar duplicação
    const renderToggleButton = (isTrueButton: boolean, label: string) => {
        const isActive = checked === isTrueButton;
        const colorClass = isTrueButton
            ? toggleCardStyles.toggle.button.activeMatches.true
            : toggleCardStyles.toggle.button.activeMatches.false;

        return (
            <button
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={isTrueButton ? handleSetTrue : handleSetFalse}
                disabled={disabled}
                className={cn(
                    toggleCardStyles.toggle.button.base,
                    isActive ? colorClass : toggleCardStyles.toggle.button.inactive
                )}
            >
                {label}
            </button>
        );
    };

    return (
        <div
            className={cn(
                toggleCardStyles.container.base,
                checked ? toggleCardStyles.container.checked : toggleCardStyles.container.unchecked,
                disabled && toggleCardStyles.disabled,
                className
            )}
            {...props}
        >
            {/* Header: Icon + Content + Toggle */}
            <div className={toggleCardStyles.header.container}>
                {/* Ícone */}
                {icon && (
                    <div className={toggleCardStyles.icon.container}>
                        <div className={toggleCardStyles.icon.inner}>
                            {icon}
                        </div>
                    </div>
                )}

                {/* Textos */}
                <div className={toggleCardStyles.content.container}>
                    <span className={toggleCardStyles.content.title}>
                        {title}
                    </span>
                    {description && (
                        <span className={toggleCardStyles.content.description}>
                            {description}
                        </span>
                    )}
                </div>

                {/* Toggle Switch (Sim/Não) */}
                <div
                    className={toggleCardStyles.toggle.container}
                    role="radiogroup"
                    aria-label={typeof title === 'string' ? title : "Toggle selection"}
                >
                    {renderToggleButton(true, fullLabel)}
                    {renderToggleButton(false, offLabel)}
                </div>
            </div>

            {/* Expansão de Conteúdo (Só aparece se checked=true E tiver children) */}
            {children && (
                <div className={cn(
                    toggleCardStyles.expansion.wrapper,
                    checked ? toggleCardStyles.expansion.visible : toggleCardStyles.expansion.hidden
                )}>
                    <div className={toggleCardStyles.expansion.inner}>
                        <div className={toggleCardStyles.expansion.content}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ToggleCard.displayName = "ToggleCard";
