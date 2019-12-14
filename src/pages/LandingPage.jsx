import React from "react";
import { NavPage } from "components/shared/NavPage";

import { LandingPageContent } from "components/portfolio/pages/LandingPageContent";

export function LandingPage(props) {
  return (
    <NavPage>
      <LandingPageContent />
    </NavPage>
  );
}
