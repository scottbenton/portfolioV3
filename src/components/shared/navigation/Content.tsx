import React, { FunctionComponent } from "react";

export const Content: FunctionComponent = props => {
  const { children } = props;

  return <div className={"pt-16 overflow-auto absolute"}>{children}</div>;
};
