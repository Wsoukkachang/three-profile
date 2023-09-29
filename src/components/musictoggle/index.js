import React, { useEffect, useState } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import Sound from "react-sound";
import Summon from "./Summon.mp3";

const Musictoggle = () => {
  const [music, setmusic] = useState(localStorage.getItem("music"));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // document.documentElement.setAttribute("data-music", music);
    localStorage.setItem("music", music);
  }, [music]);

  const musictoggle = () => {
    setIsPlaying(!isPlaying);
    setmusic(!isPlaying);
  };

  return (
    <>
      <div className="nav_ac" onClick={musictoggle}>
        {isPlaying ? (
          <>
            <CiPause1 />
          </>
        ) : (
          <>
            <CiPlay1 />
          </>
        )}
      </div>
      <Sound
        url={Summon}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        volume={50}
        loop={true}
        autoLoad={true}
      />
    </>
  );
};

export default Musictoggle;
