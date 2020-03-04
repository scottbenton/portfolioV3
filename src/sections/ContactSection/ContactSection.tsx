import React, { FunctionComponent } from "react";
import { TextDisplay } from "components/shared/TextDisplay";
import { SECTION_PROPS } from "sections";
import { MarkdownDisplay } from "components/shared/MarkdownDisplay";

export const ContactSection: FunctionComponent<SECTION_PROPS> = props => {
  const { isEditing, data, updateData } = props;

  return (
    <div className={"bg-paper-main w-full flex flex-col items-center"}>
      <div className={"flex flex-col w-full max-w-lg px-4 py-8"}>
        <TextDisplay
          className={"self-center"}
          value={data["header"]}
          onChange={val => updateData("header", val)}
          isEditing={isEditing}
          component={"h3"}
        />
        <MarkdownDisplay
          isEditing={isEditing}
          value={data["description"]}
          onChange={val => updateData("description", val)}
        />
      </div>
    </div>
  );
};
