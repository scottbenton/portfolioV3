import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { goToAnchor } from "react-scrollable-anchor";
import { faPowerOff, faBars } from "@fortawesome/free-solid-svg-icons";

import { useSpring, animated } from "react-spring";

import { NavBarItem } from "components/shared/NavBar";
import { Button } from "components/shared/Button";

import "./styles.css";

import { useCurrentUser } from "api/UserContext";

import { SECTIONS } from "components/portfolio/pages/LandingPageContent/sections";

const firebase = require("firebase/app");
require("firebase/auth");

export function NavBarContent(props) {
  const { user } = useCurrentUser();

  const history = useHistory();

  const [sidebarOpen, setSideBarOpen] = React.useState(false);
  const { left } = useSpring({
    config: { duration: 250 },
    left: sidebarOpen ? 0 : -300
  });

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  const handleSidebarChange = () => {
    setSideBarOpen(prevSidebarValue => !prevSidebarValue);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };

  const handleHomeClick = () => {
    if (window.location.pathname !== "/") history.push("/");
    goToAnchor("home");
  };

  const handleSectionClick = anchor_name => {
    goToAnchor(anchor_name);
    setSideBarOpen(false);
  };

  return (
    <>
      <div className={"flex"}>
        <NavBarItem className={"md:hidden "} borderSide={"right"}>
          <Button
            className="text-xl py-2 rounded-none"
            icon={faBars}
            onClick={handleSidebarChange}
          />
        </NavBarItem>
        <NavBarItem borderSide={"right"}>
          <Button
            className="text-xl py-2 rounded-none m-0"
            onClick={handleHomeClick}
          >
            {"<Scott Benton />"}
          </Button>
        </NavBarItem>
        {Object.values(SECTIONS)
          .filter(section => section.icon)
          .map(section => (
            <NavBarItem
              key={section.DB_PAGE_ROOT}
              className={"hidden md:flex"}
              borderSide={"right"}
            >
              <Button
                className="text-xl py-2 rounded-none h-full"
                icon={section.icon}
                onClick={() => goToAnchor(section.anchor_name)}
              />
            </NavBarItem>
          ))}
      </div>
      {user && (
        <NavBarItem borderSide={"left"}>
          <Button
            className="text-xl py-2 rounded-none"
            icon={faPowerOff}
            onClick={signOut}
          />
        </NavBarItem>
      )}
      {sidebarOpen && <div className={"scrim"} onClick={handleSidebarChange} />}
      <animated.div
        style={{ left }}
        className={"fixed h-full bg-white z-40 top-0 sidenav"}
      >
        <div className={"flex flex-col"}>
          {Object.values(SECTIONS)
            .filter(section => section.icon)
            .map(section => (
              <Button
                key={section.name}
                className="text-xl text-left py-2 rounded-none h-full"
                startIcon={section.icon}
                onClick={() => handleSectionClick(section.anchor_name)}
              >
                {section.name}
              </Button>
            ))}
        </div>
      </animated.div>
    </>
  );
}
