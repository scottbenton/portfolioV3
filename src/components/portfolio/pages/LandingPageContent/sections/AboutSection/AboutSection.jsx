import React from "react";
import "./styles.css";
import { Typography } from "components/shared/Typography/Typography";
import { EditText } from "components/portfolio/shared/EditText";
import { EditMarkdown } from "components/portfolio/shared/EditMarkdown";

export function AboutSection(props) {
  const { content, handleEdit } = props;

  return (
    <div className={"p-2 bg-paper-main text-paper-contrastText"}>
      <div className={"mx-auto max-w-4xl p-8 w-full"}>
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
          value={content.about || ""}
          handleChange={val => handleEdit("about", val)}
        >
          {content.about || ""}
        </EditMarkdown>
      </div>
    </div>
  );
}
