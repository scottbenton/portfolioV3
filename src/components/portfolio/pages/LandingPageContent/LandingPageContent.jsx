import React from "react";
import { SectionWrapper } from "./sections/SectionWrapper";
import { SECTIONS } from "./sections";
import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";

export function LandingPageContent(props) {
  configureAnchors({ offset: -50 });
  return (
    <>
      {Object.values(SECTIONS).map((section, index) => (
        <div key={index}>
          <ScrollableAnchor id={section.anchor_name}>
            <div>
              <SectionWrapper section={section} />
            </div>
          </ScrollableAnchor>
        </div>
      ))}
    </>
  );
}
