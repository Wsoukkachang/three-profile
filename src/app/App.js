import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import AnimatedCursor from "../hooks/AnimatedCursor";
import "./App.css";
import { Spacer, ChakraProvider } from "@chakra-ui/react";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import { Bounce, Zoom } from "react-awesome-reveal";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTopp = withRouter(_ScrollToTop);

export default function App() {
  return (
    <ChakraProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="cursor__dot">
          <AnimatedCursor
            innerSize={15}
            outerSize={15}
            color="255, 255 ,255"
            outerAlpha={0.4}
            innerScale={0.7}
            outerScale={5}
          />
        </div>
        <ScrollToTopp>
          <ScrollToTop
            smooth
            style={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              boxShadow: "0 1px 20px 0 rgba(132, 128, 177, 0.90)",
            }}
            component={
              <>
                <Bounce>
                  <FaArrowUp
                    style={{
                      color: "black",
                      paddingTop: "10px",
                      height: "30px",
                      width: "30px",
                    }}
                  ></FaArrowUp>
                </Bounce>
              </>
            }
          />

          <Headermain />
          <AppRoutes />
        </ScrollToTopp>
      </Router>
    </ChakraProvider>
  );
}
