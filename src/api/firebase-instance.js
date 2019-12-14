import { FIREBASE_CONFIG } from "hidden/firebase.config";
const firebase = require("firebase/app");
require("firebase/auth");

let firebaseInstance = firebase.initializeApp(FIREBASE_CONFIG);

export { firebaseInstance };
