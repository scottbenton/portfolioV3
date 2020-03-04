import React, { FunctionComponent, useEffect } from "react";
import { FirebaseContext } from "./FirebaseContext";
import FIREBASE_CONFIG from "hidden/firebase-config.json";
import firebase, { User } from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/database";
import "firebase/storage";
import { APP_SETTINGS } from "config/app-settings";

firebase.initializeApp(FIREBASE_CONFIG);

export const FirebaseProvider: FunctionComponent = props => {
  const { children } = props;
  const { dbRoot } = APP_SETTINGS;

  const [user, setUser] = React.useState<User | undefined>();
  const [isAdmin, setIsAdmin] = React.useState(false);

  firebase.analytics();
  let googleSignInProvider = new firebase.auth.GoogleAuthProvider();

  let login = (callback?: (result: any) => void) => {
    if (googleSignInProvider) {
      firebase
        .auth()
        .signInWithPopup(googleSignInProvider)
        .then(result => {
          console.debug(result);
          if (callback) {
            callback(result);
          }
        });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        let database = firebase.database();
        database
          .ref(dbRoot + "/users/" + authUser.uid)
          .once("value")
          .then(snapshot => {
            let adminVal = snapshot.val();
            setIsAdmin(adminVal && adminVal.admin === true);
          });
        setUser(authUser);
      } else {
        setUser(undefined);
        setIsAdmin(false);
      }
    });
  }, [dbRoot]);

  let logout = () => firebase.auth().signOut();

  console.debug(user);

  return (
    <FirebaseContext.Provider value={{ login, logout, isAdmin }}>
      {children}
    </FirebaseContext.Provider>
  );
};
