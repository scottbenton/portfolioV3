import React, { useContext } from "react";

export const FirebaseContext = React.createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ value, children }) => (
  <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
);
