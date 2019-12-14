import React from "react";
import "./styles.css";

import { useCurrentUser } from "api/UserContext";
import { Typography } from "components/shared/Typography";
import { EditText } from "components/portfolio/shared/EditText";
import { EditMarkdown } from "components/portfolio/shared/EditMarkdown";
import { TextInput } from "components/shared/inputs/TextInput";
import { Button } from "components/shared/Button";

export function ContactSection(props) {
  const { fileURLs, content, handleEdit, handleFileUpload } = props;
  const { isAdmin } = useCurrentUser();

  return (
    <div className={"p-2 bg-paper-main text-paper-contrastText"}>
      <div className={"mx-auto max-w-md p-8 flex flex-col"}>
        <EditText
          value={content.header}
          handleChange={val => handleEdit("header", val)}
          className={"justify-center"}
        >
          <Typography variant="h3" className={"text-center"}>
            {content.header || ""}
          </Typography>
        </EditText>
        <EditMarkdown
          value={content.contact || ""}
          handleChange={val => handleEdit("contact", val)}
        >
          {content.contact || ""}
        </EditMarkdown>
        {isAdmin && (
          <TextInput
            value={content.email}
            setValue={val => handleEdit("email", val)}
          />
        )}
        {content.email && (
          <div className={"m-4 flex justify-center"}>
            <Button link={"mailto:" + content.email}>{content.email}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
