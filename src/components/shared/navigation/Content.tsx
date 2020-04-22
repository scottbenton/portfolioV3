import React, { FunctionComponent, Ref, ReactNode } from "react";

interface ContentProps {
  navBarHeight: number;
  children: ReactNode;
  contentRef: Ref<HTMLDivElement>;
}

export const Content: FunctionComponent<ContentProps> = props => {
  const { children, navBarHeight, contentRef } = props;

  return (
    <>
      <div style={{ minHeight: navBarHeight }} />
      <div
        className={"overflow-auto w-full flex-grow"}
        style={{ scrollBehavior: "smooth" }}
        ref={contentRef}
      >
        {children}
      </div>
    </>
  );
};
