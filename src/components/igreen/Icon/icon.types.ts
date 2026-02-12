import type { SVGProps } from "react";
import { icons } from "./icons";

export type IconName = keyof typeof icons;

export type IconSize = "sm" | "md" | "lg" | "xl" | (string & {});

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "fontSize"> {
    /**
     * Chave do nome do ícone (baseada no mapa `icons.ts`).
     */
    name: IconName;

    /**
     * Tamanho do ícone.
     * Pode ser um preset ('sm', 'md', 'lg', 'xl') ou um valor arbitrário CSS (ex: '32px', '2rem').
     * @default "md"
     */
    size?: IconSize;

    /**
     * Cor do ícone.
     * Se definida, sobrescreve a cor atual (currentColor).
     * Aceita qualquer valor de cor CSS válido.
     */
    color?: string;
}
