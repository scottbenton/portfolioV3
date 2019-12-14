import { SplashSection } from "./SplashSection";
import { AboutSection } from "./AboutSection";
import { EducationSection } from "./EducationSection";
import { WorkSection } from "./WorkSection";
import { ProjectSection } from "./ProjectSection";
import { ContactSection } from "./ContactSection";

import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faLaptopCode,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

export const SECTIONS = {
  SPLASH: {
    component: SplashSection,
    DB_PAGE_ROOT: "splash",
    anchor_name: "home"
  },
  ABOUT: {
    component: AboutSection,
    DB_PAGE_ROOT: "about",
    anchor_name: "about",
    icon: faUser,
    name: "About Me"
  },
  WORK: {
    component: WorkSection,
    DB_PAGE_ROOT: "work",
    anchor_name: "work",
    icon: faBriefcase,
    name: "Work Experience"
  },
  EDUCATION: {
    component: EducationSection,
    DB_PAGE_ROOT: "education",
    anchor_name: "education",
    icon: faGraduationCap,
    name: "Education"
  },
  PROJECT: {
    component: ProjectSection,
    DB_PAGE_ROOT: "project",
    anchor_name: "projects",
    icon: faLaptopCode,
    name: "Projects"
  },
  CONTACT: {
    component: ContactSection,
    DB_PAGE_ROOT: "contact",
    anchor_name: "contact",
    icon: faEnvelope,
    name: "Contact Me"
  }
};
