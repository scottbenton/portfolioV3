import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { NavBar } from "components/shared/NavBar";
import { NavBarContent } from "components/portfolio/navigation/NavBarContent";
import { getClassesFromThemeColor } from "utils/theme-utils";
import { LandingPage } from "pages/LandingPage";
import { LoginPage } from "pages/LoginPage";

import { firebaseInstance } from "api/firebase-instance";
import { FirebaseProvider } from "api/FirebaseContext";

function App() {
  return (
    <FirebaseProvider value={firebaseInstance}>
      <BrowserRouter>
        <NavBar className={"border-t-4 border-primary-main"}>
          <NavBarContent />
        </NavBar>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
