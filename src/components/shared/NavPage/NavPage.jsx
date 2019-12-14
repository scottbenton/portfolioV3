import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "utils/theme-utils";

NavPage.defaultProps = {
  className: ""
};

NavPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  className: PropTypes.string
};

export function NavPage(props) {
  const { children, className } = props;

  return (
    <div
      className={combineClasses(["flex-grow", className])}
      style={{ paddingTop: 50 }}
    >
      {children}
    </div>
  );
}
