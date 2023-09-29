import React, { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";
import { useColorMode } from "@chakra-ui/react";

const Themetoggle = () => {
  const [theme, settheme] = useState(localStorage.getItem("theme"));
  const { colorMode, toggleColorMode } = useColorMode();

  const themetoggle = () => {
    settheme(theme === "dark" ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    toggleColorMode();
  }, [theme]);

  return (
    <div className="nav_ac" onClick={themetoggle}>
      <WiMoonAltWaningCrescent4 />
    </div>
  );
};

export default Themetoggle;
