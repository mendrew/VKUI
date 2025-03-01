import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useId } from '../../hooks/useId';
import { usePlatform } from '../../hooks/usePlatform';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { Platform } from '../../lib/platform';
import { stopPropagation } from '../../lib/utils';
import { AnchorHTMLAttributesOnly, HasChildren } from '../../types';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { Button, ButtonProps } from '../Button/Button';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import styles from './Alert.module.css';

export interface AlertActionInterface
  extends Pick<ButtonProps, 'Component'>,
    AnchorHTMLAttributesOnly {
  title: string;
  action?: VoidFunction;
  autoClose?: boolean;
  mode: 'cancel' | 'destructive' | 'default';
}

export interface AlertProps extends React.HTMLAttributes<HTMLElement> {
  actionsLayout?: 'vertical' | 'horizontal';
  actions?: AlertActionInterface[];
  header?: React.ReactNode;
  text?: React.ReactNode;
  onClose: VoidFunction;

  /**
   * `aria-label` для кнопки закрытия. Необходим, чтобы кнопка была доступной.
   */
  dismissLabel?: string;
}

type ItemClickHandler = (item: AlertActionInterface) => void;

interface AlertTypography extends HasChildren {
  id: string;
}

const AlertHeader = (props: AlertTypography) => {
  const platform = usePlatform();

  switch (platform) {
    case Platform.IOS:
      return <Title className={styles['Alert__header']} weight="1" level="3" {...props} />;
    default:
      return <Title className={styles['Alert__header']} weight="2" level="2" {...props} />;
  }
};

const AlertText = (props: AlertTypography) => {
  const platform = usePlatform();

  switch (platform) {
    case Platform.VKCOM:
      return <Footnote className={styles['Alert__text']} {...props} />;
    case Platform.IOS:
      return <Caption className={styles['Alert__text']} {...props} />;
    default:
      return <Text Component="span" className={styles['Alert__text']} weight="3" {...props} />;
  }
};

interface AlertActionProps {
  action: AlertActionInterface;
  onItemClick: ItemClickHandler;
}

const AlertAction = ({ action, onItemClick, ...restProps }: AlertActionProps) => {
  const platform = usePlatform();
  const handleItemClick = React.useCallback(() => onItemClick(action), [onItemClick, action]);

  if (platform === Platform.IOS) {
    const { title, action: actionProp, autoClose, mode, ...restActionProps } = action;

    return (
      <Tappable
        Component={restActionProps.href ? 'a' : 'button'}
        className={classNames(
          styles['Alert__action'],
          mode === 'destructive' && styles['Alert__action--mode-destructive'],
          mode === 'cancel' && styles['Alert__action--mode-cancel'],
        )}
        onClick={handleItemClick}
        {...restActionProps}
        {...restProps}
      >
        {title}
      </Tappable>
    );
  }

  let mode: ButtonProps['mode'] = 'tertiary';

  if (platform === Platform.VKCOM) {
    mode = action.mode === 'cancel' ? 'secondary' : 'primary';
  }

  return (
    <Button
      className={classNames(
        styles['Alert__button'],
        action.mode === 'cancel' && styles['Alert__button--mode-cancel'],
      )}
      mode={mode}
      size="m"
      onClick={handleItemClick}
      Component={action.Component}
      href={action.href}
      target={action.target}
    >
      {action.title}
    </Button>
  );
};

/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */
export const Alert = ({
  actions = [],
  actionsLayout = 'horizontal',
  children,
  className,
  style,
  text,
  header,
  onClose,
  dismissLabel = 'Закрыть предупреждение',
  ...restProps
}: AlertProps) => {
  const generatedId = useId();

  const headerId = `vkui-alert-${generatedId}-header`;
  const textId = `vkui-alert-${generatedId}-text`;

  const platform = usePlatform();
  const { isDesktop } = useAdaptivityWithJSMediaQueries();
  const { waitTransitionFinish } = useWaitTransitionFinish();

  const [closing, setClosing] = React.useState(false);

  const elementRef = React.useRef<HTMLDivElement>(null);

  const resolvedActionsLayout: AlertProps['actionsLayout'] =
    platform === Platform.VKCOM ? 'horizontal' : actionsLayout;

  const timeout = platform === Platform.IOS ? 300 : 200;

  const close = React.useCallback(() => {
    setClosing(true);
    waitTransitionFinish(
      elementRef.current,
      (e?: TransitionEvent) => {
        if (!e || e.propertyName === 'opacity') {
          onClose();
        }
      },
      timeout,
    );
  }, [elementRef, waitTransitionFinish, onClose, timeout]);

  const onItemClick: ItemClickHandler = React.useCallback(
    (item: AlertActionInterface) => {
      const { action, autoClose } = item;

      if (autoClose) {
        setClosing(true);
        waitTransitionFinish(
          elementRef.current,
          (e?: TransitionEvent) => {
            if (!e || e.propertyName === 'opacity') {
              onClose();
              action && action();
            }
          },
          timeout,
        );
      } else {
        action && action();
      }
    },
    [elementRef, waitTransitionFinish, onClose, timeout],
  );

  useScrollLock();

  return (
    <PopoutWrapper className={className} closing={closing} style={style} onClick={close}>
      <FocusTrap
        {...restProps}
        getRootRef={elementRef}
        onClick={stopPropagation}
        onClose={close}
        timeout={timeout}
        className={classNames(
          styles['Alert'],
          platform === Platform.IOS && styles['Alert--ios'],
          platform === Platform.VKCOM && styles['Alert--vkcom'],
          resolvedActionsLayout === 'vertical' ? styles['Alert--v'] : styles['Alert--h'],
          closing && styles['Alert--closing'],
          isDesktop && styles['Alert--desktop'],
        )}
        role="alertdialog"
        aria-modal
        aria-labelledby={headerId}
        aria-describedby={textId}
      >
        <div className={styles['Alert__content']}>
          {hasReactNode(header) && <AlertHeader id={headerId}>{header}</AlertHeader>}
          {hasReactNode(text) && <AlertText id={textId}>{text}</AlertText>}
          {children}
        </div>
        <div className={styles['Alert__actions']}>
          {actions.map((action, i) => (
            <AlertAction key={i} action={action} onItemClick={onItemClick} />
          ))}
        </div>
        {isDesktop && <ModalDismissButton onClick={close} aria-label={dismissLabel} />}
      </FocusTrap>
    </PopoutWrapper>
  );
};
