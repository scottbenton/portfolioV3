import React from "react";
import PropTypes from "prop-types";
import { combineClasses } from "utils/theme-utils";
import { useCurrentUser } from "api/UserContext";
import { ImageUploadButton } from "../file-buttons/ImageUploadButton";

Card.defaultProps = {
  className: ""
};
Card.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]),
  image: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  className: PropTypes.string
};

export function Card(props) {
  const { header, image, uploadImage, children, className } = props;
  const { isAdmin } = useCurrentUser();

  return (
    <div
      className={combineClasses([
        "rounded bg-paper-main text-paper-contrastText rounded-lg mx-auto shadow-md",
        className
      ])}
    >
      {header && <div className={"p-4"}>{header}</div>}

      {image && <img src={image} alt={""} />}
      {isAdmin && uploadImage && (
        <ImageUploadButton handleFile={uploadImage}>
          Upload Image
        </ImageUploadButton>
      )}

      <div className={"p-4"}>{children}</div>
    </div>
  );
}
