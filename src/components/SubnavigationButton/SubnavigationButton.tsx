import * as React from "react";
import { HasComponent, HasChildren } from "../../types";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { hasReactNode } from "../../lib/utils";
import { ButtonBase, ButtonBaseProps } from "../ButtonBase/ButtonBase";
import { Icon16Dropdown } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { Caption } from "../Typography/Caption/Caption";
import { Subhead } from "../Typography/Subhead/Subhead";
import "./SubnavigationButton.css";

export interface SubnavigationButtonProps
  extends Omit<ButtonBaseProps, "size"> {
  size?: "m" | "l";
  selected?: boolean;
  /**
   * Размер шрифта. Этим свойством рекомендуется пользоваться, чтобы отрегулировать размер шрифта у кнопок в `<SubnavigationBar mode="fixed" />`
   */
  textLevel?: 1 | 2 | 3;
  /**
   * Рекомендуется использовать только иконки с размером 24
   */
  before?: React.ReactNode;
  /**
   * Рекомендуется использовать только `<Counter size="s" />` или `<Badge />`
   */
  after?: React.ReactNode;
  expandable?: boolean;
}

type SubnavButtonTypographyProps = Pick<SubnavigationButtonProps, "textLevel"> &
  HasComponent &
  HasChildren;

const SubnavigationButtonTypography = ({
  textLevel,
  ...restProps
}: SubnavButtonTypographyProps) => {
  if (textLevel === 1) {
    return <Subhead {...restProps} />;
  }

  return <Caption level={textLevel === 2 ? "1" : "2"} {...restProps} />;
};

/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */
export const SubnavigationButton = ({
  size = "m",
  selected,
  textLevel = 1,
  before,
  after,
  expandable,
  children,
  ...restProps
}: SubnavigationButtonProps) => {
  const platform = usePlatform();

  return (
    <ButtonBase
      {...restProps}
      hasActive={false}
      vkuiClass={classNames(
        getClassName("SubnavigationButton", platform),
        `SubnavigationButton--${size}`,
        selected && "SubnavigationButton--selected"
      )}
    >
      {hasReactNode(before) && (
        <span vkuiClass="SubnavigationButton__before">{before}</span>
      )}
      <SubnavigationButtonTypography
        textLevel={textLevel}
        vkuiClass="SubnavigationButton__label"
        Component="span"
      >
        {children}
      </SubnavigationButtonTypography>
      {hasReactNode(after) && (
        <span vkuiClass="SubnavigationButton__after">{after}</span>
      )}
      {expandable && (
        <Icon16Dropdown vkuiClass="SubnavigationButton__expandableIcon" />
      )}
    </ButtonBase>
  );
};
