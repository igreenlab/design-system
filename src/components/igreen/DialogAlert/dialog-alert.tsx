"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import type { DialogAlertProps } from "./dialog-alert.types";
import { dialogAlertStyles } from "./dialog-alert.styles";
import { Icon } from "@/components/igreen/Icon";
import type { IconName } from "@/components/igreen/Icon/icon.types";

const variantIcons: Record<string, IconName> = {
    default: "fill-success",
    warning: "fill-alert",
    critical: "fill-alert", // Using fill-alert for critical as well, distinguished by color variants
};

export function DialogAlert({
    title,
    description,
    variant = "critical",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm,
    onCancel,
    loading,
    children,
    icon,
    className,
    open,
    onOpenChange,
    ...props
}: DialogAlertProps) {
    const iconName = variantIcons[variant] || "fill-alert";

    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...props}>
            <DialogContent
                className={cn(dialogAlertStyles.content.base, className)}
                showCloseButton={false}
            >
                <DialogClose className={dialogAlertStyles.closeButton}>
                    <Icon name="line-close" size="lg" className={dialogAlertStyles.closeIcon} />
                    <span className="sr-only">Close</span>
                </DialogClose>

                {/* Icon */}
                <div className={cn(
                    dialogAlertStyles.iconWrapper.base,
                    dialogAlertStyles.iconWrapper.variants[variant]
                )}>
                    {icon ? (
                        <Icon name={icon} size="lg" className={dialogAlertStyles.icon.inner} />
                    ) : (
                        <Icon name={iconName} size="lg" className={dialogAlertStyles.icon.inner} />
                    )}
                </div>

                {/* Content */}
                <div className={dialogAlertStyles.body.container}>
                    <div className={dialogAlertStyles.body.textWrapper}>
                        <DialogTitle className={dialogAlertStyles.text.title}>
                            {title}
                        </DialogTitle>
                        <DialogDescription className={dialogAlertStyles.text.description}>
                            {description}
                        </DialogDescription>
                    </div>
                    {children}
                </div>

                {/* Actions */}
                <div className={dialogAlertStyles.actions.base}>
                    {onCancel && (
                        <Button
                            variant="soft"
                            color="secondary"
                            onClick={onCancel}
                            className={dialogAlertStyles.button.base}
                            disabled={loading}
                        >
                            {cancelLabel}
                        </Button>
                    )}
                    {onConfirm && (
                        <Button
                            variant="default"
                            color={variant === 'default' ? 'primary' : variant}
                            onClick={onConfirm}
                            className={dialogAlertStyles.button.base}
                            loading={loading}
                        >
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

DialogAlert.displayName = "DialogAlert";
