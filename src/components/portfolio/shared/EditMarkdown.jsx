import React, { useEffect } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

import { faPen, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/shared/Button";

import { useCurrentUser } from "api/UserContext";
import { combineClasses } from "utils/theme-utils";

EditMarkdown.defaultProps = {
  className: ""
};
export function EditMarkdown(props) {
  const { children, value: initalValue, handleChange, className } = props;

  const { isAdmin } = useCurrentUser();

  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(initalValue);

  useEffect(() => {
    setValue(initalValue);
  }, [initalValue]);

  const mdParser = new MarkdownIt();

  const handleSave = () => {
    setEditing(false);
    if (typeof handleChange === "function") {
      handleChange(value);
    }
  };

  const renderedChildren = mdParser.render(children);

  return (
    <>
      {editing ? (
        <div
          className={combineClasses(["flex flex-wrap text-black", className])}
          style={{ flexBasis: "100%" }}
        >
          <MdEditor
            value={value}
            onChange={output => setValue(output.text)}
            renderHTML={text => mdParser.render(text)}
          />
          <Button icon={faSave} onClick={handleSave} />
          <Button icon={faTimes} onClick={() => setEditing(false)} />
        </div>
      ) : (
        <div
          className={combineClasses(["flex flex-wrap", className])}
          style={{ flexBasis: "100%" }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: renderedChildren
            }}
          />
          {isAdmin && <Button icon={faPen} onClick={() => setEditing(true)} />}
        </div>
      )}
    </>
  );
}
