"use client";

import React from "react";
import type { IconBoxProps } from "../FileDropZone.types";
import { getIconBoxClasses, fileDropZoneStyles } from "../FileDropZone.styles";
import { cn } from "@/lib/utils";

/**
 * IconBox - Caixa do icone com cores baseadas no status
 */
export const IconBox: React.FC<IconBoxProps> = ({
    status,
    icon,
    animate = false,
    className,
}) => {
    return (
        <div className={cn(getIconBoxClasses(status), className)}>
            <div className={cn(
                fileDropZoneStyles.iconBox.icon,
                // Spinner animation apenas no icone, nao na caixa
                animate && fileDropZoneStyles.iconBox.spinner
            )}>
                {icon}
            </div>
        </div>
    );
};

IconBox.displayName = "FileDropZone.IconBox";
