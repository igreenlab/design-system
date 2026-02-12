"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import type { ScreenSteppersContextValue } from "./screen-steppers.types";

/**
 * ScreenSteppers Context
 * 
 * Provides step navigation controls to children components.
 */
const ScreenSteppersContext = createContext<ScreenSteppersContextValue | null>(null);

interface ScreenSteppersProviderProps {
    totalSteps: number;
    initialStep?: number;
    children: ReactNode;
}

export function ScreenSteppersProvider({
    totalSteps,
    initialStep = 1,
    children,
}: ScreenSteppersProviderProps) {
    const [currentStep, setCurrentStep] = useState(() =>
        Math.min(Math.max(1, initialStep), totalSteps)
    );

    const goToStep = useCallback((step: number) => {
        setCurrentStep(Math.min(Math.max(1, step), totalSteps));
    }, [totalSteps]);

    const nextStep = useCallback(() => {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }, [totalSteps]);

    const prevStep = useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    }, []);

    const value = useMemo<ScreenSteppersContextValue>(() => ({
        currentStep,
        totalSteps,
        goToStep,
        nextStep,
        prevStep,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
    }), [currentStep, totalSteps, goToStep, nextStep, prevStep]);

    return (
        <ScreenSteppersContext.Provider value={value}>
            {children}
        </ScreenSteppersContext.Provider>
    );
}

/**
 * Hook to access ScreenSteppers navigation context
 * 
 * @throws Error if used outside of ScreenSteppers component
 */
export function useScreenSteppers(): ScreenSteppersContextValue {
    const context = useContext(ScreenSteppersContext);

    if (!context) {
        throw new Error(
            "useScreenSteppers must be used within a ScreenSteppers component"
        );
    }

    return context;
}
