import type { ReactNode } from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import type { IconName } from "@/components/igreen/Icon/icon.types";

export type DialogAlertVariant = "default" | "warning" | "critical";

export interface DialogAlertProps extends DialogProps {
    /**
     * Title of the alert
     */
    title: string;

    /**
     * Description text
     */
    description: string;

    /**
     * Visual variant of the alert
     * @default "critical"
     */
    variant?: DialogAlertVariant;

    /**
     * Text for the confirm button
     */
    confirmLabel?: string;

    /**
     * Text for the cancel button
     */
    cancelLabel?: string;

    /**
     * Callback when confirm button is clicked
     */
    onConfirm?: () => void;

    /**
     * Callback when cancel button is clicked
     */
    onCancel?: () => void;

    /**
     * Whether the action is loading
     */
    loading?: boolean;

    /**
     * Content to display in the alert body
     */
    children?: ReactNode;

    /**
     * Icon to display in the header
     */
    icon?: IconName;

    /**
     * Additional CSS classes
     */
    className?: string;
}
