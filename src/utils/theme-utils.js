export const THEME_COLORS = ["primary", "secondary"];

export function getColorClasses(color) {
  switch (color) {
    case "primary":
      return {
        light: "bg-primary-light",
        lightText: "text-primary-light",
        lightBorder: "border-primary-light",
        main: "bg-primary-main",
        mainText: "text-primary-main",
        mainBorder: "border-primary-main",
        dark: "bg-primary-dark",
        darkText: "text-primary-dark",
        darkBorder: "border-primary-dark",
        contrastText: "text-primary-contrastText"
      };
    case "secondary":
      return {
        light: "bg-secondary-light",
        lightText: "text-secondary-light",
        lightBorder: "border-secondary-light",
        main: "bg-secondary-main",
        mainText: "text-secondary-main",
        mainBorder: "border-secondary-main",
        dark: "bg-secondary-dark",
        darkText: "text-secondary-dark",
        darkBorder: "border-secondary-dark",
        contrastText: "text-secondary-contrastText"
      };
    default:
      return {};
  }
}

export function combineClasses(classArr) {
  return classArr.reduce((accumulator, newClass) => {
    if (!newClass) return accumulator;
    return accumulator + " " + newClass;
  });
}
