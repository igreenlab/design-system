import type { ReactNode } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export interface TextCollapseProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
    /**
     * Title displayed in the trigger area.
     */
    title: string;

    /**
     * Helper description text. If children are provided, this can be omitted.
     * Content rendered inside the collapsible area.
     */
    description?: string | ReactNode;

    /**
     * Additional CSS classes.
     */
    className?: string;

    /**
     * Content to render inside the collapsible area (alias for description if complex content is needed).
     */
    children?: ReactNode;
}
