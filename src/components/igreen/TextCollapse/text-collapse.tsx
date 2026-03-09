'use client';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/shadcn/collapsible';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';
import type { TextCollapseProps } from './text-collapse.types';
import { textCollapseStyles } from './text-collapse.styles';

export function TextCollapse({
  title,
  description,
  children,
  className,
  defaultOpen = false,
  open,
  onOpenChange,
  ...props
}: TextCollapseProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cn(textCollapseStyles.root, className)}
      {...props}
    >
      <CollapsibleTrigger className={textCollapseStyles.trigger.base}>
        <span className={textCollapseStyles.trigger.text}>{title}</span>

        {/* Icon Wrapper */}
        <div className={textCollapseStyles.iconWrapper}>
          <Plus className={cn(textCollapseStyles.icons.base, textCollapseStyles.icons.plus)} />
          <Minus className={cn(textCollapseStyles.icons.base, textCollapseStyles.icons.minus)} />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className={textCollapseStyles.content.base}>
        {children || description}
      </CollapsibleContent>
    </Collapsible>
  );
}
