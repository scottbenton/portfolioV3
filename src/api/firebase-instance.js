import { FIREBASE_CONFIG } from "hidden/firebase.config";
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/analytics");

let firebaseInstance = firebase.initializeApp(FIREBASE_CONFIG);
firebase.analytics();

export { firebaseInstance };
