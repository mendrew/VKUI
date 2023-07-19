import React from 'react';
import { useCustomEnsuredControl } from '../../hooks/useEnsuredControl';
import { useId } from '../../hooks/useId';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { HasChildren } from '../../types';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './AccordionContext';
import { AccordionSummary } from './AccordionSummary';

function useAccordionId(id: CollapseProps['id']) {
  const generatedId = useId();
  const labelId = id ?? `Collapse${generatedId}`;
  const contentId = `CollapseContent${id ?? generatedId}`;

  return { labelId, contentId };
}

// TODO [>=6]: Переименовать в AccordionProps

export interface CollapseProps extends HasChildren {
  id?: string;
  /**
   * Управляет раскрытием и скрытием контента.
   */
  expanded?: boolean;
  /**
   * Значение по умолчанию.
   */
  defaultExpanded?: boolean;
  /**
   * Функция изменения
   */
  onChange?: (e: boolean) => void;
  disabled?: boolean;
}

// TODO [>=6]: Переименовать в Accordion

export const Collapse = ({
  id,
  expanded: expandedProp,
  defaultExpanded = false,
  onChange: onChangeProp,
  children,
  ...restProps
}: CollapseProps) => {
  const { labelId, contentId } = useAccordionId(id);

  const [expanded, onChange] = useCustomEnsuredControl({
    value: expandedProp,
    defaultValue: defaultExpanded,
    onChange: onChangeProp,
    disabled: restProps.disabled,
  });

  const context = useObjectMemo({
    labelId,
    contentId,
    expanded: expanded || false,
    onChange,
  });

  return <AccordionContext.Provider value={context}>{children}</AccordionContext.Provider>;
};

Collapse.Summary = AccordionSummary;
Collapse.Content = AccordionContent;
