import type { ReactNode, HTMLAttributes } from "react";

/**
 * Status visuais do FileDropZone
 */
export type FileDropZoneStatus =
    | "idle"      // Estado inicial/default
    | "dragging"  // Arrastando arquivo (auto-gerenciado)
    | "loading"   // Processando arquivo
    | "success"   // Sucesso
    | "error"     // Erro genérico
    | "warning";  // Requer ação (ex: senha)

/**
 * Props do componente FileDropZone
 */
export interface FileDropZoneProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    // ===== ESSENCIAIS =====
    /** Título principal */
    title: string;
    /** Descrição/texto secundário */
    description?: string;

    // ===== ARQUIVO =====
    /** Tipos de arquivo aceitos (ex: ".pdf,.jpg" ou "image/*") */
    accept?: string;
    /** Callback quando arquivo é selecionado (drop ou input) */
    onFile?: (file: File) => void;

    // ===== VALIDAÇÃO PDF =====
    /** Ativa validação automática de PDF com detecção de senha */
    validatePdf?: boolean;
    /** Callback quando PDF é validado com sucesso */
    onValidated?: (file: File, password?: string) => void;

    // ===== APARÊNCIA =====
    /** Ícone customizado (apenas em idle) */
    icon?: ReactNode;
    /** 
     * Altura do componente.
     * - undefined: 226px (default)
     * - "auto": fluida
     * - number: pixels
     */
    height?: "auto" | number;
    /** Status visual (para controle manual externo) */
    status?: FileDropZoneStatus;

    // ===== AÇÕES =====
    /** Se fornecido, mostra botão de câmera */
    onCameraClick?: () => void;
    /** Callback do botão retry */
    onRetry?: () => void;
    /** Label do botão retry */
    retryLabel?: string;

    // ===== CUSTOMIZAÇÃO =====
    /** Conteúdo customizado (sobrescreve ações default) */
    children?: ReactNode;
}

/**
 * Ref handle para controle imperativo do FileDropZone
 */
export interface FileDropZoneRef {
    /** Arquivo atualmente selecionado */
    getFile: () => File | null;

    /** Limpa arquivo e reseta para idle */
    clear: () => void;

    /**
     * Controle imperativo do status, título e descrição.
     * Use para fluxos assíncronos após validação (ex: extração com IA).
     * 
     * @example
     * ref.current?.setStatus("loading", "Extraindo dados...", "Aguarde");
     * ref.current?.setStatus("success", "Pronto!", "Dados extraídos");
     * ref.current?.setStatus("error", "Erro", "Falha ao processar");
     */
    setStatus: (
        status: FileDropZoneStatus,
        title?: string,
        description?: string
    ) => void;
}

/**
 * Props do sub-componente Actions
 */
export interface FileDropZoneActionsProps {
    children: ReactNode;
    className?: string;
}

/**
 * Props do sub-componente IconBox
 */
export interface IconBoxProps {
    status: FileDropZoneStatus;
    icon: ReactNode;
    animate?: boolean;
    className?: string;
}
