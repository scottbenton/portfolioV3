import React, { FunctionComponent, Ref } from "react";

type ContentProps = {
  navBarHeight: number;
  refProp: Ref<any>;
};

export const Content: FunctionComponent<ContentProps> = props => {
  const { children, navBarHeight, refProp } = props;

  return (
    <>
      <div style={{ minHeight: navBarHeight }} />
      <div
        className={"overflow-auto w-full flex-grow"}
        style={{ scrollBehavior: "smooth" }}
        ref={refProp}
      >
        {children}
      </div>
    </>
  );
};
