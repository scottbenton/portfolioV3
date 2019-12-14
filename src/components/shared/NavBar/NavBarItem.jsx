import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "utils/theme-utils";

const BORDER_SIDE_CLASSES = {
  left: "half-border-left",
  right: "half-border-right",
  none: ""
};

NavBarItem.defaultProps = {
  className: ""
};
NavBarItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  className: PropTypes.string,
  borderSide: PropTypes.oneOf(Object.keys(BORDER_SIDE_CLASSES))
};

export function NavBarItem(props) {
  const { children, className, borderSide } = props;

  return (
    <div
      className={combineClasses([BORDER_SIDE_CLASSES[borderSide], className])}
    >
      {children}
    </div>
  );
}
