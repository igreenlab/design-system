"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/shadcn/button";
import { screenStepStyles as styles } from "./screen-step.styles";
import type { ScreenStepActionsConfig } from "./screen-step.types";

function isThenable(value: unknown): value is PromiseLike<unknown> {
    return (
        !!value &&
        (typeof value === "object" || typeof value === "function") &&
        typeof (value as PromiseLike<unknown>).then === "function"
    );
}

/**
 * Internal component to render action buttons from config
 */
export function ScreenStepActionsRenderer({
    layout = "dual",
    onBack,
    backLabel = "Voltar",
    backDisabled = false,
    onNext,
    nextLabel = "Prosseguir",
    nextDisabled = false,
}: ScreenStepActionsConfig) {
    // Quando onNext é assíncrono, bloqueia o botão "Prosseguir" (e o "Voltar")
    // e mostra loading até a Promise resolver. Evita que múltiplos cliques
    // durante a request disparem os endpoints mais de uma vez.
    const [isPending, setIsPending] = useState(false);

    const handleNext = useCallback(async () => {
        if (!onNext || isPending) return;
        const result = onNext();
        if (!isThenable(result)) return;
        setIsPending(true);
        try {
            await result;
        } finally {
            setIsPending(false);
        }
    }, [onNext, isPending]);
    // Single back button layout
    if (layout === "single-back") {
        return (
            <div className={styles.actions.singleBack}>
                <Button
                    variant="default"
                    color="secondary"
                    size="lg"
                    onClick={onBack}
                    disabled={backDisabled}
                    className={styles.actions.singleBackButton}
                >
                    {backLabel}
                </Button>
            </div>
        );
    }

    // Dual layout (default)
    return (
        <div className={styles.actions.dual}>
            <Button
                variant="default"
                color="secondary"
                size="lg"
                onClick={onBack}
                disabled={backDisabled || isPending}
                className={styles.actions.backButton}
            >
                {backLabel}
            </Button>
            <Button
                variant="default"
                color="primary"
                size="lg"
                onClick={handleNext}
                disabled={nextDisabled || isPending}
                loading={isPending}
                className={styles.actions.nextButton}
            >
                {nextLabel}
            </Button>
        </div>
    );
}
