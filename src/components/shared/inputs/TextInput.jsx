import React from "react";
import { combineClasses } from "utils/theme-utils";

TextInput.defaultProps = {
  value: "",
  setValue: () => {},
  className: ""
};

export function TextInput(props) {
  const { value, setValue, className, ...inputProps } = props;

  return (
    <input
      className={combineClasses([
        className,
        "border border-gray-500 p-2 rounded-lg px-4 focus:border-secondary-main bg-paper-main text-paper-contrastText"
      ])}
      value={value}
      onChange={evt => setValue(evt.target.value)}
      {...inputProps}
    />
  );
}
