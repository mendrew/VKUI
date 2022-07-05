import { classNames } from "../../lib/classNames";
import { TappableProps, Tappable } from "../Tappable/Tappable";
import { HasChildren, HasComponent } from "../../types";
import { Spinner } from "../Spinner/Spinner";
import "./ButtonBase.css";

export interface ButtonBaseProps
  extends Omit<TappableProps, "size">,
    HasChildren,
    HasComponent {
  loading?: boolean;
}

/**
 * @see https://vkcom.github.io/VKUI/#/ButtonBase
 */
export const ButtonBase = ({
  Component = "button",
  loading = false,
  children,
  ...restProps
}: ButtonBaseProps) => {
  return (
    <Tappable
      focusVisibleMode="outside"
      {...restProps}
      Component={restProps.href ? "a" : Component}
      vkuiClass={classNames("ButtonBase", loading && "ButtonBase--loading")}
    >
      {loading && <Spinner size="small" vkuiClass="ButtonBase__spinner" />}
      <span vkuiClass="ButtonBase__in">{children}</span>
    </Tappable>
  );
};
