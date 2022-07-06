import * as React from "react";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase/ButtonBase";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { IOS } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import "./IconButton.css";

export interface IconButtonProps extends ButtonBaseProps {
  /**
   * @deprecated будет удалено в 5.0.0. Используйте `children`
   */
  icon?: React.ReactNode;
}

const warn = warnOnce("IconButton");

const IconButtonComponent = ({
  icon,
  sizeY,
  children,
  ...restProps
}: IconButtonProps) => {
  const platform = usePlatform();

  if (icon && process.env.NODE_ENV === "development") {
    warn(
      "Свойство icon устарело и будет удалено в 5.0.0. Используйте children"
    );
  }

  return (
    <ButtonBase
      {...restProps}
      activeEffectDelay={200}
      activeMode="background"
      vkuiClass={classNames(
        "IconButton",
        `IconButton--sizeY-${sizeY}`,
        platform === IOS && "IconButton--ios"
      )}
    >
      {icon || children}
    </ButtonBase>
  );
};

/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
export const IconButton = withAdaptivity(IconButtonComponent, {
  sizeY: true,
});

IconButton.displayName = "IconButton";
