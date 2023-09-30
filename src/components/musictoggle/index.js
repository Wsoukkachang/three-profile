import React, { useEffect, useState, Suspense } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import Sound from "react-sound";
import Summon from "./Summon.mp3";
import { Spinner } from "@chakra-ui/react";

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
      <Suspense fallback={<Spinner />}>
        <Sound
          url={Summon}
          playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
          volume={25}
        />
      </Suspense>
    </>
  );
};

export default Musictoggle;
