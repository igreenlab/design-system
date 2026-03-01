import type { ReactNode } from "react";
import type { DialogProps as RadixDialogProps } from "@radix-ui/react-dialog";
import type { IconName } from "@/components/igreen/Icon/icon.types";

/**
 * Props do componente Dialog
 */
export interface DialogProps extends RadixDialogProps {
  /** 
   * Título do diálogo 
   */
  title?: string | ReactNode;

  /** 
   * Descrição do diálogo 
   */
  description?: string | ReactNode;

  /** 
   * Nome do ícone a ser exibido no cabeçalho (utiliza o componente Icon)
   */
  icon?: IconName;

  /** 
   * Controla a exibição / comportamento do botão de fechar (X)
   * Se true (default), exibe o botão e fecha o dialog.
   * Se false, não exibe.
   * Se função, exibe e executa a função ao clicar.
   * @default true
   */
  onCloseButton?: boolean | (() => void);

  /**
   * Configuração do botão de cancelar (lado esquerdo do footer)
   * Se true, exibe o botão com texto padrão e fecha ao clicar.
   * Se função, executa a função ao clicar.
   */
  onCancel?: boolean | (() => void);

  /**Texto personalizado para o botão de cancelar
   * @default "Cancelar"
   */
  cancelText?: string;

  /**
   * Configuração do botão de confirmar (lado direito do footer)
   * Se true, exibe o botão.
   * Se função, executa a função ao clicar.
   */
  onConfirm?: boolean | (() => void);

  /**
   * Texto personalizado para o botão de confirmar
   * @default "Confirmar"
   */
  confirmText?: string;

  /**
   * Estado de carregamento do botão de confirmação
   */
  loading?: boolean;

  /**
   * Conteúdo do diálogo
   */
  children?: ReactNode;

  /**
   * Classes adicionais para o container do conteúdo
   */
  className?: string;

  /**
   * Largura personalizada do dialog (opcional)
   * Por padrão segue o design system (550px)
   */
  width?: string;

  /**
   * Define altura máxima como 100vh no mobile (útil para formulários longos)
   * @default false
   */
  fullHeight?: boolean;
}
