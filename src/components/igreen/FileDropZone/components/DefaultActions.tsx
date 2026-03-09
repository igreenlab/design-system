"use client";

import React from "react";
import { Button } from "@/components/shadcn/button";
import { InputText } from "@/components/igreen/InputText";
import { Actions } from "./Actions";
import { fileDropZoneStyles } from "../FileDropZone.styles";
import { buttonLabels, buttonIcons, placeholders } from "../FileDropZone.config";

export type DefaultActionsMode = "idle" | "error" | "password" | "success";

export interface DefaultActionsProps {
    /** Modo atual */
    mode: DefaultActionsMode;
    /** Se a senha está errada */
    passwordError?: boolean;
    /** Ref do input de senha */
    passwordInputRef?: React.RefObject<HTMLInputElement | null>;
    /** Callback para selecionar arquivo */
    onSelectFile?: () => void;
    /** Callback para abrir câmera */
    onCameraClick?: () => void;
    /** Callback para retry */
    onRetry?: () => void;
    /** Callback para submeter senha */
    onPasswordSubmit?: () => void;
    /** Labels customizados */
    labels?: {
        selectFile?: string;
        useCamera?: string;
        retry?: string;
        passwordPlaceholder?: string;
    };
}

/**
 * DefaultActions - Ações padrão baseadas no modo
 * 
 * Componente puramente presentacional (view burra).
 * Recebe todas as configurações via props.
 */
export function DefaultActions({
    mode,
    passwordError = false,
    passwordInputRef,
    onSelectFile,
    onCameraClick,
    onRetry,
    onPasswordSubmit,
    labels = {},
}: DefaultActionsProps) {
    // Merge labels com defaults
    const l = {
        selectFile: labels.selectFile ?? buttonLabels.selectFile,
        useCamera: labels.useCamera ?? buttonLabels.useCamera,
        retry: labels.retry ?? buttonLabels.retry,
        passwordPlaceholder: labels.passwordPlaceholder ?? placeholders.password,
    };

    // Modo erro: botão de retry
    if (mode === "error") {
        return (
            <Actions>
                <div className={fileDropZoneStyles.actions.defaultButtonWrapper}>
                    <Button
                        variant="default"
                        color="critical"
                        size="md"
                        onClick={onRetry}
                    >
                        {buttonIcons.retry}
                        {l.retry}
                    </Button>
                </div>
            </Actions>
        );
    }

    // Modo senha: input + botão
    if (mode === "password") {
        const inputStatus = passwordError ? "error" : "warning";
        const buttonColor = passwordError ? "critical" : "warning";

        return (
            <Actions>
                <InputText
                    ref={passwordInputRef}
                    placeholder={l.passwordPlaceholder}
                    type="password"
                    status={inputStatus}
                    size="md"
                    className={fileDropZoneStyles.actions.passwordInput}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onPasswordSubmit?.()
                    }}
                />
                <Button
                    variant="default"
                    color={buttonColor}
                    size="md"
                    onlyIcon
                    onClick={onPasswordSubmit}
                >
                    {buttonIcons.submit}
                </Button>
            </Actions>
        );
    }

    // Modo idle com câmera: 2 botões
    if (onCameraClick) {
        return (
            <Actions>
                <div className={fileDropZoneStyles.actions.defaultButtonWrapper}>
                    <Button
                        color="secondary"
                        size="md"
                        onClick={onSelectFile}
                    >
                        {buttonIcons.file}
                        {l.selectFile}
                    </Button>
                </div>
                <div className={fileDropZoneStyles.actions.defaultButtonWrapper}>
                    <Button
                        variant="soft"
                        color="primary"
                        size="md"
                        onClick={onCameraClick}
                    >
                        {buttonIcons.camera}
                        {l.useCamera}
                    </Button>
                </div>
            </Actions>
        );
    }

    // Modo idle: 1 botão
    return (
        <Actions>
            <div className={fileDropZoneStyles.actions.defaultButtonWrapper}>
                <Button
                    variant="soft"
                    color="primary"
                    size="md"
                    onClick={onSelectFile}
                >
                    {buttonIcons.file}
                    {l.selectFile}
                </Button>
            </div>
        </Actions>
    );
}
