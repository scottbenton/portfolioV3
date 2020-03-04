import React, { FunctionComponent, useEffect } from "react";
import { SECTION_PROPS } from "sections";
import { TextDisplay } from "components/shared/TextDisplay";
import { FileUploadButton } from "components/shared/FileUploadButton";
import { MdInsertPhoto } from "react-icons/md";
import { Card } from "components/shared/Card";
import { ButtonVariants } from "components/shared/Button";
import { ThemeColors } from "utils/theme-utils";
import { MarkdownDisplay } from "components/shared/MarkdownDisplay";

export const AboutSection: FunctionComponent<SECTION_PROPS> = props => {
  const { isEditing, data, updateData, getFileURL, uploadFile } = props;

  const [splashImageURL, setSplashImageURL] = React.useState("");
  const [profileImageURL, setProfileImageURL] = React.useState("");

  useEffect(() => {
    const getFile = async () => {
      setSplashImageURL(await getFileURL(data["splashImage"]));
      setProfileImageURL(await getFileURL(data["profileImage"]));
    };
    getFile();
  }, [data, getFileURL]);

  return (
    <div className={"w-full flex flex-col bg-paper-main "}>
      <div
        className={
          "bg-grey-500 pt-32 md:pt-64 overflow-hidden bg-cover bg-center bg-fixed text-white flex overflow-visible relative"
        }
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(" +
            splashImageURL +
            ")"
        }}
      >
        {isEditing && (
          <FileUploadButton
            handleFile={file =>
              uploadFile(file, () => updateData("splashImage", file.name))
            }
            className={"m-2 z-10 top-0 right-0 absolute"}
            icon={MdInsertPhoto}
          />
        )}
        <Card
          className={
            "flex flex-col p-4 px-8 lg:px-16 inline-flex items-center shadow-2xl -mb-24 z-10"
          }
        >
          {profileImageURL && (
            <div
              className={
                "h-32 w-32 shadow-inner rounded-full overflow-hidden bg-center bg-cover"
              }
              style={{ backgroundImage: "url(" + profileImageURL + ")" }}
            />
          )}
          {isEditing && (
            <FileUploadButton
              handleFile={file =>
                uploadFile(file, () => updateData("profileImage", file.name))
              }
              variant={ButtonVariants.filled}
              color={ThemeColors.primary}
            >
              Upload Profile Image
            </FileUploadButton>
          )}
          <TextDisplay
            value={data["title"]}
            onChange={val => updateData("title", val)}
            isEditing={isEditing}
            component={"h1"}
            className={"text-center"}
          />
          <TextDisplay
            value={data["subtitle"]}
            onChange={val => updateData("subtitle", val)}
            isEditing={isEditing}
            component={"h2"}
            className={"text-center"}
          />
        </Card>
      </div>

      <div className={"pt-32 w-full flex flex-col max-w-4xl mx-auto"}>
        <TextDisplay
          value={data["header"]}
          onChange={val => updateData("header", val)}
          isEditing={isEditing}
          component={"h3"}
          className={"self-center"}
        />
        <MarkdownDisplay
          value={data["about"]}
          onChange={val => updateData("about", val)}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};
