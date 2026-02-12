import type { HTMLAttributes } from "react";

export type ProgressCardStatus =
    | "loading"
    | "extracting"
    | "analyzing"
    | "concluding"
    | "completed"
    | "error";

export interface ProgressCardProps extends HTMLAttributes<HTMLDivElement> {
    /** The title of the card, usually the filename */
    title: string;
    /** Current status of the process */
    status?: ProgressCardStatus;
    /** Optional explicit progress value (0-100). If not provided, and status is loading-related, it will be indeterminate. */
    progress?: number;
    /** Callback when the delete/close action is triggered */
    onClose?: () => void;
    /** Text to display for the status. If not provided, a default text based on status will be used. */
    statusMessage?: string;
    /** Boolean to show if it is a tag (from Figma properties, though usage not clear, keeping for compatibility) */
    tag?: boolean;
    /**
     * Optional children to render at the bottom of the card
     */
    children?: React.ReactNode;
    /**
     * Type of the content being processed. Deterimines the main icon.
     * @default "default"
     */
    type?: "default" | "pdf" | "image";
    /**
     * Optional custom icon to override the default main icon logic.
     */
    mainIcon?: React.ReactNode;
    /**
     * Optional callback when the main icon is clicked.
     * Use to provide preview functionality.
     */
    onClickIcon?: () => void;
}
