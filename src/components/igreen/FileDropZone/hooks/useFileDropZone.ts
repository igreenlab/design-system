"use client";

import { useCallback, useMemo, useState } from "react";
import { useFileDrop } from "./useFileDrop";
import { usePdfValidation, type PdfValidationMessages } from "./usePdfValidation";
import type { FileDropZoneStatus } from "../FileDropZone.types";
import { statusIcons } from "../FileDropZone.config";
import type { DragEvent, ReactNode } from "react";

export interface UseFileDropZoneOptions {
    // Arquivo
    accept?: string;
    onFile?: (file: File) => void;

    // PDF
    validatePdf?: boolean;
    onValidated?: (file: File, password?: string) => void;
    pdfMessages?: PdfValidationMessages;

    // Aparência
    icon?: ReactNode;
    externalStatus?: FileDropZoneStatus;
    externalTitle?: string;
    externalDescription?: string;

    // Ações
    onRetry?: () => void;

    // Callbacks de drag
    onDragEnter?: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
}

export interface UseFileDropZoneReturn {
    // Estados
    status: FileDropZoneStatus;
    visualStatus: FileDropZoneStatus;
    isDragging: boolean;
    file: File | null;

    // Conteúdo
    title: string | undefined;
    description: string | undefined;
    icon: ReactNode;
    showActions: boolean;

    // Modo de ações
    actionsMode: "idle" | "error" | "password" | "success";
    passwordError: boolean;

    // Métodos
    openFilePicker: () => void;
    clear: () => void;
    retry: () => void;
    submitPassword: () => void;
    setStatus: (status: FileDropZoneStatus, title?: string, description?: string) => void;

    // Props para elementos
    containerHandlers: {
        onDragOver: (e: DragEvent<HTMLDivElement>) => void;
        onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
        onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
        onDrop: (e: DragEvent<HTMLDivElement>) => void;
    };
    inputProps: {
        ref: React.RefObject<HTMLInputElement | null>;
        type: "file";
        accept?: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        className: string;
    };
    passwordInputRef: React.RefObject<HTMLInputElement | null>;
}

/**
 * Hook combinado para FileDropZone
 * 
 * Encapsula toda a lógica de estado e comportamento,
 * deixando a view completamente "burra".
 */
export function useFileDropZone(options: UseFileDropZoneOptions): UseFileDropZoneReturn {
    const {
        accept,
        onFile,
        validatePdf = false,
        onValidated,
        pdfMessages,
        icon: customIcon,
        externalStatus = "idle",
        externalTitle,
        externalDescription,
        onRetry,
        onDragEnter,
        onDragLeave,
    } = options;

    // Estado imperativo (controlado via setStatus)
    const [imperativeState, setImperativeState] = useState<{
        status: FileDropZoneStatus | null;
        title: string | null;
        description: string | null;
    }>({ status: null, title: null, description: null });

    // Hook de validação PDF
    const pdfValidation = usePdfValidation({
        onValidated,
        messages: pdfMessages,
    });

    // Handler de arquivo com lógica de PDF
    const handleFile = useCallback((file: File) => {
        // Limpa estado imperativo quando novo arquivo é selecionado
        setImperativeState({ status: null, title: null, description: null });

        const isPdf = file.type.includes("pdf") || file.name.toLowerCase().endsWith(".pdf");

        if (validatePdf && isPdf) {
            pdfValidation.validate(file);
        } else {
            onFile?.(file);
        }
    }, [validatePdf, pdfValidation, onFile]);

    // Hook de drag-and-drop
    const fileDrop = useFileDrop({
        accept,
        onFile: handleFile,
        onDragEnter,
        onDragLeave,
    });

    // ===== COMPUTED STATUS =====
    const isValidating = pdfValidation.status !== "idle";

    const status = useMemo((): FileDropZoneStatus => {
        // Estado imperativo tem prioridade
        if (imperativeState.status) return imperativeState.status;

        if (fileDrop.isDragging) return "dragging";
        if (isValidating) {
            if (pdfValidation.status === "loading") return "loading";
            if (pdfValidation.status === "error") return "error";
            if (pdfValidation.status === "password") return "warning";
        }
        return externalStatus;
    }, [imperativeState.status, fileDrop.isDragging, isValidating, pdfValidation.status, externalStatus]);

    const visualStatus = pdfValidation.passwordError ? "error" : status;

    // ===== COMPUTED CONTENT =====
    const title = imperativeState.title ?? pdfValidation.title ?? externalTitle;
    const description = imperativeState.description ?? pdfValidation.description ?? externalDescription;
    const icon = status === "idle" && customIcon ? customIcon : statusIcons[visualStatus];
    const showActions = status !== "loading" && status !== "dragging" && status !== "success";

    // ===== COMPUTED ACTIONS MODE =====
    const actionsMode = useMemo(() => {
        if (status === "success") return "success";
        if (pdfValidation.status === "error") return "error";
        if (pdfValidation.status === "password") return "password";
        if (status === "error") return "error";
        return "idle";
    }, [pdfValidation.status, status]) as "idle" | "error" | "password" | "success";

    // ===== MÉTODOS =====
    const clear = useCallback(() => {
        fileDrop.clearFile();
        pdfValidation.reset();
        setImperativeState({ status: null, title: null, description: null });
    }, [fileDrop, pdfValidation]);

    const retry = useCallback(() => {
        pdfValidation.reset();
        setImperativeState({ status: null, title: null, description: null });
        onRetry?.();
    }, [pdfValidation, onRetry]);

    const submitPassword = useCallback(() => {
        const password = pdfValidation.passwordInputRef.current?.value || "";
        pdfValidation.submitPassword(password);
    }, [pdfValidation]);

    const setStatus = useCallback((
        newStatus: FileDropZoneStatus,
        newTitle?: string,
        newDescription?: string
    ) => {
        setImperativeState({
            status: newStatus,
            title: newTitle ?? null,
            description: newDescription ?? null,
        });
    }, []);

    return {
        // Estados
        status,
        visualStatus,
        isDragging: fileDrop.isDragging,
        file: fileDrop.file,

        // Conteúdo
        title,
        description,
        icon,
        showActions,

        // Modo de ações
        actionsMode,
        passwordError: pdfValidation.passwordError,

        // Métodos
        openFilePicker: fileDrop.openFilePicker,
        clear,
        retry,
        submitPassword,
        setStatus,

        // Props para elementos
        containerHandlers: fileDrop.handlers,
        inputProps: fileDrop.inputProps,
        passwordInputRef: pdfValidation.passwordInputRef,
    };
}
