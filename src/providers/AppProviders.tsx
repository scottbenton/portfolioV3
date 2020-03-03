import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./FirebaseProvider";

export const AppProviders: FunctionComponent = props => {
  const { children } = props;
  return (
    <FirebaseProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </FirebaseProvider>
  );
};
