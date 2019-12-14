import React from "react";
import "./styles.css";
// import { combineClasses } from "utils/theme-utils";

export function Typography(props) {
  const { className, variant, children } = props;

  switch (variant) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    case "h2":
      return <h2 className={className}>{children}</h2>;
    case "h3":
      return <h3 className={className}>{children}</h3>;
    case "h4":
      return <h4 className={className}>{children}</h4>;
    case "h5":
      return <h5 className={className}>{children}</h5>;
    case "h6":
      return <h6 className={className}>{children}</h6>;
    case "p":
      return <p className={className}>{children}</p>;
    default:
      return <span> {children}</span>;
  }
}
