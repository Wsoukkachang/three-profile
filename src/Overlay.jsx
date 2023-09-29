import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextTransition, { presets } from "react-text-transition";

const Overlay = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [index, setIndex] = React.useState(0);
  const TEXTS = ["William Soukkachang", "React", "Python", "Full Stack"];

  const handleButtonClick = () => {
    setIsButtonActive(true);

    // Set a timeout to return buttonActive to false
    setTimeout(() => {
      setIsButtonActive(false);
    }, 1000); // 1 second
  };

  const buttonAnimation = {
    scale: [1, 1.2, 1],
    transition: { duration: 0.5 },
  };

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    // Gradually increase the opacity of the image element
    const animationInterval = setInterval(() => {
      setImageOpacity((prevOpacity) => {
        if (prevOpacity >= 1) {
          clearInterval(animationInterval);
          return 1;
        }
        return prevOpacity + 0.01;
      });
    }, 50);

    // Scale the image element up to a larger size
    const imageElement = document.querySelector(".image");
    imageElement.style.transform = "scale(1.2)";
  }, []);

  return (
    <motion.div className="overlay">
      <AnimatePresence>
        <motion.button
          className="left-button"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          // animate={isButtonActive ? buttonAnimation : {}}
          // onClick={handleButtonClick}
        >
          More Projects!
        </motion.button>
      </AnimatePresence>

      {/* <h1>
        <TextTransition className="middle-button" springConfig={presets.wobbly}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </h1> */}

      <div className="image-popup">
        <img
          className="image middle-button"
          src="./name.png"
          style={{ opacity: imageOpacity }}
        />
      </div>

      <AnimatePresence>
        <motion.button
          className="right-button"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          // animate={isButtonActive ? buttonAnimation : {}}
          // onClick={handleButtonClick}
        >
          More Projects!
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
};

export default Overlay;
