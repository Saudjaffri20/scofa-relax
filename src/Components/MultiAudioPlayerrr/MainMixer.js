import { useState } from "react";
import { useDispatch } from "react-redux";

// import { removeSoundAction } from "../../Store/Slices/SoundPlayerSlice2";
import { removeSound } from "../../Store/Slices/SoundPlayerSlice";

import IndividualSound from "./IndividualSound";

import { PauseButton, PlayButton } from "../../Assets/svg";
import "./style.css";

const MainMixer = ({ menuClass, soundList, setSoundList }) => {
  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(true);
  const [openTray, setOpenTray] = useState(false);

  const handlePlayAll = () => {
    setIsPlaying(true);
  };

  const handlePauseAll = () => {
    setIsPlaying(false);
  };

  const handleRemoveSound = (index) => {
    const updatedSoundList = [...soundList];
    updatedSoundList.splice(index, 1);
    setSoundList(updatedSoundList);
    dispatch(removeSound(index));
  };

  console.log("soundList =>", soundList);

  return (
    <>
      <div className={`audioPlayerWrapper ${menuClass}`}>
        <div className="row">
          <div className="col-12">
            <div className="audioPlayerControls">
              {isPlaying ? (
                <button
                  className="playButton playerAction"
                  onClick={handlePauseAll}
                >
                  <PauseButton className="playerActionIcon" />
                  <p className="playerActionText">Pause</p>
                </button>
              ) : (
                <button
                  className="playButton playerAction"
                  onClick={handlePlayAll}
                >
                  <PlayButton className="playerActionIcon" />

                  <p className="playerActionText">Play</p>
                </button>
              )}
              <p
                className="m-0"
                onClick={() => {
                  setOpenTray(!openTray);
                }}
              >
                Mixer
              </p>
              <div className={`mixerTray ${!openTray ? "d-none" : "d-block"}`}>
                {soundList.map((item, index) => (
                  <IndividualSound
                    key={index}
                    sound={item}
                    isPlaying={isPlaying}
                    individualRemoveSound={() => {
                      handleRemoveSound(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMixer;
