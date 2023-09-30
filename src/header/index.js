import React, { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose, VscMenu } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { logotext2, logotext, socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";
import Musictoggle from "../components/musictoggle";

const Headermain = () => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
            <Musictoggle />
            <Themetoggle />
            <button
              className="menu__button nav_ac"
              onClick={handleToggle}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              {!isActive ? (
                <VscClose style={{ height: "30px", width: "30px" }} />
              ) : (
                <VscMenu style={{ height: "30px", width: "30px" }} />
              )}
            </button>
          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item ">
                    <Link onClick={handleToggle} to="/" className="my-3">
                      Home
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link
                      onClick={handleToggle}
                      to="/portfolio"
                      className="my-3"
                    >
                      {" "}
                      Portfolio
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/videos" className="my-3">
                      {" "}
                      Videos
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/about" className="my-3">
                      About
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/contact" className="my-3">
                      {" "}
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
            <div className="d-flex">
              <a target="_blank" href={socialprofils.github}>
                Github
              </a>
              <a target="_blank" href={socialprofils.twitter}>
                Twitter
              </a>
              <a target="_blank" href={socialprofils.instagram}>
                Instagram
              </a>
            </div>
            <p className="copyright m-0">
              {" "}
              © 1988 {logotext2}, All rights reserved.{" "}
            </p>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;
