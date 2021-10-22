import * as React from 'react';
import { Touch, TouchEvent } from '../Touch/Touch';
import TouchRootContext from '../Touch/TouchContext';
import { getClassName } from '../../helpers/getClassName';
import { classNames } from '../../lib/classNames';
import { setTransformStyle } from '../../lib/styles';
import { rubber } from '../../lib/touch';
import { ANDROID, IOS, VKCOM } from '../../lib/platform';
import { transitionEvent } from '../../lib/supportEvents';
import { HasPlatform } from '../../types';
import { withPlatform } from '../../hoc/withPlatform';
import { withContext } from '../../hoc/withContext';
import ModalRootContext, { ModalRootContextInterface } from './ModalRootContext';
import {
  ConfigProviderContext,
  ConfigProviderContextInterface,
  WebviewType,
} from '../ConfigProvider/ConfigProviderContext';
import { ModalsStateEntry, ModalType, TranslateRange } from './types';
import { MODAL_PAGE_DEFAULT_PERCENT_HEIGHT } from './constants';
import { DOMProps, withDOM } from '../../lib/dom';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { ModalTransitionProps, withModalManager } from './useModalManager';
import './ModalRoot.css';

const warn = warnOnce('ModalRoot');
const IS_DEV = process.env.NODE_ENV === 'development';

function numberInRange(number: number, range: TranslateRange) {
  return number >= range[0] && number <= range[1];
}

function rangeTranslate(number: number) {
  return Math.max(0, Math.min(98, number));
}

export interface ModalRootProps extends HasPlatform {
  activeModal?: string | null;

  /**
   * Будет вызвано при закрытии активной модалки с её id
   */
  onClose?(modalId: string): void;
  /**
   * @ignore
   */
  configProvider?: ConfigProviderContextInterface;
}

interface ModalRootState {
  touchDown?: boolean;
  dragging?: boolean;
}

class ModalRootTouchComponent extends React.Component<ModalRootProps & DOMProps & ModalTransitionProps, ModalRootState> {
  constructor(props: ModalRootProps & ModalTransitionProps) {
    super(props);
    this.state = {
      touchDown: false,
      dragging: false,
    };

    this.maskElementRef = React.createRef();
    this.frameIds = {};
  }

  private getModalRootContext(): ModalRootContextInterface {
    return {
      updateModalHeight: this.updateModalHeight,
      registerModal: ({ id, ...data }) => Object.assign(this.modalsState[id], data),
      onClose: () => this.props.closeActiveModal(),
      isInsideModal: true,
      enteringId: this.props.enteringModal,
      animateEnter: (id) => {
        const enteringState = this.modalsState[id];
        this.animateTranslate(enteringState, enteringState.translateY);
      },
      onEnter: (id) => this.props.onEnter(id),
      exitingId: this.props.exitingModal,
      animateExit: (id) => {
        const prevModalState = this.modalsState[id];
        const nextModalState = this.modalsState[this.props.activeModal];
        const nextIsPage = !!nextModalState && nextModalState.type === ModalType.PAGE;

        const prevIsPage = !!prevModalState && prevModalState.type === ModalType.PAGE;
        const exitTranslate = prevIsPage && nextIsPage && prevModalState.translateY <= nextModalState.translateYFrom && !this.props.isBack
          ? nextModalState.translateYFrom + 10
          : 100;
        this.animateTranslate(prevModalState, exitTranslate);
      },
      getState: (id) => this.modalsState[id],
      setMaskOpacity: (id) => this.setMaskOpacity(this.modalsState[id]),
      onExit: (id) => this.props.onExit(id),
      isTouch: true,
    };
  }

  private documentScrolling: boolean;
  private readonly maskElementRef: React.RefObject<HTMLDivElement>;
  private readonly viewportRef = React.createRef<HTMLDivElement>();
  private maskAnimationFrame: number;
  private readonly frameIds: {
    [index: string]: number;
  };

  get timeout(): number {
    return this.props.platform === ANDROID || this.props.platform === VKCOM ? 320 : 400;
  }

  get window(): Window {
    return this.props.window;
  }

  get modalsState() {
    return this.props.modalsState;
  }

  getModals() {
    return React.Children.toArray(this.props.children) as React.ReactElement[];
  }

  componentDidMount() {
    // Отслеживаем изменение размеров viewport (Необходимо для iOS)
    if (this.props.platform === IOS) {
      this.window.addEventListener('resize', this.updateModalTranslate, false);
    }
  }

  componentWillUnmount() {
    this.toggleDocumentScrolling(true);
    this.window.removeEventListener('resize', this.updateModalTranslate, false);
  }

