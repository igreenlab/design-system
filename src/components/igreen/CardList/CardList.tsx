import React from "react";
import type { CardListProps } from "./CardList.types";
import { cardListStyles } from "./CardList.styles";
import { cn } from "@/lib/utils";

export const CardList: React.FC<CardListProps> = ({ items, className, ...props }) => {
    return (
        <div className={cn(cardListStyles.container, className)} {...props}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        cardListStyles.item.base,
                        index < items.length - 1 && cardListStyles.item.separator
                    )}
                >
                    <div className={cardListStyles.icon.container}>
                        <div className={cardListStyles.icon.inner}>
                            {item.icon}
                        </div>
                    </div>
                    <span className={cardListStyles.text}>{item.text}</span>
                </div>
            ))}
        </div>
    );
};

CardList.displayName = "CardList";
