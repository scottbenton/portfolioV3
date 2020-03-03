import { createContext } from "react";

interface FirebaseContextInterface {
  login?: (callback: (result: any) => void) => void;
  logout?: () => void;
  isAdmin?: Boolean;
}

export const FirebaseContext = createContext<FirebaseContextInterface>({});