  componentDidUpdate(prevProps: ModalRootProps & ModalTransitionProps) {
    if (!this.props.activeModal && prevProps.activeModal) {
      this.setMaskOpacity(this.modalsState[prevProps.activeModal], 0);
    }

    this.toggleDocumentScrolling(!this.props.activeModal && !this.props.exitingModal);
  }

  /* Отключает скролл документа */
  toggleDocumentScrolling(enabled: boolean) {
    if (this.documentScrolling === enabled) {
      return;
    }
    this.documentScrolling = enabled;

    if (enabled) {
      // Здесь нужен последний аргумент с такими же параметрами, потому что
      // некоторые браузеры на странных вендорах типа Meizu не удаляют обработчик.
      // https://github.com/VKCOM/VKUI/issues/444
      // @ts-ignore (В интерфейсе EventListenerOptions нет поля passive)
      this.window.removeEventListener('touchmove', this.preventTouch, { passive: false });
    } else {
      this.window.addEventListener('touchmove', this.preventTouch, { passive: false });
    }
  }

  preventTouch = (event: any) => {
    if (!event) {
      return false;
    }
    while (event.originalEvent) {
      event = event.originalEvent;
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    return false;
  };

  updateModalTranslate = () => {
    const modalState = this.modalsState[this.props.activeModal];
    modalState && this.animateTranslate(modalState, modalState.translateY);
  };

  checkPageContentHeight() {
    const modalState = this.modalsState[this.props.activeModal];

    if (modalState?.type === ModalType.PAGE && modalState?.modalElement) {
      const prevModalState = { ...modalState };
      initPageModal(modalState);
      const currentModalState = { ...modalState };

      let needAnimate = false;

      if (prevModalState.expandable === currentModalState.expandable) {
        if (prevModalState.translateYFrom !== currentModalState.translateYFrom) {
          needAnimate = true;
        }
      } else {
        needAnimate = true;
      }

      if (needAnimate) {
        this.animateTranslate(modalState, modalState.translateY);
      }
    }
  }

  updateModalHeight = () => {
    const modalState = this.modalsState[this.props.activeModal];

    if (modalState && modalState.type === ModalType.PAGE && modalState.dynamicContentHeight) {
      if (this.props.enteringModal) {
        this.waitTransitionFinish(modalState, () => {
          requestAnimationFrame(() => this.checkPageContentHeight());
        });
      } else {
        requestAnimationFrame(() => this.checkPageContentHeight());
      }
    }
  };

  onTouchMove = (e: TouchEvent) => {
    if (this.props.exitingModal) {
      return;
    }
    const modalState = this.modalsState[this.props.activeModal];

    if (modalState && modalState.type === ModalType.PAGE) {
      return this.onPageTouchMove(e, modalState);
    }
  };

  onPageTouchMove(event: TouchEvent, modalState: ModalsStateEntry) {
    const { shiftY, originalEvent } = event;
    const target = originalEvent.target as HTMLElement;

    if (!event.isY) {
      if (this.viewportRef.current.contains(target)) {
        originalEvent.preventDefault();
      }
      return;
    }

    if (!modalState.innerElement.contains(target)) {
      return originalEvent.preventDefault();
    }

    originalEvent.stopPropagation();

    const { expandable, contentScrolled, collapsed, expanded } = modalState;

    if (!this.state.touchDown) {
      modalState.touchStartContentScrollTop = modalState.contentElement.scrollTop;
      this.setState({ touchDown: true });
    }

    if (contentScrolled) {
      return;
    }

    if (modalState.touchMovePositive === null) {
      modalState.touchMovePositive = shiftY > 0;
    }

    if (
      !modalState.expandable ||
      collapsed ||
      expanded && modalState.touchMovePositive && modalState.touchStartContentScrollTop === 0 ||
      modalState.headerElement.contains(target)
    ) {
      originalEvent.preventDefault();

      if (!expandable && shiftY < 0) {
        return;
      }

      !this.state.dragging && this.setState({ dragging: true });

      const shiftYPercent = shiftY / this.window.innerHeight * 100;
      const shiftYCurrent = rubber(shiftYPercent, 72, 0.8, this.props.platform === ANDROID || this.props.platform === VKCOM);

      modalState.touchShiftYPercent = shiftYPercent;
      modalState.translateYCurrent = rangeTranslate(modalState.translateY + shiftYCurrent);

      this.animateTranslate(modalState, modalState.translateYCurrent);
      this.setMaskOpacity(modalState);
    }
  }

  onTouchEnd = (e: TouchEvent) => {
    const modalState = this.modalsState[this.props.activeModal];

    if (modalState && modalState.type === ModalType.PAGE) {
      return this.onPageTouchEnd(e, modalState);
    }
  };

  onPageTouchEnd(event: TouchEvent, modalState: ModalsStateEntry) {
    const { startY, shiftY } = event;

    modalState.contentScrolled = false;
    modalState.touchMovePositive = null;

    let setStateCallback;

    if (this.state.dragging) {
      const shiftYEndPercent = (startY + shiftY) / this.window.innerHeight * 100;

      let translateY = modalState.translateYCurrent;
      const expectTranslateY = translateY / event.duration * 240 * 0.6 * (modalState.touchShiftYPercent < 0 ? -1 : 1);
      translateY = rangeTranslate(translateY + expectTranslateY);

      if (modalState.settlingHeight !== 100) {
        if (numberInRange(translateY, modalState.expandedRange)) {
          translateY = modalState.expandedRange[0];
        } else if (numberInRange(translateY, modalState.collapsedRange)) {
          translateY = modalState.translateYFrom;
        } else if (numberInRange(translateY, modalState.hiddenRange)) {
          translateY = 100;
        } else {
          translateY = modalState.translateYFrom;
        }
      } else {
        if (numberInRange(translateY, [0, 25])) {
          translateY = 0;
        } else {
          translateY = 100;
        }
      }

      if (translateY !== 100 && shiftYEndPercent >= 75) {
        translateY = 100;
      }

      modalState.translateY = translateY;
      modalState.translateYCurrent = translateY;
      modalState.collapsed = translateY > 0 && translateY < shiftYEndPercent;
      modalState.expanded = translateY === 0;
      modalState.hidden = translateY === 100;

      if (modalState.hidden) {
        this.props.closeActiveModal();
      }

      setStateCallback = () => {
        if (!modalState.hidden) {
          this.animateTranslate(modalState, modalState.translateY);
        }

        this.setMaskOpacity(modalState);
      };
    }

    this.setState({
      touchDown: false,
      dragging: false,
    }, setStateCallback);
  }

  onScroll = (e: React.SyntheticEvent) => {
    const activeModal = this.props.activeModal;

    const target = e.target as HTMLElement;

    if (!activeModal) {
      return;
    }
    const modalState = this.modalsState[activeModal];
    if (modalState.type === ModalType.PAGE && modalState.contentElement.contains(target)) {
      modalState.contentScrolled = true;

      clearTimeout(modalState.contentScrollStopTimeout);

      modalState.contentScrollStopTimeout = setTimeout(() => {
        if (modalState.contentScrolled) {
          modalState.contentScrolled = false;
        }
      }, 250);
    }
  };

  waitTransitionFinish(modalState: ModalsStateEntry, eventHandler: () => void) {
    if (transitionEvent.supported) {
      const onceHandler = () => {
        modalState.innerElement.removeEventListener(transitionEvent.name, onceHandler);
        eventHandler();
      };

      modalState.innerElement.addEventListener(transitionEvent.name, onceHandler);
    } else {
      setTimeout(eventHandler, this.timeout);
    }
  }

  /**
   * Анимирует сдвиг модалки
   *
   * @param {ModalsStateEntry} modalState
   * @param {number} percent Процент сдвига: 0 – полностью открыта, 100 – полностью закрыта
   */
  animateTranslate(modalState: ModalsStateEntry, percent: number) {
    const frameId = `animateTranslateFrame${modalState.id}`;

    cancelAnimationFrame(this.frameIds[frameId]);

    this.frameIds[frameId] = requestAnimationFrame(() => {
      setTransformStyle(modalState.innerElement, `translate3d(0, ${percent}%, 0)`);
    });
  }

  /* Устанавливает прозрачность для полупрозрачной подложки */
  setMaskOpacity(modalState: ModalsStateEntry, forceOpacity: number = null) {
    if (forceOpacity === null && this.props.history[0] !== modalState.id) {
      return;
    }

    cancelAnimationFrame(this.maskAnimationFrame);
    this.maskAnimationFrame = requestAnimationFrame(() => {
      if (this.maskElementRef.current) {
        const { translateY, translateYCurrent } = modalState;

        const opacity = forceOpacity === null ? 1 - (translateYCurrent - translateY) / (100 - translateY) || 0 : forceOpacity;
        this.maskElementRef.current.style.opacity = Math.max(0, Math.min(100, opacity)).toString();
      }
    });
  }

  render() {
    const { activeModal, exitingModal, enteringModal } = this.props;
    const { touchDown, dragging } = this.state;

    if (!activeModal && !exitingModal) {
      return null;
    }

    return (
      <TouchRootContext.Provider value={true}>
        <ModalRootContext.Provider value={this.getModalRootContext()}>
          <Touch
            vkuiClass={classNames(getClassName('ModalRoot', this.props.platform), {
              'ModalRoot--vkapps': this.props.configProvider.webviewType === WebviewType.VKAPPS,
              'ModalRoot--touched': touchDown,
              'ModalRoot--switching': !!(enteringModal || exitingModal),
            })}
            onMove={this.onTouchMove}
            onEnd={this.onTouchEnd}
            onScroll={this.onScroll}
          >
            <div
              vkuiClass="ModalRoot__mask"
              onClick={this.props.closeActiveModal}
              ref={this.maskElementRef}
            />
            <div vkuiClass="ModalRoot__viewport" ref={this.viewportRef}>
              {this.getModals().map((Modal) => {
                const modalId = getNavId(Modal.props, warn);
                if (modalId !== activeModal && modalId !== exitingModal) {
                  return null;
                }
                const modalState = { ...this.modalsState[modalId] };

                const isPage = modalState.type === ModalType.PAGE;
                const key = `modal-${modalId}`;

                return (
                  <FocusTrap
                    key={key}
                    getRootRef={(e) => this.modalsState[modalId].modalElement = e}
                    onClose={this.props.closeActiveModal}
                    timeout={this.timeout}
                    vkuiClass={classNames('ModalRoot__modal', {
                      'ModalRoot__modal--active': modalId === activeModal,
                      'ModalRoot__modal--prev': modalId === exitingModal,
                      'ModalRoot__modal--next': exitingModal && modalId === activeModal || modalId === enteringModal,

                      'ModalRoot__modal--dragging': dragging,

                      'ModalRoot__modal--expandable': isPage && modalState.expandable,
                      'ModalRoot__modal--expanded': isPage && modalState.expanded,
                      'ModalRoot__modal--collapsed': isPage && modalState.collapsed,
                    })}
                    restoreFocus={false}
                  >{Modal}</FocusTrap>
                );
              })}
            </div>
          </Touch>
        </ModalRootContext.Provider>
      </TouchRootContext.Provider>
    );
  }
}

export const ModalRootTouch = withContext(withPlatform(withDOM<ModalRootProps>(
  withModalManager(initModal)(ModalRootTouchComponent),
)), ConfigProviderContext, 'configProvider');

/**
 * Инициализирует модалку перед анимацией открытия
 */
function initModal(modalState: ModalsStateEntry) {
  switch (modalState.type) {
    case ModalType.PAGE:
      modalState.settlingHeight = modalState.settlingHeight || MODAL_PAGE_DEFAULT_PERCENT_HEIGHT;
      return initPageModal(modalState);
    case ModalType.CARD:
      return initCardModal(modalState);
    default:
      IS_DEV && warn('[initActiveModal] modalState.type is unknown');
  }
}

function initPageModal(modalState: ModalsStateEntry) {
  const { contentElement } = modalState;
  const contentHeight = (contentElement.firstElementChild as HTMLElement).offsetHeight;

  let prevTranslateY = modalState.translateY;

  modalState.expandable = contentHeight > contentElement.clientHeight || modalState.settlingHeight === 100;

  let collapsed = false;
  let expanded = false;
  let translateYFrom;
  let translateY;
  let expandedRange: TranslateRange;
  let collapsedRange: TranslateRange;
  let hiddenRange: TranslateRange;

  if (modalState.expandable) {
    translateYFrom = 100 - modalState.settlingHeight;

    const shiftHalf = translateYFrom / 2;
    const visiblePart = 100 - translateYFrom;

    expandedRange = [0, shiftHalf];
    collapsedRange = [shiftHalf, translateYFrom + visiblePart / 4];
    hiddenRange = [translateYFrom + visiblePart / 4, 100];

    collapsed = translateYFrom > 0;
    expanded = translateYFrom <= 0;
    translateY = translateYFrom;
  } else {
    const headerHeight = modalState.headerElement.offsetHeight;
    const height = contentHeight + headerHeight;

    translateYFrom = 100 - height / modalState.innerElement.parentElement.offsetHeight * 100;
    translateY = translateYFrom;

    expandedRange = [translateY, translateY + 25];
    collapsedRange = [translateY + 25, translateY + 25];
    hiddenRange = [translateY + 25, translateY + 100];
  }

  // Если модалка может открываться на весь экран, и новый сдвиг больше предыдущего, то откроем её на весь экран
  if (modalState.expandable && translateY > prevTranslateY || modalState.settlingHeight === 100) {
    translateY = 0;
  }

  modalState.expandedRange = expandedRange;
  modalState.collapsedRange = collapsedRange;
  modalState.hiddenRange = hiddenRange;
  modalState.translateY = translateY;
  modalState.translateYFrom = translateYFrom;
  modalState.collapsed = collapsed;
  modalState.expanded = expanded;
}

function initCardModal(modalState: ModalsStateEntry) {
  modalState.translateY = 0;
}
