import React, { FunctionComponent, useLayoutEffect, useEffect } from "react";
import { SECTIONS } from "sections";
import { Button, ButtonVariants } from "../Button";
import { ThemeColors } from "utils/theme-utils";
import { useFirebase } from "providers/FirebaseProvider";
import { MdSave, MdRemoveCircleOutline } from "react-icons/md";
import firebase from "firebase/app";
import { APP_SETTINGS } from "config/app-settings";

type NavBarProps = {
  setNavBarHeight: (navBarHeight: number) => void;
  scrollSectionIntoView: (sectionKey: string) => void;
  selectedSectionKey: string;
};

export const NavBar: FunctionComponent<NavBarProps> = props => {
  const { setNavBarHeight, scrollSectionIntoView, selectedSectionKey } = props;

  const { logout, isAdmin } = useFirebase();
  const navBarRef = React.useRef<HTMLDivElement>(null);

  const [resumeLink, setResumeLink] = React.useState();

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

  useEffect(() => {
    const dbLocation = APP_SETTINGS.dbRoot + "/" + SECTIONS.about.dbKey;
    const setUrl = async (snapshot: any) => {
      const filename = snapshot.val();
      console.debug(filename);
      if (filename) {
        const url = await firebase
          .storage()
          .ref(dbLocation)
          .child(filename)
          .getDownloadURL();
        console.debug(url);
        setResumeLink(url);
      } else {
        console.debug("NO RESUME FOUND");
        setResumeLink(undefined);
      }
    };

    firebase
      .database()
      .ref(dbLocation + "/resume")
      .on("value", setUrl);
    return () => {
      firebase
        .database()
        .ref(dbLocation + "/resume")
        .off("value", setUrl);
    };
  }, []);

  return (
    <div
      className={
        "w-full bg-white shadow-2xl flex flex-wrap items-center fixed z-50 overflow-visible border-primary-main border-b-4"
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
        className={
          "flex order-4 lg:order-2 mx-auto lg:mx-0 overflow-x-auto self-end"
        }
      >
        {Object.values(SECTIONS).map(({ label, dbKey }, index) => (
          <Button
            key={index}
            onClick={() => scrollSectionIntoView(dbKey)}
            variant={
              selectedSectionKey === dbKey
                ? ButtonVariants.filled
                : ButtonVariants.default
            }
            color={
              selectedSectionKey === dbKey
                ? ThemeColors.primary
                : ThemeColors.default
            }
            className={
              "rounded-b-none py-2 pb-4 rounded-t-lg transition-colors ease-in-out duration-300 shadow-none"
            }
            style={{ overflow: "-moz-hidden-unscrollable" }}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className={"flex flex-row order-2 lg:order-3 mr-2 sm:mr-8"}>
        {resumeLink && (
          <Button
            color={ThemeColors.primary}
            variant={ButtonVariants.outlined}
            className={"ml-2 my-2"}
            link={resumeLink}
            endIcon={MdSave}
          >
            Resume
          </Button>
        )}
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
