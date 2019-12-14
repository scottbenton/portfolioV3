import React, { useEffect } from "react";
import { TextInput } from "components/shared/inputs/TextInput";

import { faPen, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/shared/Button/Button";
import { useCurrentUser } from "api/UserContext";
import { combineClasses } from "utils/theme-utils";

EditText.defaultProps = {
  className: ""
};

export function EditText(props) {
  const { children, value: initalValue, handleChange, className } = props;
  const { isAdmin } = useCurrentUser();

  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(initalValue);

  useEffect(() => {
    setValue(initalValue);
  }, [initalValue]);

  const handleSave = () => {
    setEditing(false);
    if (typeof handleChange === "function") {
      handleChange(value);
    }
  };

  return (
    <>
      {editing ? (
        <div
          className={combineClasses(["flex flex-wrap", className])}
          style={{ flexBasis: "100%" }}
        >
          <TextInput value={value} setValue={setValue} />
          <Button icon={faSave} onClick={handleSave} />
          <Button icon={faTimes} onClick={() => setEditing(false)} />
        </div>
      ) : (
        <div
          className={combineClasses(["flex flex-wrap", className])}
          style={{ flexBasis: "100%" }}
        >
          {children}
          {isAdmin && <Button icon={faPen} onClick={() => setEditing(true)} />}
        </div>
      )}
    </>
  );
}
