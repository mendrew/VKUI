import { classNames } from "../../lib/classNames";
import { TappableProps, Tappable } from "../Tappable/Tappable";
import { HasChildren, HasComponent } from "../../types";
import "./ButtonBase.css";

export type ButtonBaseProps = TappableProps & HasChildren & HasComponent;

/**
 * @see https://vkcom.github.io/VKUI/#/ButtonBase
 */
export const ButtonBase = ({
  Component = "button",
  children,
  ...restProps
}: ButtonBaseProps) => {
  return (
    <Tappable
      focusVisibleMode="outside"
      {...restProps}
      Component={restProps.href ? "a" : Component}
      vkuiClass={classNames("ButtonBase")}
    >
      {children}
    </Tappable>
  );
};
