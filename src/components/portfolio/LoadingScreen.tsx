import React, { FunctionComponent, useEffect } from "react";
import { combineClasses } from "utils/theme-utils";

type LoadingScreenProps = {
  isLoading: boolean;
};

export const LoadingScreen: FunctionComponent<LoadingScreenProps> = props => {
  const { isLoading } = props;

  const [shadowsOn, setShadowsOn] = React.useState(true);
  const [unmounted, setUnmounted] = React.useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setShadowsOn(prevValue => !prevValue);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setUnmounted(true), 700);
    }
  }, [isLoading]);

  return (
    <>
      {!unmounted && (
        <div
          className={combineClasses([
            "w-full h-full absolute justify-center items-center bg-gray-200 flex z-50 transition-opacity duration-700 ease-in-out",
            isLoading ? "opacity-100" : "opacity-0"
          ])}
        >
          <div
            className={combineClasses([
              "absolute rotate-45 transform bg-white h-24 w-24 transition-shadow duration-700 ease-in-out",
              shadowsOn ? "shadow-2xl" : "shadow-xs"
            ])}
          ></div>
          <h1 className={"z-10 text-6xl"}>S</h1>
        </div>
      )}
    </>
  );
};
