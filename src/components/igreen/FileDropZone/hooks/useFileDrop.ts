"use client";

import { useState, useRef, type DragEvent, useCallback } from "react";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export interface UseFileDropOptions {
    /** Tipos de arquivo aceitos */
    accept?: string;
    /** Limite de tamanho em bytes (default: 8MB) */
    maxFileSize?: number;
    /** Callback quando arquivo é selecionado (drop ou input) */
    onFile?: (file: File) => void;
    /** Callback quando arquivo é rejeitado por tamanho */
    onFileTooLarge?: (file: File, maxSize: number) => void;
    /** Callback de drag enter */
    onDragEnter?: (e: DragEvent<HTMLDivElement>) => void;
    /** Callback de drag leave */
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
}

export interface UseFileDropReturn {
    /** Se está arrastando arquivo sobre a área */
    isDragging: boolean;
    /** Arquivo atualmente selecionado */
    file: File | null;
    /** Ref do input hidden */
    inputRef: React.RefObject<HTMLInputElement | null>;
    /** Abre o file picker */
    openFilePicker: () => void;
    /** Limpa o arquivo selecionado */
    clearFile: () => void;
    /** Handlers para o container */
    handlers: {
        onDragOver: (e: DragEvent<HTMLDivElement>) => void;
        onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
        onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
        onDrop: (e: DragEvent<HTMLDivElement>) => void;
    };
    /** Handler para o input */
    inputProps: {
        ref: React.RefObject<HTMLInputElement | null>;
        type: "file";
        accept?: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        className: string;
    };
}

/**
 * Hook para gerenciar drag-and-drop de arquivos
 */
export function useFileDrop(options: UseFileDropOptions = {}): UseFileDropReturn {
    const { accept, maxFileSize = MAX_FILE_SIZE, onFile, onFileTooLarge, onDragEnter, onDragLeave } = options;

    const inputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef(0);

    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFile = useCallback((newFile: File) => {
        if (newFile.size > maxFileSize) {
            onFileTooLarge?.(newFile, maxFileSize);
            return;
        }
        setFile(newFile);
        onFile?.(newFile);
    }, [onFile, maxFileSize, onFileTooLarge]);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;

        if (e.dataTransfer.types.includes("Files")) {
            setIsDragging(true);
        }

        onDragEnter?.(e);
    }, [onDragEnter]);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;

        if (dragCounter.current === 0) {
            setIsDragging(false);
        }

        onDragLeave?.(e);
    }, [onDragLeave]);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        dragCounter.current = 0;
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const openFilePicker = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const clearFile = useCallback(() => {
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, []);

    return {
        isDragging,
        file,
        inputRef,
        openFilePicker,
        clearFile,
        handlers: {
            onDragOver: handleDragOver,
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop,
        },
        inputProps: {
            ref: inputRef,
            type: "file",
            accept,
            onChange: handleInputChange,
            className: "hidden",
        },
    };
}
