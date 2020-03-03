import React, { FunctionComponent } from "react";
import { SECTIONS } from "sections";
import { Button, ButtonVariants } from "../Button";
import { ThemeColors } from "utils/theme-utils";
import { useFirebase } from "providers/FirebaseProvider";
import { MdSave, MdRemoveCircleOutline, MdMenu } from "react-icons/md";

export const NavBar: FunctionComponent = props => {
  const { logout, isAdmin } = useFirebase();

  console.debug(MdSave);
  return (
    <div className={"w-full bg-white shadow-xl flex flex-wrap items-center"}>
      {/* <Button
        className={"flex flex-wrap h-full rounded-none w-16"}
        onClick={() => {}}
        color={ThemeColors.default}
        variant={ButtonVariants.default}
        icon={MdMenu}
      /> */}
      <span className={"rubik text-3xl font-light my-2 order-1 flex-grow ml-8"}>
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
      <div className={"flex flex-row order-2 lg:order-3 mr-8"}>
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
