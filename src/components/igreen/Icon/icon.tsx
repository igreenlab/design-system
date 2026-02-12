import React from "react";
import { cn } from "@/lib/utils";
import { icons } from "./icons";
import type { IconProps } from "./icon.types";
import { iconStyles } from "./icon.styles";

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ name, size = "md", color, className, style, ...props }, ref) => {
        // Verifica se o size é um preset definido nas variantes do CVA (usando as chaves do objeto de estilos gerado ou hardcoded safe check)
        // Como o CVA não expõe as chaves facilmente em tempo de execução de forma direta sem helpers, validamos manualmente os presets.
        const isPreset = ["sm", "md", "lg", "xl"].includes(size);

        // Se for preset, usa a classe. Se não, undefined.
        const sizeClass = isPreset ? iconStyles({ size: size as "sm" | "md" | "lg" | "xl" }) : undefined;

        // Se NÃO for preset, assume que é um valor arbitrário e aplica no style.
        const sizeStyle = !isPreset
            ? { width: size, height: size }
            : {};

        // Se color for passada, aplica no style.
        const colorStyle = color ? { color } : {};

        // Determine viewBox based on icon name prefix
        const isFill = name.startsWith("fill-");
        const viewBox = isFill ? "0 0 24 24" : "0 0 18 18";

        return (
            <svg
                ref={ref}
                viewBox={viewBox}
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                className={cn(isPreset ? sizeClass : iconStyles({ size: undefined }), className)}
                style={{
                    ...sizeStyle,
                    ...colorStyle,
                    ...style,
                }}
                {...props}
            >
                <path d={icons[name]} />
            </svg>
        );
    }
);

Icon.displayName = "Icon";
