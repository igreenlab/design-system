import type { ReactNode, HTMLAttributes } from "react";

/**
 * Props do componente ToggleCard
 */
export interface ToggleCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
    /** Título principal */
    title: ReactNode;
    /** Descrição opcional */
    description?: ReactNode;
    /** Ícone ilustrativo */
    icon?: ReactNode;

    // ===== ESTADO =====
    /** Se está marcado (Sim/Ativo) */
    checked?: boolean;
    /** Callback de mudança (true = Sim, false = Não) */
    onCheckedChange?: (checked: boolean) => void;

    // ===== LABELS =====
    /** Label para opção True (default: "Sim") */
    fullLabel?: string;
    /** Label para opção False (default: "Não") */
    offLabel?: string;

    // ===== CONTEÚDO EXPANSÍVEL =====
    /** Conteúdo que aparece quando checked=true */
    children?: ReactNode;

    /** Desabilitado */
    disabled?: boolean;
}
