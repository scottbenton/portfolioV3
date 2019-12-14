import React from "react";
import PropTypes from "prop-types";
import { Button } from "components/shared/Button";

FileUploadButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  handleFile: PropTypes.func
};

export function FileUploadButton(props) {
  const { children, handleFile, ...buttonProps } = props;

  const inputRef = React.createRef();

  const handleClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = evt => {
    const file = evt.target.files[0];
    if (file && typeof handleFile === "function") {
      handleFile(file);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />
      <Button onClick={handleClick} {...buttonProps}>
        {children}
      </Button>
    </>
  );
}
