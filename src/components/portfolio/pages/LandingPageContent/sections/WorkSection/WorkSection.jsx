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

export function WorkSection(props) {
  const { fileURLs, content, handleEdit, handleFileUpload, handlePush } = props;
  const { isAdmin } = useCurrentUser();

  const handleJobEdit = (jobKey, fieldKey, fieldValue) => {
    let newJobs = { ...content.jobs };
    let newJob = { ...newJobs[jobKey] };
    newJob[fieldKey] = fieldValue;
    newJobs[jobKey] = newJob;
    handleEdit("jobs", newJobs);
  };

  const handleJobDelete = jobKey => {
    let newJobs = { ...content.jobs };
    delete newJobs[jobKey];
    handleEdit("jobs", newJobs);
  };

  const handleJobReorder = (jobKey, direction) => {
    let newJobs = { ...content.jobs };
    const currentJob = { ...newJobs[jobKey] };
    const newIndex = currentJob.index + direction;

    if (newIndex >= 0 || newIndex < Object.values(newJobs).length) {
      const flippedJobKey = Object.keys(newJobs).find(
        jobKey => newJobs[jobKey].index === newIndex
      );
      newJobs[flippedJobKey].index = currentJob.index;
      newJobs[jobKey].index = newIndex;
      handleEdit("jobs", newJobs);
    }
  };

  return (
    <div className={"p-2"}>
      <div className={"mx-auto max-w-2xl p-8"}>
        <EditText
          value={content.header}
          handleChange={val => handleEdit("header", val)}
          className={"justify-center"}
        >
          <Typography variant="h3" className={"text-center"}>
            {content.header || ""}
          </Typography>
        </EditText>

        {content.jobs &&
          Object.keys(content.jobs)
            .sort(
              (jobA, jobB) =>
                content.jobs[jobA].index - content.jobs[jobB].index
            )
            .map(jobKey => {
              let job = content.jobs[jobKey];

              return (
                <Card
                  className={
                    "my-4 bg-paper-main text-paper-contrastText border-t-4 border-primary-main"
                  }
                  key={jobKey}
                >
                  <EditText
                    value={job.title}
                    handleChange={val => handleJobEdit(jobKey, "title", val)}
                  >
                    <Typography variant={"h4"}>{job.title || ""}</Typography>
                  </EditText>
                  <EditText
                    value={job.company}
                    handleChange={val => handleJobEdit(jobKey, "company", val)}
                  >
                    <Typography variant={"h5"}>{job.company || ""}</Typography>
                  </EditText>
                  <EditText
                    value={job.dateRange}
                    handleChange={val =>
                      handleJobEdit(jobKey, "dateRange", val)
                    }
                  >
                    <Typography variant={"h5"}>
                      {job.dateRange || ""}
                    </Typography>
                  </EditText>
                  <EditMarkdown
                    value={job.about || ""}
                    handleChange={val => handleJobEdit(jobKey, "about", val)}
                  >
                    {job.about || ""}
                  </EditMarkdown>
                  {isAdmin && (
                    <>
                      <Button
                        icon={faTrash}
                        onClick={() => {
                          handleJobDelete(jobKey);
                        }}
                      />
                      <Button
                        icon={faArrowUp}
                        onClick={() => {
                          handleJobReorder(jobKey, -1);
                        }}
                      />
                      <Button
                        icon={faArrowDown}
                        onClick={() => {
                          handleJobReorder(jobKey, 1);
                        }}
                      />
                    </>
                  )}
                </Card>
              );
            })}
        {isAdmin && (
          <Button
            icon={faPlus}
            onClick={() => {
              handlePush("jobs");
            }}
          />
        )}
      </div>
    </div>
  );
}
