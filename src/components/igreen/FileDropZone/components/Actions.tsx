"use client";

import React from "react";
import type { FileDropZoneActionsProps } from "../FileDropZone.types";
import { fileDropZoneStyles } from "../FileDropZone.styles";
import { cn } from "@/lib/utils";

/**
 * Actions - Wrapper para area de botoes/inputs
 * NOTA: Nao aplica flex-1 automaticamente - use className ou wrappers externos
 */
export const Actions: React.FC<FileDropZoneActionsProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn(fileDropZoneStyles.actions.container, className)}>
            {children}
        </div>
    );
};

Actions.displayName = "FileDropZone.Actions";
