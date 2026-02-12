/**
 * Configuração centralizada do FileDropZone
 * 
 * Contém ícones, textos e labels para facilitar customização e tradução.
 */

import React from "react";
import {
    File,
    Camera,
    RefreshCw,
    ArrowRight
} from "lucide-react";
import { Icon } from "@/components/igreen/Icon";
import type { FileDropZoneStatus } from "./FileDropZone.types";

// ===== ÍCONES POR STATUS =====
export const statusIcons: Record<FileDropZoneStatus, React.ReactNode> = {
    idle: <Icon name="fill-upload-file" className="size-full" />,
    dragging: <Icon name="fill-upload-file" className="size-full" />,
    loading: <Icon name="line-loading" className="size-full" />,
    success: <Icon name="fill-success" className="size-full" />,
    error: <Icon name="fill-alert" className="size-full" />,
    warning: <Icon name="fill-lock" className="size-full" />,
};

// ===== ÍCONES DE BOTÕES =====
export const buttonIcons = {
    file: <File className="size-[18px]" />,
    camera: <Camera className="size-[18px]" />,
    retry: <RefreshCw className="size-[18px]" />,
    submit: <ArrowRight className="size-[18px]" />,
};

// ===== TEXTOS DE VALIDAÇÃO PDF =====
export const pdfMessages = {
    loading: {
        title: "Validando PDF...",
        description: "Aguarde enquanto verificamos o arquivo",
    },
    error: {
        title: "Erro ao processar PDF",
    },
    passwordRequired: {
        title: "PDF protegido por senha",
        description: "Digite a senha para continuar",
    },
    passwordWrong: {
        title: "Senha incorreta",
        description: "Tente novamente",
    },
};

// ===== LABELS DE BOTÕES =====
export const buttonLabels = {
    selectFile: "Selecionar Arquivo",
    useCamera: "Usar Câmera",
    retry: "Tentar novamente",
};

// ===== PLACEHOLDERS =====
export const placeholders = {
    password: "Senha do PDF",
};
