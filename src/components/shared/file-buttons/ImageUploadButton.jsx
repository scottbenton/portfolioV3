import React from "react";
import { FileUploadButton } from "./FileUploadButton";

export function ImageUploadButton(props) {
  const { handleFile, ...otherProps } = props;

  const handleFileUpload = file => {
    if (file.type.includes("image") && typeof handleFile === "function") {
      handleFile(file);
    }
  };

  return <FileUploadButton handleFile={handleFileUpload} {...otherProps} />;
}
