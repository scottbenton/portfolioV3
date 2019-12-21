import React from "react";
import "./styles.css";

import { Typography } from "components/shared/Typography";
import { EditText } from "components/portfolio/shared/EditText";
import { Card } from "components/shared/Card/Card";
import { useCurrentUser } from "api/UserContext";
import { Button } from "components/shared/Button/Button";
import { EditMarkdown } from "components/portfolio/shared/EditMarkdown";
import {
  faPlus,
  faTrash,
  faArrowUp,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { TextInput } from "components/shared/inputs/TextInput";

export function ProjectSection(props) {
  const { content, fileURLs, handleFileUpload, handleEdit, handlePush } = props;
  const { isAdmin } = useCurrentUser();

  const handleProjectEdit = (projectKey, fieldKey, fieldValue) => {
    let newProjects = { ...content.projects };
    let newProject = { ...newProjects[projectKey] };
    newProject[fieldKey] = fieldValue;
    newProjects[projectKey] = newProject;
    handleEdit("projects", newProjects);
  };

  const handleProjectDelete = projectKey => {
    let newProjects = { ...content.projects };
    delete newProjects[projectKey];
    handleEdit("projects", newProjects);
  };

  const handleProjectReorder = (projectKey, direction) => {
    let newProjects = { ...content.projects };
    const currentProject = { ...newProjects[projectKey] };
    const newIndex = currentProject.index + direction;

    if (newIndex >= 0 || newIndex < Object.values(newProjects).length) {
      const flippedProjectKey = Object.keys(newProjects).find(
        projectKey => newProjects[projectKey].index === newIndex
      );
      newProjects[flippedProjectKey].index = currentProject.index;
      newProjects[projectKey].index = newIndex;
      handleEdit("projects", newProjects);
    }
  };

  return (
    <div className={"p-2"}>
      <div className={"mx-auto max-w-2xl p-8 flex flex-col"}>
        <EditText
          value={content.header}
          handleChange={val => handleEdit("header", val)}
          className={"justify-center"}
        >
          <Typography variant="h3" className={"text-center"}>
            {content.header || ""}
          </Typography>
        </EditText>

        {content.projects &&
          Object.keys(content.projects)
            .sort(
              (projectA, projectB) =>
                content.projects[projectA].index -
                content.projects[projectB].index
            )
            .map(projectKey => {
              const project = content.projects[projectKey];

              return (
                <Card
                  className={
                    "my-4 border-t-4 bg-paper-main text-paper-contrastText border-primary-main"
                  }
                  header={
                    <EditText
                      value={project.title}
                      handleChange={val =>
                        handleProjectEdit(projectKey, "title", val)
                      }
                    >
                      <Typography variant={"h4"}>
                        {project.title || ""}
                      </Typography>
                    </EditText>
                  }
                  image={fileURLs[projectKey]}
                  uploadImage={image => handleFileUpload(image, projectKey)}
                  key={projectKey}
                >
                  <EditMarkdown
                    value={project.about || ""}
                    handleChange={val =>
                      handleProjectEdit(projectKey, "about", val)
                    }
                  >
                    {project.about || ""}
                  </EditMarkdown>
                  {isAdmin && (
                    <TextInput
                      value={project.codeLink}
                      setValue={val =>
                        handleProjectEdit(projectKey, "codeLink", val)
                      }
                    />
                  )}
                  <div className={"flex flex-wrap"}>
                    {project.codeLink && (
                      <Button className={"mx-2 mt-4"} link={project.codeLink}>
                        View the Code
                      </Button>
                    )}
                    {isAdmin && (
                      <TextInput
                        value={project.link}
                        setValue={val =>
                          handleProjectEdit(projectKey, "link", val)
                        }
                      />
                    )}
                    {project.link && (
                      <Button
                        className={"mx-2 mt-4"}
                        variant="OUTLINED"
                        link={project.link}
                      >
                        Visit the Project
                      </Button>
                    )}
                  </div>
                  {isAdmin && (
                    <div className={"flex"}>
                      <Button
                        icon={faTrash}
                        onClick={() => {
                          handleProjectDelete(projectKey);
                        }}
                      />
                      <Button
                        icon={faArrowUp}
                        onClick={() => {
                          handleProjectReorder(projectKey, -1);
                        }}
                      />
                      <Button
                        icon={faArrowDown}
                        onClick={() => {
                          handleProjectReorder(projectKey, 1);
                        }}
                      />
                    </div>
                  )}
                </Card>
              );
            })}
        {isAdmin && (
          <Button
            icon={faPlus}
            onClick={() => {
              handlePush("projects");
            }}
          />
        )}
      </div>
    </div>
  );
}
