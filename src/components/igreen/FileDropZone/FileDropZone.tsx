"use client";

import { forwardRef, useImperativeHandle } from "react";
import type { FileDropZoneProps, FileDropZoneRef } from "./FileDropZone.types";
import {
    getContainerClasses,
    getTitleClasses,
    getDescriptionClasses,
    fileDropZoneStyles
} from "./FileDropZone.styles";
import { useFileDropZone } from "./hooks/useFileDropZone";
import { IconBox } from "./components/IconBox";
import { Actions } from "./components/Actions";
import { DefaultActions } from "./components/DefaultActions";
import { cn } from "@/lib/utils";

/**
 * FileDropZone - Componente de upload com drag-and-drop
 * 
 * Esta é uma VIEW PURA (componente "burro").
 * Toda a lógica está encapsulada no hook useFileDropZone.
 */
const FileDropZoneRoot = forwardRef<FileDropZoneRef, FileDropZoneProps>(({
    // Essenciais
    title,
    description,
    // Arquivo
    accept,
    onFile,
    // PDF
    validatePdf = false,
    onValidated,
    // Aparência
    icon,
    height,
    status: externalStatus = "idle",
    // Ações
    onCameraClick,
    onRetry,
    retryLabel,
    // Customização
    children,
    className,
    style,
    ...props
}, ref) => {
    // Hook combinado com toda a lógica
    const dropZone = useFileDropZone({
        accept,
        onFile,
        validatePdf,
        onValidated,
        icon,
        externalStatus,
        externalTitle: title,
        externalDescription: description,
        onRetry,
    });

    // Expor ref com controle imperativo
    useImperativeHandle(ref, () => ({
        getFile: () => dropZone.file,
        clear: dropZone.clear,
        setStatus: dropZone.setStatus,
    }));

    // Altura via style
    const heightStyle = height === "auto"
        ? undefined
        : height
            ? `${height}px`
            : "226px";

    return (
        <div
            className={cn(getContainerClasses(dropZone.visualStatus), className)}
            style={{ minHeight: heightStyle, ...style }}
            {...dropZone.containerHandlers}
            {...props}
        >
            {/* Input hidden */}
            <input {...dropZone.inputProps} />

            {/* Ícone */}
            <IconBox
                status={dropZone.visualStatus}
                icon={dropZone.icon}
                animate={dropZone.status === "loading"}
            />

            {/* Conteúdo */}
            <div className={fileDropZoneStyles.content.container}>
                <span className={getTitleClasses(dropZone.visualStatus)}>
                    {dropZone.title}
                </span>
                {dropZone.description && (
                    <span className={getDescriptionClasses(dropZone.visualStatus)}>
                        {dropZone.description}
                    </span>
                )}
            </div>

            {/* Ações (animadas via Grid rows 0fr -> 1fr) */}
            <div className={cn(
                fileDropZoneStyles.actions.wrapper,
                dropZone.showActions
                    ? fileDropZoneStyles.actions.visible
                    : fileDropZoneStyles.actions.hidden
            )}>
                <div className={fileDropZoneStyles.actions.inner}>
                    {children || (
                        <DefaultActions
                            mode={dropZone.actionsMode}
                            passwordError={dropZone.passwordError}
                            passwordInputRef={dropZone.passwordInputRef}
                            onSelectFile={dropZone.openFilePicker}
                            onCameraClick={onCameraClick}
                            onRetry={dropZone.retry}
                            onPasswordSubmit={dropZone.submitPassword}
                            labels={{ retry: retryLabel }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});

FileDropZoneRoot.displayName = "FileDropZone";

// ===== COMPOUND COMPONENT =====
type FileDropZoneComponent = typeof FileDropZoneRoot & {
    Actions: typeof Actions;
    IconBox: typeof IconBox;
};

export const FileDropZone = FileDropZoneRoot as FileDropZoneComponent;
FileDropZone.Actions = Actions;
FileDropZone.IconBox = IconBox;
