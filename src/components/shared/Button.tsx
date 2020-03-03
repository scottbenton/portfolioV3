import React, { FunctionComponent, CSSProperties } from "react";
import {
  ThemeColors,
  combineClasses,
  getColorClasses
} from "utils/theme-utils";

export enum ButtonVariants {
  filled = "filled",
  outlined = "outlined",
  default = "default"
}

export interface ButtonProps {
  color?: ThemeColors;
  variant?: ButtonVariants;
  className?: string;
  onClick?: () => void;
  link?: string;
  icon?: React.FunctionComponent<any>;
  startIcon?: React.FunctionComponent<any>;
  endIcon?: React.FunctionComponent<any>;
  children?: React.ReactNode;
  iconClasses?: string;
  style?: CSSProperties | undefined;
}

const VARIANT_CLASSES = {
  [ButtonVariants.default]: (color: ThemeColors) =>
    combineClasses([getColorClasses(color).mainText, "btn-default"]),
  [ButtonVariants.filled]: (color: ThemeColors) =>
    combineClasses([
      getColorClasses(color).main,
      getColorClasses(color).contrastText,
      "shadow-md focus:shadow",
      "btn-filled hover:" + getColorClasses(color).dark
    ]),
  [ButtonVariants.outlined]: (color: ThemeColors) =>
    combineClasses([
      getColorClasses(color).mainText,
      getColorClasses(color).mainBorder,
      "btn-outlined border-2 shadow-md focus:shadow",
      "hover:" + getColorClasses(color).light
    ])
};

export const Button: FunctionComponent<ButtonProps> = props => {
  const {
    variant,
    color,
    className,
    onClick,
    startIcon,
    icon,
    endIcon,
    link,
    children,
    iconClasses,
    style
  } = props;

  const handleClick = (evt: any) => {
    evt.target.blur();
    if(onClick) {
      onClick();
    }
  };

  const classes = combineClasses([
    className,
    VARIANT_CLASSES[variant || ButtonVariants.default](color || ThemeColors.default),
    "btn ripple"
  ]);

  const buttonIconClasses = combineClasses(["w-6 h-6 mx-auto", iconClasses]);
  const btnChildren = (
    <>
      {startIcon &&
        React.createElement(startIcon, {
          className: combineClasses(["mr-2", buttonIconClasses])
        })}
      {icon
        ? React.createElement(icon, { className: buttonIconClasses })
        : children}
      {endIcon &&
        React.createElement(endIcon, {
          className: combineClasses(["ml-2", buttonIconClasses])
        })}
    </>
  );

  if (link) {
    return (
      <a className={classes} href={link} style={style}>
        {btnChildren}
      </a>
    );
  } else {
    return (
      <button className={classes} onClick={handleClick} style={style}>
        {btnChildren}
      </button>
    );
  }
};

Button.defaultProps = {
  variant: ButtonVariants.default,
  color: ThemeColors.default,
  onClick: () => {}
};
