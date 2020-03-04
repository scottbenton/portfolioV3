import React, { FunctionComponent } from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

type MarkdownDisplayProps = {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
};

export const MarkdownDisplay: FunctionComponent<MarkdownDisplayProps> = props => {
  const { value, onChange, isEditing, className } = props;

  const MarkdownViewer = (props: ReactMarkdownProps) => (
    <ReactMarkdown {...props} />
  );

  if (isEditing) {
    return (
      <MdEditor
        value={value}
        onChange={output => onChange(output.text)}
        renderHTML={(text: string) => <MarkdownViewer source={text} />}
      />
    );
  } else {
    return <MarkdownViewer source={value} />;
  }
};
