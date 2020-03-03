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

export function App() {
  const [isEditing, setIsEditing] = React.useState(false);
  const { isAdmin } = useFirebase();
  return (
    <>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <NavBar />
          <Content>
            {Object.values(SECTIONS).map((section, index) => {
              const { component } = section;
              return React.createElement(component, {
                key: index,
                isEditing,
                section
              });
            })}
          </Content>
        </Route>
      </Switch>
      {isAdmin && (
        <Button
          variant={ButtonVariants.filled}
          color={ThemeColors.secondary}
          onClick={() => setIsEditing(prevEditing => !prevEditing)}
          icon={isEditing ? MdSave : MdEdit}
          className={"fixed bottom-0 right-0 mb-4 mr-4 p-4 shadow-xl"}
        />
      )}
    </>
  );
}
