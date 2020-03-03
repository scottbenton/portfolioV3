import React, { FunctionComponent } from "react";

type ContentProps = {
  navBarHeight: number;
};

export const Content: FunctionComponent<ContentProps> = props => {
  const { children, navBarHeight } = props;

  return (
    <>
      <div style={{ height: navBarHeight }} />
      <div className={"overflow-auto w-full flex-grow"}>{children}</div>
    </>
  );
};
