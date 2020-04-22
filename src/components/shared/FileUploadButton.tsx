import React, {FunctionComponent} from 'react';
import { Button, ButtonProps } from './Button';

interface FileUploadButtonProps extends ButtonProps {
  handleFile: (file: File) => void
}

export const FileUploadButton: FunctionComponent<FileUploadButtonProps> = props => {
  const {children, handleFile, ...buttonProps} = props;

  const inputRef = React.useRef<any>();

  const handleClick = () => {
    if(inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = (evt: any) => {
    const file = evt.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <>
      <input 
        ref={inputRef}
        type={"file"}
        className={"hidden"}
        onChange={handleFileUpload}
      />
      <Button onClick={handleClick} {...buttonProps}>
        {children}
      </Button>
    </>
  )
};