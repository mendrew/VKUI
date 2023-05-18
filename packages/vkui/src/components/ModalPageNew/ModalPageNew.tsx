import React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useEventListener } from '../../hooks/useEventListener';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useScrollLock } from '../AppRoot/ScrollContext';
import styles from './ModalPageNew.module.css';

// Прокрутка элемента на определенный процент
function useFirstOpen(container: React.RefObject<HTMLDivElement>, settlingHeight: number) {
  useIsomorphicLayoutEffect(() => {
    const el = container.current!;

    el.scrollTop = 0;
    el.scrollTo({
      top: (el.clientHeight * settlingHeight) / 100,
      behavior: 'smooth',
    });
  }, []);
}

// Отступы для модалки
function useIndents(settlingHeight: number) {
  const { document, window } = useDOM();

  const indent1Ref = React.useRef<HTMLDivElement>(null);
  const indent2Ref = React.useRef<HTMLDivElement>(null);

  const indentCalculate = () => {
    const indent1Height = (document!.documentElement.clientHeight * settlingHeight) / 100;
    const indent2Height = document!.documentElement.clientHeight - indent1Height;

    indent1Ref.current!.style.height = `${indent1Height}px`;
    indent2Ref.current!.style.height = `${indent2Height}px`;
  };

  useGlobalEventListener(window, 'resize', indentCalculate);

  useIsomorphicLayoutEffect(() => {
    indentCalculate();
  }, [settlingHeight]);

  return [indent1Ref, indent2Ref];
}

// Маска для модалки
function useMask(container: React.RefObject<HTMLDivElement>, settlingHeight: number) {
  const maskRef = React.useRef<HTMLDivElement>(null);

  const scroll = () => {
    const el = container.current!;

    const indent1 = (el.clientHeight * settlingHeight) / 100;

    const opacity = Math.min(el.scrollTop / indent1, 1);

    maskRef.current!.style.opacity = `${opacity}`;
  };

  const scrollListener = useEventListener('scroll', scroll);

  useIsomorphicLayoutEffect(() => {
    const el = container.current!;
    scrollListener.add(el);
  }, [settlingHeight]);

  return maskRef;
}

function useCheckScroll(container: React.RefObject<HTMLDivElement>, closeCallback: () => void) {
  useIsomorphicLayoutEffect(() => {
    const el = container.current!;

    const scroll = () => {
      if (el.scrollTop === 0) {
        closeCallback();
      }
    };

    el.addEventListener('scroll', scroll);

    return () => el.removeEventListener('scroll', scroll);
  }, []);
}

function useFullOpen(container: React.RefObject<HTMLDivElement>) {
  const [fullOpen, setFullOpen] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = container.current!;

    const scroll = () => {
      if (el.scrollTop >= el.offsetHeight) {
        !fullOpen && setFullOpen(true);
        return;
      }

      fullOpen && setFullOpen(false);
    };

    el.addEventListener('scroll', scroll);

    return () => el.removeEventListener('scroll', scroll);
  }, [fullOpen]);

  return fullOpen;
}

export interface ModalPageNewProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;

  onClose?: () => void;
  onClosed?: () => void;

  /**
   * Процент, на который изначально будет открыта модальная страница.
   * При settlingHeight={100} модальная страница раскрывается на всю высоту.
   */
  settlingHeight?: number;
}

export const ModalPageNew = ({
  header,
  children,
  footer,
  onClose,
  onClosed,
  settlingHeight = 75,
  ...restProp
}: ModalPageNewProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [indent1Ref, indent2Ref] = useIndents(settlingHeight);
  const maskRef = useMask(containerRef, settlingHeight);

  useFirstOpen(containerRef, settlingHeight);
  const fullOpen = useFullOpen(containerRef);
  useCheckScroll(containerRef, () => {
    console.log('Closed');
    onClosed && onClosed();
  });

  useScrollLock();

  const close = () => {
    onClose && onClose();

    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className={styles['ModalPageNew__mask']} ref={maskRef} />
      <div
        className={styles['ModalPageNew__container']}
        ref={containerRef}
        {...restProp}
        onClick={close}
      >
        <div style={{ height: `${settlingHeight}%` }} ref={indent1Ref} />
        <div style={{ height: `${100 - settlingHeight}%` }} ref={indent2Ref} />
        <div className={styles['ModalPageNew__contentIn']} onClick={(e) => e.stopPropagation()}>
          <div
            className={classNames(
              styles['ModalPageNew__header'],
              fullOpen && styles['ModalPageNew__headerFixed'],
            )}
          >
            {header}
          </div>

          {children}

          {footer && <div className={styles['ModalPageNew__footer']}>{footer}</div>}
        </div>
      </div>
    </>
  );
};
