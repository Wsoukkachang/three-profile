import React, { useEffect, useState, Suspense } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg";
import Sound from "react-sound";
import Summon from "./Summon.mp3";
import Still from "./Still.mp3";
import { Spinner, Flex } from "@chakra-ui/react";

const Musictoggle = ({ ...props }) => {
  const [music, setmusic] = useState(localStorage.getItem("music"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    // document.documentElement.setAttribute("data-music", music);
    localStorage.setItem("music", music);
  }, [music]);

  const musictoggle = () => {
    setIsPlaying(!isPlaying);
    setmusic(!isPlaying);
  };

  const musicTrackToggle = () => {
    if (trackIndex === 0) {
      setTrackIndex(1);
    } else {
      setTrackIndex(0);
    }
  };

  return (
    <>
      <Flex direction={"column"}>
        <Flex direction={"row"}>
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
          <div className="nav_ac" onClick={musicTrackToggle}>
            {trackIndex === 0 ? (
              <>
                <CgPlayTrackNext />
              </>
            ) : (
              <>
                <CgPlayTrackPrev />
              </>
            )}
          </div>
        </Flex>
      </Flex>

      <Suspense fallback={<Spinner />}>
        {trackIndex === 1 ? (
          <>
            <Sound
              url={Summon}
              playStatus={
                isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED
              }
              volume={props.volume}
            />
          </>
        ) : (
          <>
            <Sound
              url={Still}
              playStatus={
                isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED
              }
              volume={props.volume}
            />
          </>
        )}
      </Suspense>
    </>
  );
};

export default Musictoggle;
