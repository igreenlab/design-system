import type { ReactNode } from "react";

export interface ChoiceItemProps {
    title: string;
    description: string;
    icon: ReactNode;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

export interface ChoiceGroupProps {
    children: ReactNode;
    className?: string;
}
