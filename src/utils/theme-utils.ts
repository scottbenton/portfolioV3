export enum ThemeColors {
  primary = "primary",
  secondary = "secondary",
  default = "default"
}

export function getColorClasses(color: ThemeColors) {
  switch (color) {
    case ThemeColors.primary:
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
    case ThemeColors.secondary:
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

export function combineClasses(classArr: Array<string | undefined>) {
  return (
    classArr.reduce(
      (acc: string | undefined, nextClass: string | undefined) => {
        if (!nextClass) return acc;
        return acc ? acc + " " + nextClass : nextClass;
      }
    ) || ""
  );
}
