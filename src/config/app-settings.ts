import { prodSettings } from "./prod-settings";
import { betaSettings } from "./beta-settings";
import { localSettings } from "./local-settings";

const prodEnvironments = ["scottbenton.dev"];
const localEnvironments = ["localhost"];

const getCorrectConfig = () => {
  const hostname = window.location.hostname;
  console.debug("HOSTNAME: " + hostname);
  if (prodEnvironments.find(env => env === hostname)) {
    console.debug("PROD");
    return prodSettings;
  } else if (localEnvironments.find(env => env === hostname)) {
    console.debug("LOCAL");
    return localSettings;
  } else {
    console.debug("BETA");
    return betaSettings;
  }
};

export const APP_SETTINGS = {
  dbRoot: "",
  ...getCorrectConfig()
};
