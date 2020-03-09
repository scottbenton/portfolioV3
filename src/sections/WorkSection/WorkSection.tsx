import React, { FunctionComponent, useEffect } from "react";
import { TextDisplay } from "components/shared/TextDisplay";
import { SECTION_PROPS } from "sections";
import { Button, ButtonVariants } from "components/shared/Button";
import {
  MdAdd,
  MdArrowUpward,
  MdArrowDownward,
  MdDelete
} from "react-icons/md";
import { ThemeColors } from "utils/theme-utils";
import { Card } from "components/shared/Card";
import { MarkdownDisplay } from "components/shared/MarkdownDisplay";

type jobType = {
  jobTitleAndCompany?: string;
  workDates?: string;
  description?: string;
};

export const WorkSection: FunctionComponent<SECTION_PROPS> = props => {
  const { data, updateData, isEditing, setIsLoaded } = props;

  const { jobs = [] } = data;

  useEffect(() => {
    if (data && Object.values(data).length > 0) {
      setIsLoaded();
    }
  }, [data, setIsLoaded]);

  const handleJobEdit = (
    jobIndex: number,
    fieldKey: string,
    fieldValue: any
  ) => {
    let newJobs = [...jobs];
    let newJob = { ...newJobs[jobIndex] };
    newJob[fieldKey] = fieldValue;
    newJobs[jobIndex] = newJob;
    updateData("jobs", newJobs);
  };

  const handleJobDelete = (jobIndex: number) => {
    let newJobs = [...jobs];
    newJobs.splice(jobIndex, 1);
    updateData("jobs", newJobs);
  };

  const handleJobSwap = (jobIndexA: number, jobIndexB: number) => {
    let newJobs = [...jobs];
    if (
      jobIndexA >= 0 &&
      jobIndexA < jobs.length &&
      jobIndexB >= 0 &&
      jobIndexB < newJobs.length
    ) {
      const tempJob = { ...newJobs[jobIndexB] };
      newJobs[jobIndexB] = newJobs[jobIndexA];
      newJobs[jobIndexA] = tempJob;

      updateData("jobs", newJobs);
    }
  };

  const handleJobAdd = () => {
    let newJobs = [...jobs];
    newJobs.push({});
    updateData("jobs", newJobs);
  };

  return (
    <div className={"w-full flex flex-col py-8 px-4"}>
      <TextDisplay
        value={data["header"]}
        onChange={val => updateData("header", val)}
        isEditing={isEditing}
        component={"h3"}
        className={"self-center"}
      />

      {jobs.map((job: jobType, index: number) => {
        const { jobTitleAndCompany, workDates, description } = job;
        return (
          <Card
            key={index}
            className={
              "p-4 mx-2 my-4 w-full max-w-xl border-t-4 border-primary-main"
            }
          >
            <TextDisplay
              value={jobTitleAndCompany || ""}
              onChange={value =>
                handleJobEdit(index, "jobTitleAndCompany", value)
              }
              isEditing={isEditing}
              component={"h4"}
            />
            <TextDisplay
              value={workDates || ""}
              onChange={value => handleJobEdit(index, "workDates", value)}
              isEditing={isEditing}
              component={"h5"}
            />
            <MarkdownDisplay
              value={description || ""}
              onChange={value => handleJobEdit(index, "description", value)}
              isEditing={isEditing}
            />
            {isEditing && (
              <div className={"flex flex-wrap"}>
                <Button
                  icon={MdArrowUpward}
                  onClick={() => handleJobSwap(index, index - 1)}
                />
                <Button
                  icon={MdArrowDownward}
                  onClick={() => handleJobSwap(index, index + 1)}
                />
                <Button
                  icon={MdDelete}
                  onClick={() => handleJobDelete(index)}
                />
              </div>
            )}
          </Card>
        );
      })}
      {isEditing && (
        <div className={"flex self-center m-2"}>
          <Button
            icon={MdAdd}
            onClick={handleJobAdd}
            color={ThemeColors.primary}
            variant={ButtonVariants.filled}
          />
        </div>
      )}
    </div>
  );
};
