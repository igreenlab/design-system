"use client";

import React from "react";
import { XCircle } from "lucide-react";
import type { ProgressCardProps, ProgressCardStatus } from "./component.types";
import { progressCardStyles, animationStyles } from "./component.styles";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/shadcn/alert";
import { Icon } from "@/components/igreen/Icon";

const STATUS_CONFIG: Record<ProgressCardStatus, {
    label: string;
    iconVariant: keyof typeof progressCardStyles.icon.variants;
    statusIcon: {
        name: React.ComponentProps<typeof Icon>["name"];
        style: string;
        spin?: boolean;
    };
    showProgressBar?: boolean;
    isError?: boolean;
    isCompleted?: boolean;
}> = {
    loading: {
        label: "Carregando...",
        iconVariant: "loading",
        statusIcon: { name: "line-status", style: progressCardStyles.content.statusIcon.loading, spin: true },
        showProgressBar: true
    },
    extracting: {
        label: "Extraindo informações...",
        iconVariant: "extracting",
        statusIcon: { name: "line-status", style: progressCardStyles.content.statusIcon.loading, spin: true },
        showProgressBar: true
    },
    analyzing: {
        label: "Analisando dados...",
        iconVariant: "analyzing",
        statusIcon: { name: "line-status", style: progressCardStyles.content.statusIcon.loading, spin: true },
        showProgressBar: true
    },
    concluding: {
        label: "Concluindo...",
        iconVariant: "concluding",
        statusIcon: { name: "line-status", style: progressCardStyles.content.statusIcon.loading, spin: true },
        showProgressBar: true
    },
    completed: {
        label: "Concluído",
        iconVariant: "completed",
        statusIcon: { name: "fill-check-circle", style: progressCardStyles.content.statusIcon.success },
        isCompleted: true
    },
    error: {
        label: "Erro no processamento",
        iconVariant: "error",
        statusIcon: { name: "fill-alert", style: progressCardStyles.content.statusIcon.error },
        isError: true
    },
};

import DocPdfIcon from "@/img/doc-pdf.svg";
import ImageThumbIcon from "@/img/image-thumb.svg";

// ... previous code ...

export const ProgressCard: React.FC<ProgressCardProps> = ({
    title,
    status = "loading",
    progress,
    statusMessage,
    onClose,
    className,
    children,
    type = "default",
    mainIcon,
    onClickIcon,
    ...props
}) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.loading;

    const renderMainIcon = () => {
        if (mainIcon) {
            return mainIcon;
        }

        if (type === "pdf") {
            return <img src={DocPdfIcon} alt="PDF" className={progressCardStyles.icon.main} />;
        }

        if (type === "image") {
            return <img src={ImageThumbIcon} alt="Image" className={progressCardStyles.icon.main} />;
        }

        return <Icon name="fill-file" className={progressCardStyles.icon.main} />;
    };

    return (
        <div
            className={cn(
                progressCardStyles.container.base,
                className
            )}
            {...props}
        >
            <style>{animationStyles}</style>
            <div className={progressCardStyles.header.wrapper}>
                <div className={progressCardStyles.header.leftContent}>
                    {/* Big Icon Box */}
                    <div
                        onClick={onClickIcon}
                        className={cn(
                            progressCardStyles.icon.wrapper,
                            progressCardStyles.icon.variants[config.iconVariant],
                            onClickIcon && progressCardStyles.icon.clickable
                        )}
                    >
                        {renderMainIcon()}
                    </div>

                    {/* Text Content */}
                    <div className={progressCardStyles.content.wrapper}>
                        <span className={progressCardStyles.content.title} title={title}>
                            {title}
                        </span>

                        <div className={progressCardStyles.content.statusRow}>
                            {/* Status Icon */}
                            <Icon
                                name={config.statusIcon.name}
                                size="sm"
                                className={cn(
                                    config.statusIcon.style,
                                    config.statusIcon.spin && progressCardStyles.content.statusIcon.spin
                                )}
                            />

                            {/* Status Text */}
                            <span className={cn(
                                progressCardStyles.content.statusText,
                                config.isError && progressCardStyles.content.statusTextError
                            )}>
                                {statusMessage || config.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Close/Delete Action */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className={progressCardStyles.action.button}
                        type="button"
                    >
                        <Icon
                            name={config.isCompleted ? "line-bin" : "line-remove"}
                            className={progressCardStyles.action.icon}
                        />
                    </button>
                )}
            </div>

            {/* Progress Bar Section */}
            {config.showProgressBar && (
                <div className={progressCardStyles.progressBar.container}>
                    <div className={progressCardStyles.progressBar.wrapper}>
                        <div className={progressCardStyles.progressBar.indicator.indeterminate} />
                    </div>
                </div>
            )}

            {/* Error Alert */}
            {config.isError && (
                <div className={progressCardStyles.alert.container}>
                    <Alert variant="critical">
                        <div data-slot="icon-wrapper" className={progressCardStyles.alert.iconWrapper}>
                            <XCircle className={progressCardStyles.alert.icon} />
                        </div>
                        <AlertDescription>
                            {statusMessage || config.label}
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            {children && (
                <div className={progressCardStyles.childrenContainer}>
                    {children}
                </div>
            )}
        </div>
    );
};

ProgressCard.displayName = "ProgressCard";
