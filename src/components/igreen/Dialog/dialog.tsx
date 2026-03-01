"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { Icon } from "@/components/igreen/Icon";

import type { DialogProps } from "./dialog.types";
import { dialogStyles } from "./dialog.styles";

/**
 * Botão de fechar customizado reutilizável.
 */
interface CloseButtonProps {
    onClick?: () => void;
}

const CustomCloseButton = ({ onClick }: CloseButtonProps) => {
    const icon = <Icon name="line-close" size="lg" />;

    // Se houver onClick, usamos um button normal para interceptar e executar a lógica antes de fechar (ou não)
    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={dialogStyles.closeButton.base}
                data-igreen-close="true"
                aria-label="Close"
            >
                {icon}
            </button>
        );
    }

    // Caso contrário, usamos o DialogPrimitive.Close padrão do Radix
    return (
        <DialogPrimitive.Close
            className={dialogStyles.closeButton.base}
            data-igreen-close="true"
        >
            {icon}
            <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
    );
};

// Extracted Action Buttons for cleaner render
interface ActionButtonsProps {
    onCancel?: boolean | (() => void);
    cancelText?: string;
    onConfirm?: boolean | (() => void);
    confirmText?: string;
    loading?: boolean;
}

const DialogActionButtons: React.FC<ActionButtonsProps> = ({
    onCancel,
    cancelText = "Cancelar",
    onConfirm,
    confirmText = "Confirmar",
    loading
}) => {
    return (
        <>
            {/* Cancel Button */}
            {onCancel && (
                typeof onCancel === 'boolean' ? (
                    <DialogPrimitive.Close asChild>
                        <Button
                            variant="default"
                            color="secondary"
                            className={dialogStyles.actionButton}
                            disabled={loading}
                        >
                            {cancelText}
                        </Button>
                    </DialogPrimitive.Close>
                ) : (
                    <Button
                        variant="default"
                        color="secondary"
                        className={dialogStyles.actionButton}
                        disabled={loading}
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>
                )
            )}

            {/* Confirm Button */}
            {onConfirm && (
                <Button
                    variant="default"
                    className={dialogStyles.actionButton}
                    disabled={loading}
                    onClick={typeof onConfirm === 'function' ? onConfirm : undefined}
                >
                    {loading ? "Carregando..." : confirmText}
                </Button>
            )}
        </>
    );
};

/**
 * Componente Dialog personalizado do iGreen.
 * Wrapper sobre o Dialog do Shadcn/Radix com estilos e comportamentos específicos.
 */
export const DialogComponent: React.FC<DialogProps> = ({
    title,
    description,
    icon,
    children,
    onCloseButton = true,
    onCancel,
    cancelText = "Cancelar",
    onConfirm,
    confirmText = "Confirmar",
    loading = false,
    className,
    width,
    fullHeight = false,
    ...props
}) => {
    const handleCloseButton = typeof onCloseButton === "function" ? onCloseButton : undefined;

    return (
        <Dialog {...props}>
            <DialogContent
                className={cn(
                    dialogStyles.content.base,
                    fullHeight && dialogStyles.content.fullHeight,
                    dialogStyles.hideDefaultClose,
                    className
                )}
                style={width ? { maxWidth: width } : undefined}
            >
                {/* Close Button Logic */}
                {onCloseButton !== false && (
                    <CustomCloseButton onClick={handleCloseButton} />
                )}

                <DialogHeader className={dialogStyles.header.container}>
                    {icon && (
                        <div className={dialogStyles.icon.wrapper}>
                            <div className={dialogStyles.icon.inner}>
                                <Icon name={icon} size="24px" />
                            </div>
                        </div>
                    )}

                    <div className={dialogStyles.header.textContainer}>
                        {title && (
                            <DialogTitle className={dialogStyles.header.title}>
                                {title}
                            </DialogTitle>
                        )}
                        {description && (
                            <DialogDescription className={dialogStyles.header.description}>
                                {description}
                            </DialogDescription>
                        )}
                    </div>
                </DialogHeader>

                <div className={dialogStyles.contentWrapper}>
                    {children}
                </div>

                {(onCancel || onConfirm) && (
                    <DialogFooter className={dialogStyles.footer.base}>
                        <DialogActionButtons
                            onCancel={onCancel}
                            cancelText={cancelText}
                            onConfirm={onConfirm}
                            confirmText={confirmText}
                            loading={loading}
                        />
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};
