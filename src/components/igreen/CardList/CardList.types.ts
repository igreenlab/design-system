import type { ReactNode, HTMLAttributes } from "react";

export interface CardListItemData {
    /** Ícone ilustrativo do item */
    icon: ReactNode;
    /** Texto descritivo */
    text: string;
}

export interface CardListProps extends HTMLAttributes<HTMLDivElement> {
    /** Lista de items a renderizar */
    items: CardListItemData[];
}
