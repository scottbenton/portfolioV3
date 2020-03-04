import React, { FunctionComponent } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

const converter = new Showdown.Converter({});

type MarkdownDisplayProps = {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
};

export const MarkdownDisplay: FunctionComponent<MarkdownDisplayProps> = props => {
  const { value, onChange, isEditing, className } = props;

  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  const [mdHtml, setMdHtml] = React.useState("");

  if (isEditing) {
    return (
      <div className={"w-full h-64 p-4"}>
        <ReactMde
          value={value || ""}
          onChange={onChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </div>
    );
  } else {
    return <>{converter.makeHtml(value)}</>;
  }
};
