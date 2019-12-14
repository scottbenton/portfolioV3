import React from "react";
import { FileUploadButton } from "./FileUploadButton";

export function PDFUploadButton(props) {
  const { handleFile, ...otherProps } = props;

  const handleFileUpload = file => {
    if (file.type.includes("pdf") && typeof handleFile === "function") {
      handleFile(file);
    }
  };

  return <FileUploadButton handleFile={handleFileUpload} {...otherProps} />;
}
