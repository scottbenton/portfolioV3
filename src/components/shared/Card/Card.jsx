import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "utils/theme-utils";

Card.defaultProps = {
  className: ""
};
Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  className: PropTypes.string
};

export function Card(props) {
  const { children, className } = props;

  return (
    <div
      className={combineClasses([
        "rounded bg-paper-main text-paper-contrastText p-4 rounded-lg mx-auto shadow-md",
        className
      ])}
    >
      {children}
    </div>
  );
}
