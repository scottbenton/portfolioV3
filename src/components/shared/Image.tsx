import React, { FunctionComponent } from "react";
import { combineClasses } from "utils/theme-utils";
import { FileUploadButton } from "components/shared/FileUploadButton";
import { MdImage } from "react-icons/md";

type ImageProps = {
  imageLink?: string;
  handleImageUpload: (file: File) => void;
  className?: string;
  isEditing: boolean;
};

export const Image: FunctionComponent<ImageProps> = props => {
  const { imageLink, handleImageUpload, className, isEditing } = props;

  return (
    <div
      className={combineClasses([
        className,
        "relative",
        isEditing ? "bg-gray-500 p-6" : ""
      ])}
    >
      <img
        src={imageLink}
        alt={""}
        className={combineClasses([className, "w-full"])}
      />
      {isEditing && (
        <FileUploadButton
          icon={MdImage}
          handleFile={handleImageUpload}
          className={"top-0 right-0 m-2 absolute"}
        />
      )}
    </div>
  );
};
