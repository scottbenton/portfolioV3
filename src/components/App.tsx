import React from "react";
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

export function App() {
  const [isEditing, setIsEditing] = React.useState(false);
  const { isAdmin } = useFirebase();

  const [navBarHeight, setNavBarHeight] = React.useState(0);
  return (
    <>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <NavBar setNavBarHeight={setNavBarHeight} />
          <Content navBarHeight={navBarHeight}>
            {Object.values(SECTIONS).map((section, index) => (
              <SectionWrapper
                key={index}
                section={section}
                isEditing={isEditing}
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
