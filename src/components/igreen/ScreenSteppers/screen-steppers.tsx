"use client";

import { cn } from "@/lib/utils";
import { StepperProgress } from "../StepperProgress";
import { ScreenSteppersProvider, useScreenSteppers } from "./screen-steppers.context";
import { screenSteppersStyles as styles } from "./screen-steppers.styles";
import type { ScreenSteppersProps } from "./screen-steppers.types";
import igreenLogo from "@/img/igreen-isotipo.svg";

/**
 * Inner component that uses the context
 */
function ScreenSteppersInner({
    children,
    className,
    forceLayout,
}: {
    children: React.ReactNode;
    className?: string;
    forceLayout?: "mobile" | "desktop";
}) {
    const { currentStep, totalSteps } = useScreenSteppers();

    // Determine header and stepper wrapper classes based on forceLayout
    const headerClass = forceLayout
        ? styles.header[forceLayout]
        : styles.header.base;

    const stepperWrapperClass = forceLayout
        ? styles.stepperWrapper[forceLayout]
        : styles.stepperWrapper.base;

    return (
        <div className={cn(styles.container, className)}>
            {/* Header with logo and stepper */}
            <header className={headerClass}>
                {/* iGreen Logo */}
                <div className={styles.logo}>
                    <img src={igreenLogo} alt="iGreen" width={15} height={21} />
                </div>

                {/* Stepper Progress */}
                <div className={stepperWrapperClass}>
                    <StepperProgress
                        totalSteps={totalSteps}
                        currentStep={currentStep}
                    />
                </div>
            </header>

            {/* Content area */}
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}

/**
 * ScreenSteppers
 * 
 * A responsive layout component for multi-step forms.
 * Provides step navigation context to children via useScreenSteppers() hook.
 * 
 * @example
 * ```tsx
 * <ScreenSteppers totalSteps={5}>
 *   <MyFormStep />
 * </ScreenSteppers>
 * 
 * // Inside MyFormStep:
 * const { nextStep, prevStep, currentStep } = useScreenSteppers();
 * ```
 */
export function ScreenSteppers({
    totalSteps,
    initialStep = 1,
    children,
    className,
    forceLayout,
}: ScreenSteppersProps) {
    return (
        <ScreenSteppersProvider totalSteps={totalSteps} initialStep={initialStep}>
            <ScreenSteppersInner className={className} forceLayout={forceLayout}>
                {children}
            </ScreenSteppersInner>
        </ScreenSteppersProvider>
    );
}
