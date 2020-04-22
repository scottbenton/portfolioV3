import React, { FunctionComponent } from "react";
import { combineClasses } from "utils/theme-utils";

type CardProps = {
  className?: string;
};

export const Card: FunctionComponent<CardProps> = props => {
  const { children, className } = props;

  return (
    <div
      className={combineClasses([
        className,
        "bg-paper-main text-paper-contrastText rounded-lg mx-auto shadow-md"
      ])}
    >
      {children}
    </div>
  );
};
