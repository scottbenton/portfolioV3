import React, { Ref, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { LoginPage } from "./portfolio/LoginPage";
import { SECTIONS } from "sections";
import { NavBar } from "components/shared/navigation/NavBar";
import { Content } from "components/shared/navigation/Content";
import { Button, ButtonVariants } from "./shared/Button";
import { ThemeColors } from "utils/theme-utils";
import { MdSave, MdEdit } from "react-icons/md";
import { useFirebase } from "providers/FirebaseProvider";
import { SectionWrapper } from "sections/SectionWrapper";

type refArrayType = {
  [key: string]: any;
};

export function App() {
  const [isEditing, setIsEditing] = React.useState(false);
  const { isAdmin } = useFirebase();
  const contentRef = React.useRef<any>();
  const [selectedSectionKey, setSelectedSectionKey] = React.useState(
    SECTIONS.about.dbKey
  );

  const [refs, setRefs] = React.useState<refArrayType>({});
  const updateRefByKey = React.useCallback((key: string, value: Ref<any>) => {
    setRefs(oldRefs => {
      let newRefs = { ...oldRefs };
      newRefs[key] = value;
      return newRefs;
    });
  }, []);

  const [navBarHeight, setNavBarHeight] = React.useState(0);

  const scrollSectionIntoView = (sectionKey: string) => {
    const container = contentRef.current;
    if (refs[sectionKey] && refs[sectionKey].offsetTop && container) {
      let top = refs[sectionKey].offsetTop - container.offsetTop;
      if (container) {
        container.scrollTo(0, top);
      }
    }
  };

  useLayoutEffect(() => {
    const scrollListener = (evt: any) => {
      if (contentRef.current) {
        if (evt.target) {
          const {
            scrollHeight,
            scrollTop,
            clientHeight,
            offsetTop
          } = evt.target;
          const isUserAtBottom = scrollHeight - scrollTop === clientHeight;

          if (isUserAtBottom) {
            setSelectedSectionKey(SECTIONS.contact.dbKey);
          } else {
            let closestSectionKey = SECTIONS.about.dbKey;
            let refKeys = Object.keys(refs);
            for (let i = 0; i < refKeys.length; i++) {
              if (refs[refKeys[i]].offsetTop - offsetTop <= scrollTop) {
                closestSectionKey = refKeys[i];
              } else {
                break;
              }
            }
            setSelectedSectionKey(closestSectionKey);
          }
        }
      }
    };

    let refTarget: HTMLDivElement;

    if (contentRef.current) {
      refTarget = contentRef.current;
      contentRef.current.addEventListener("scroll", scrollListener, {
        passive: true
      });
    }
    return () => {
      if (refTarget) {
        refTarget.removeEventListener("scroll", scrollListener);
      }
    };
  }, [contentRef, refs]);

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <NavBar
            setNavBarHeight={setNavBarHeight}
            scrollSectionIntoView={scrollSectionIntoView}
            selectedSectionKey={selectedSectionKey}
          />
          <Content navBarHeight={navBarHeight} contentRef={contentRef}>
            {Object.values(SECTIONS).map((section, index) => (
              <SectionWrapper
                key={index}
                section={section}
                isEditing={isEditing}
                updateRefByKey={updateRefByKey}
              />
            ))}
          </Content>
        </Route>
      </Switch>
      {isAdmin && (
        <Button
          variant={ButtonVariants.filled}
          color={ThemeColors.secondary}
          onClick={() => setIsEditing(prevEditing => !prevEditing)}
          icon={isEditing ? MdSave : MdEdit}
          className={
            "fixed bottom-0 right-0 mb-4 mr-4 p-4 shadow-xl z-40 overflow-visible"
          }
        />
      )}
    </>
  );
}
