import React, { FunctionComponent, useLayoutEffect } from "react";
import { SECTIONS } from "sections";
import { Button, ButtonVariants } from "../Button";
import { ThemeColors } from "utils/theme-utils";
import { useFirebase } from "providers/FirebaseProvider";
import { MdSave, MdRemoveCircleOutline } from "react-icons/md";

type NavBarProps = {
  setNavBarHeight: (navBarHeight: number) => void;
};

export const NavBar: FunctionComponent<NavBarProps> = props => {
  const { setNavBarHeight } = props;

  const { logout, isAdmin } = useFirebase();
  const navBarRef = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const resizeListener = () => {
      if (navBarRef && navBarRef.current) {
        setNavBarHeight(navBarRef.current.offsetHeight);
      }
    };

    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.offsetHeight);
      window.addEventListener("resize", resizeListener);
    }
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [navBarRef, setNavBarHeight]);

  return (
    <div
      className={
        "w-full bg-white shadow-2xl flex flex-wrap items-center fixed z-50 overflow-visible"
      }
      ref={navBarRef}
    >
      {/* <Button
        className={"flex flex-wrap h-full rounded-none w-16"}
        onClick={() => {}}
        color={ThemeColors.default}
        variant={ButtonVariants.default}
        icon={MdMenu}
      /> */}
      <span
        className={
          "rubik text-3xl font-light my-2 order-1 flex-grow ml-2 sm:ml-8"
        }
      >
        Scott Benton
      </span>
      <div className={"order-3 lg:order-4"} style={{ flexBasis: "100%" }} />
      <div
        className={"flex order-4 lg:order-2 mx-auto lg:mx-0 overflow-x-auto"}
      >
        {Object.values(SECTIONS).map(({ label }, index) => (
          <Button
            key={index}
            onClick={() => {}}
            variant={ButtonVariants.default}
            color={ThemeColors.default}
            className={"my-2"}
            style={{ overflow: "-moz-hidden-unscrollable" }}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className={"flex flex-row order-2 lg:order-3 mr-2 sm:mr-8"}>
        <Button
          color={ThemeColors.primary}
          variant={ButtonVariants.filled}
          className={"ml-2 my-2"}
          onClick={() => {}}
          endIcon={MdSave}
        >
          Resume
        </Button>
        {isAdmin && (
          <Button
            color={ThemeColors.secondary}
            variant={ButtonVariants.filled}
            onClick={() => logout && logout()}
            className={"ml-2 p-2 my-2"}
            icon={MdRemoveCircleOutline}
          />
        )}
      </div>
    </div>
  );
};
