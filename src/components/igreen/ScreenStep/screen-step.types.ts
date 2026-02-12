import type { ReactNode } from "react";

/**
 * ScreenStep Component Types
 * 
 * Internal step layout for multi-step forms.
 */

/**
 * Configuration for built-in action buttons
 */
export interface ScreenStepActionsConfig {
    /** Layout pattern */
    layout?: "dual" | "single-back";
    /** Back button callback */
    onBack?: () => void;
    /** Back button label */
    backLabel?: string;
    /** Back button disabled state */
    backDisabled?: boolean;
    /** Next/proceed button callback */
    onNext?: () => void;
    /** Next button label */
    nextLabel?: string;
    /** Next button disabled state */
    nextDisabled?: boolean;
}

/**
 * Actions can be either:
 * - Object config (uses built-in buttons)
 * - ReactNode (custom content)
 */
export type ScreenStepActions = ScreenStepActionsConfig | ReactNode;

/**
 * Type guard to check if actions is a config object
 */
export function isActionsConfig(actions: ScreenStepActions): actions is ScreenStepActionsConfig {
    return (
        typeof actions === "object" &&
        actions !== null &&
        !("$$typeof" in actions) && // Not a React element
        !Array.isArray(actions)
    );
}

export interface ScreenStepProps {
    /** Step indicator text (e.g., "PASSO 1 DE 5") */
    stepLabel?: string;
    /** Main title - Can include ReactNode for highlighted text */
    title: ReactNode;
    /** Subtitle/description below title */
    subtitle?: string;
    /** Form content */
    children: ReactNode;
    /** 
     * Action buttons - pass object for built-in buttons or ReactNode for custom
     * @example
     * // Built-in buttons
     * actions={{ onBack, onNext, nextDisabled: !isValid }}
     * 
     * // Custom buttons
     * actions={<MyCustomButtons />}
     */
    actions?: ScreenStepActions;
    /** Additional CSS class */
    className?: string;
}
