import React from "react";
import PropTypes from "prop-types";
import {
  getColorClasses,
  combineClasses,
  THEME_COLORS
} from "utils/theme-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VARIANTS = {
  DEFAULT: color =>
    combineClasses([getColorClasses(color).mainText, "btn-default"]),
  FILLED: color =>
    combineClasses([
      getColorClasses(color).main,
      getColorClasses(color).contrastText,
      "shadow-md focus:shadow",
      "btn-filled hover:" + getColorClasses(color).dark
    ]),
  OUTLINED: color =>
    combineClasses([
      getColorClasses(color).mainText,
      getColorClasses(color).mainBorder,
      "btn-outlined border-2 shadow-md focus:shadow",
      "hover:" + getColorClasses(color).light
    ])
};

Button.defaultProps = {
  className: "",
  variant: "DEFAULT"
};
Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  onClick: PropTypes.func,
  color: PropTypes.oneOf(THEME_COLORS),
  startIcon: PropTypes.object,
  icon: PropTypes.object,
  endIcon: PropTypes.object
};

export function Button(props) {
  const {
    variant,
    color,
    className,
    children,
    onClick,
    startIcon,
    icon,
    endIcon,
    link
  } = props;

  const handleClick = evt => {
    evt.target.blur();
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <>
      {link ? (
        <a
          className={combineClasses([
            "btn ripple",
            VARIANTS[variant](color),
            className
          ])}
          href={link}
        >
          {startIcon && <FontAwesomeIcon className={"mr-2"} icon={startIcon} />}
          {icon ? <FontAwesomeIcon icon={icon} /> : children}
          {endIcon && <FontAwesomeIcon className={"ml-2"} icon={endIcon} />}
        </a>
      ) : (
        <button
          className={combineClasses([
            "btn ripple",
            VARIANTS[variant](color),
            className
          ])}
          onClick={handleClick}
        >
          {startIcon && <FontAwesomeIcon className={"mr-2"} icon={startIcon} />}
          {icon ? <FontAwesomeIcon icon={icon} /> : children}
          {endIcon && <FontAwesomeIcon className={"ml-2"} icon={endIcon} />}
        </button>
      )}
    </>
  );
}
