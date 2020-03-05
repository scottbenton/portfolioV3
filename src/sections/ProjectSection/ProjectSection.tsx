import React, { FunctionComponent, useEffect } from "react";
import { SECTION_PROPS } from "sections";
import { TextDisplay } from "components/shared/TextDisplay";
import { Card } from "components/shared/Card";
import { Button, ButtonVariants } from "components/shared/Button";
import {
  MdAdd,
  MdArrowUpward,
  MdDelete,
  MdArrowDownward
} from "react-icons/md";
import { ThemeColors } from "utils/theme-utils";
import { MarkdownDisplay } from "components/shared/MarkdownDisplay";
import { Link } from "components/shared/Link";
import { Image } from "components/shared/Image";

type projectType = {
  projectName?: string;
  projectImage?: string;
  description?: string;
  codeLink?: string;
  prodLink?: string;
};

type projectImageMapType = {
  [key: string]: string;
};

export const ProjectSection: FunctionComponent<SECTION_PROPS> = props => {
  const { data, updateData, isEditing, getFileURL, uploadFile } = props;

  const { projects } = data;

  const [projectImageMap, setProjectImageMap] = React.useState<
    projectImageMapType
  >({});

  const handleProjectEdit = (
    projectIndex: number,
    fieldKey: string,
    fieldValue: any
  ) => {
    let newProjects = [...projects];
    let newProject = { ...newProjects[projectIndex] };
    newProject[fieldKey] = fieldValue;
    newProjects[projectIndex] = newProject;
    updateData("projects", newProjects);
  };

  const handleProjectDelete = (projectIndex: number) => {
    let newProjects = [...projects];
    newProjects.splice(projectIndex, 1);
    updateData("projects", newProjects);
  };

  const handleProjectSwap = (projectIndexA: number, projectIndexB: number) => {
    let newProjects = [...projects];
    if (
      projectIndexA >= 0 &&
      projectIndexA < newProjects.length &&
      projectIndexB >= 0 &&
      projectIndexB < newProjects.length
    ) {
      const tempProject = { ...newProjects[projectIndexB] };
      newProjects[projectIndexB] = newProjects[projectIndexA];
      newProjects[projectIndexA] = tempProject;

      updateData("projects", newProjects);
    }
  };

  const handleProjectAdd = () => {
    let handleProjects = [...projects];
    handleProjects.push({});
    updateData("projects", handleProjects);
  };

  useEffect(() => {
    if (Array.isArray(projects)) {
      const handleUrlGet = async (project: projectType, index: number) => {
        const filename = project.projectImage;
        if (filename && !projectImageMap[filename]) {
          const url = await getFileURL(filename);
          console.debug(filename);
          setProjectImageMap(prevMap => {
            let newMap = { ...prevMap };

            newMap[filename] = url;
            return newMap;
          });
        }
      };

      projects.forEach((project: projectType, index: number) =>
        handleUrlGet(project, index)
      );
    }
  }, [projects, getFileURL, projectImageMap]);

  return (
    <div className={"w-full flex flex-col py-8 px-4"}>
      <TextDisplay
        value={data["header"]}
        onChange={val => updateData("header", val)}
        isEditing={isEditing}
        component={"h3"}
        className={"self-center"}
      />

      {Array.isArray(projects) &&
        projects.map((project: projectType, index: number) => {
          const {
            projectName,
            projectImage,
            description,
            codeLink,
            prodLink
          } = project;

          return (
            <Card
              key={index}
              className={
                "mx-2 my-4 w-full max-w-xl border-t-4 border-primary-main"
              }
            >
              <div className={"p-4"}>
                <TextDisplay
                  value={projectName || ""}
                  onChange={val => handleProjectEdit(index, "projectName", val)}
                  isEditing={isEditing}
                  component={"h4"}
                />
              </div>
              <Image
                imageLink={projectImage ? projectImageMap[projectImage] : ""}
                handleImageUpload={file =>
                  uploadFile(file, () =>
                    handleProjectEdit(index, "projectImage", file.name)
                  )
                }
                isEditing={isEditing}
              />
              <div className={"p-4"}>
                <MarkdownDisplay
                  value={description || ""}
                  onChange={val => handleProjectEdit(index, "description", val)}
                  isEditing={isEditing}
                />
                <div className={"flex flex-wrap mt-4"}>
                  <Link
                    href={codeLink || ""}
                    isEditing={isEditing}
                    onChange={val => handleProjectEdit(index, "codeLink", val)}
                    className={"mr-2"}
                  >
                    View the Code
                  </Link>
                  <Link
                    href={prodLink || ""}
                    isEditing={isEditing}
                    onChange={val => handleProjectEdit(index, "prodLink", val)}
                    variant={ButtonVariants.outlined}
                  >
                    Visit the Project
                  </Link>
                </div>
                {isEditing && (
                  <div className={"flex flex-wrap "}>
                    <Button
                      icon={MdArrowUpward}
                      onClick={() => handleProjectSwap(index, index - 1)}
                    />
                    <Button
                      icon={MdArrowDownward}
                      onClick={() => handleProjectSwap(index, index + 1)}
                    />
                    <Button
                      icon={MdDelete}
                      onClick={() => handleProjectDelete(index)}
                    />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      {isEditing && (
        <div className={"flex self-center m-2"}>
          <Button
            icon={MdAdd}
            onClick={handleProjectAdd}
            color={ThemeColors.primary}
            variant={ButtonVariants.filled}
          />
        </div>
      )}
    </div>
  );
};
