import React from "react";
import { useHistory } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { Card } from "components/shared/Card";
import { Button } from "components/shared/Button";
const firebase = require("firebase/app");
require("firebase/auth");

export function LoginPage(props) {
  let googleSignInProvider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();

  const handleLoginClick = () => {
    if (googleSignInProvider) {
      firebase
        .auth()
        .signInWithPopup(googleSignInProvider)
        .then(result => {
          history.push("/");
        });
    }
  };

  return (
    <div className={"h-full relative"}>
      <div className="center-in-screen mx-auto">
        <Card className={"max-w-md m-2 mx-auto text-center center p-6"}>
          <h1 className="text-2xl mb-8 font-bold">Edit the Portfolio</h1>
          <Button
            variant="OUTLINED"
            color="secondary"
            startIcon={faGoogle}
            onClick={handleLoginClick}
          >
            Admin Login
          </Button>
        </Card>
      </div>
    </div>
  );
}
