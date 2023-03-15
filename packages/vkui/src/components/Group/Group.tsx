import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { warnOnce } from '../../lib/warnOnce';
import { HasRootRef } from '../../types';
import { ModalRootContext } from '../ModalRoot/ModalRootContext';
import { Separator } from '../Separator/Separator';
import { Spacing } from '../Spacing/Spacing';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './Group.module.css';

const sizeXClassNames = {
  none: styles['Group--sizeX-none'],
  [SizeType.COMPACT]: styles['Group--sizeX-compact'],
  [SizeType.REGULAR]: styles['Group--sizeX-regular'],
};

export interface GroupProps extends HasRootRef<HTMLElement>, React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  description?: React.ReactNode;
  /**
    show - разделитель всегда показывается,
    hide - разделитель всегда спрятан,
    auto - разделитель рисуется автоматически между соседними группами.
   */
  separator?: 'show' | 'hide' | 'auto';
  /**
   * Режим отображения. Если установлен 'card', выглядит как карточка c
   * обводкой и внешними отступами. Если 'plain' — без отступов и обводки.
   * По умолчанию режим отображения зависит от `sizeX`. В модальных окнах
   * по умолчанию 'plain'.
   */
  mode?: 'plain' | 'card';
  /**
   * Отвечает за отступы вокруг контента в режиме 'card'.
   */
  padding?: 's' | 'm';
  children?: React.ReactNode;
}

const warn = warnOnce('TabsItem');

export const Group = ({
  header,
  description,
  children,
  separator = 'auto',
  getRootRef,
  mode: modeProps,
  padding = 'm',
  className,
  tabIndex: tabIndexProp,
  ...restProps
}: GroupProps) => {
  const { isInsideModal } = React.useContext(ModalRootContext);
  const platform = usePlatform();
  const { sizeX = 'none' } = useAdaptivity();

  let mode: GroupProps['mode'] | 'none' = modeProps;

  if (!modeProps) {
    // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
    mode = isInsideModal ? 'plain' : 'none';
  }

  const isTabPanel = restProps.role === 'tabpanel';

  if (
    process.env.NODE_ENV === 'development' &&
    isTabPanel &&
    (!restProps['aria-controls'] || !restProps['id'])
  ) {
    warn(
      'При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"',
    );
  }

  const tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;

  return (
    <section
      {...restProps}
      tabIndex={tabIndex}
      ref={getRootRef}
      className={classNames(
        styles['Group'],
        platform === Platform.IOS && styles['Group--ios'],
        sizeXClassNames[sizeX],
        mode &&
          {
            none: styles['Group--mode-none'],
            plain: styles['Group--mode-plain'],
            card: styles['Group--mode-card'],
          }[mode],
        {
          s: styles['Group--padding-s'],
          m: styles['Group--padding-m'],
        }[padding],
        className,
      )}
    >
      {header}
      {children}
      {hasReactNode(description) && (
        <Footnote className={styles['Group__description']}>{description}</Footnote>
      )}

      {separator !== 'hide' && (
        <Spacing
          className={classNames(
            styles['Group__separator'],
            separator === 'show' && styles['Group__separator--force'],
          )}
          size={16}
        >
          <Separator />
        </Spacing>
      )}
    </section>
  );
};
