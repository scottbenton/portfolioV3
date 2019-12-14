import React from "react";
import "./styles.css";
import { ImageUploadButton } from "components/shared/file-buttons/ImageUploadButton";
import { Typography } from "components/shared/Typography";
import { EditText } from "components/portfolio/shared/EditText";
import { Button } from "components/shared/Button/Button";
import { FileUploadButton } from "components/shared/file-buttons/FileUploadButton";

export function SplashSection(props) {
  const { fileURLs, content, handleEdit, handleFileUpload, isAdmin } = props;

  const { resume, splashBackground } = fileURLs;

  return (
    <>
      <div
        className={
          "bg-gray-500 pt-32 md:pt-64 pb-16 relative splash-image overflow-hidden"
        }
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(" +
            splashBackground +
            ")"
        }}
      >
        {isAdmin && (
          <ImageUploadButton
            className={"absolute top-0 right-0 m-2"}
            variant={"FILLED"}
            color={"primary"}
            handleFile={image => handleFileUpload(image, "splashBackground")}
          >
            {splashBackground ? "Update Background" : "Add a Background"}
          </ImageUploadButton>
        )}
        <div className={"text-center m-2 md:mx-16 text-white flex flex-col"}>
          <EditText
            value={content.name}
            handleChange={val => handleEdit("name", val)}
          >
            <Typography variant="h1" className={"flex-grow"}>
              {content.name || ""}
            </Typography>
          </EditText>
          <EditText
            value={content.subtitle}
            handleChange={val => handleEdit("subtitle", val)}
          >
            <Typography variant="h2" className={"flex-grow"}>
              {content.subtitle || ""}
            </Typography>
          </EditText>
          {resume && (
            <div className={"m-4"}>
              <Button
                className={"py-4 px-8 text-xl"}
                variant={"FILLED"}
                color={"primary"}
                link={resume}
              >
                Download my Resume
              </Button>
            </div>
          )}
          {isAdmin && (
            <div className={"m-4"}>
              <FileUploadButton
                className={"m-2"}
                variant={"FILLED"}
                color={"primary"}
                handleFile={resume => handleFileUpload(resume, "resume")}
              >
                {resume ? "Update Resume" : "Add Resume"}
              </FileUploadButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
