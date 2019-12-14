import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "utils/theme-utils";

NavBar.defaultProps = {
  className: ""
};
NavBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array
  ]).isRequired,
  className: PropTypes.string
};

export function NavBar(props) {
  const { children, className } = props;
  return (
    <nav
      className={combineClasses([
        className,
        "flex items-center justify-between shadow-lg fixed z-50 w-full bg-paper-main text-paper-contrastText"
      ])}
      style={{ height: 50 }}
    >
      {children}
    </nav>
  );
}
