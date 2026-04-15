import type { ReactNode } from "react";

/**
 * ScreenSteppers Component Types
 * 
 * Layout component for multi-step forms with navigation context.
 */

export interface ScreenSteppersProps {
    /** Total number of steps in the process */
    totalSteps: number;
    /** Initial step (1-indexed). Default: 1 */
    initialStep?: number;
    /** Content to render (typically form steps) */
    children: ReactNode;
    /** Additional CSS class for the container */
    className?: string;
    /** Force a specific layout regardless of viewport. Useful for demos. */
    forceLayout?: "mobile" | "desktop";
    /**
     * Optional mapping from logical step IDs to display values.
     * Useful when some steps are conditionally hidden but logical IDs
     * must remain stable for routing.
     */
    mapDisplayStep?: (currentStep: number, totalSteps: number) => { current: number; total: number };
}

export interface ScreenSteppersContextValue {
    /** Current active step (1-indexed) */
    currentStep: number;
    /** Total number of steps */
    totalSteps: number;
    /** Navigate to a specific step */
    goToStep: (step: number) => void;
    /** Go to next step */
    nextStep: () => void;
    /** Go to previous step */
    prevStep: () => void;
    /** Whether currently on first step */
    isFirstStep: boolean;
    /** Whether currently on last step */
    isLastStep: boolean;
}
