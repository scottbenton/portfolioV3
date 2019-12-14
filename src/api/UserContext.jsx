import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const useCurrentUser = () => {
  const [user, setUser] = React.useState();
  let isAdmin = user && user.admin;

  firebase.auth().onAuthStateChanged(authuser => {
    if (authuser) {
      let database = firebase.database();
      database
        .ref("admins/" + authuser.uid)
        .once("value")
        .then(snapshot => {
          let adminVal = snapshot.val();
          if (adminVal) {
            authuser.admin = true;
          }
          setUser(authuser);
        });
    } else {
      setUser();
    }
  });

  return { user, isAdmin };
};
