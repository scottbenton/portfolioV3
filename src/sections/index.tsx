import { MdFace, MdWork, MdSchool, MdBrush, MdEmail } from "react-icons/md";
import { AboutSection } from "./AboutSection";
import { WorkSection } from "./WorkSection";
import { EducationSection } from "./EducationSection";
import { ProjectSection } from "./ProjectSection";
import { ContactSection } from "./ContactSection";
import { FunctionComponent } from "react";

export type SECTION_PROPS = {
  isEditing: boolean;
  data: any;
  updateData: (key: string, value: any) => void;
  uploadFile: (file: File, callback: () => void) => void;
  getFileURL: (key: string) => Promise<any>;
  setIsLoaded: () => void;
};

export type SECTION_CONFIG_SECTION = {
  icon: FunctionComponent;
  label: string;
  component: FunctionComponent<SECTION_PROPS>;
  dbKey: string;
};

export type SECTION_CONFIG = {
  [key: string]: SECTION_CONFIG_SECTION;
};

export const SECTIONS: SECTION_CONFIG = {
  about: {
    icon: MdFace,
    label: "About",
    component: AboutSection,
    dbKey: "about"
  },
  work: {
    icon: MdWork,
    label: "Experience",
    component: WorkSection,
    dbKey: "work"
  },
  education: {
    icon: MdSchool,
    label: "Education",
    component: EducationSection,
    dbKey: "education"
  },
  projects: {
    icon: MdBrush,
    label: "Projects",
    component: ProjectSection,
    dbKey: "projects"
  },
  contact: {
    icon: MdEmail,
    label: "Contact",
    component: ContactSection,
    dbKey: "contact"
  }
};
