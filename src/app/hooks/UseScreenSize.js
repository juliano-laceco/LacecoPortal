"use client";

import { useState, useEffect } from "react";
import { theme } from "../../../tailwind.config"; // Import your Tailwind CSS config

const useScreenSize = () => {
  const { mob, tablet, lap, desk } = theme.extend.screens;
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (
        windowWidth >= parseInt(mob.min.replace("px", ""), 10) &&
        windowWidth <= parseInt(mob.max.replace("px", ""), 10)
      ) {
        setScreenSize("mob");
      } else if (
        windowWidth >= parseInt(tablet.min.replace("px", ""), 10) &&
        windowWidth <= parseInt(tablet.max.replace("px", ""), 10)
      ) {
        setScreenSize("tablet");
      } else if (
        windowWidth >= parseInt(lap.min.replace("px", ""), 10) &&
        windowWidth <= parseInt(lap.max.replace("px", ""), 10)
      ) {
        setScreenSize("lap");
      } else if (windowWidth >= parseInt(desk.min.replace("px", ""), 10)) {
        setScreenSize("desk");
      } else {
        setScreenSize(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mob, tablet, lap, desk]);

  return screenSize;
};

export default useScreenSize;
