import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// import { removeSoundAction } from "../../Store/Slices/SoundPlayerSlice2";
import { removeSound } from "../../Store/Slices/SoundPlayerSlice";
import { removeAudio } from "../../Store/Slices/AudioSlice";

import IndividualSound from "./IndividualSound";
import IndividualAudio from "./IndividualAudio";

import {
  PauseButton,
  PlayButton,
  // MixerButton,
  crossIcon,
  mixerIcon,
} from "../../Assets/svg";

import "./style.css";

const MainMixer = ({
  menuClass,
  soundList,
  setSoundList,
  otherAudio,
  setOtherAudio,
}) => {
  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(true);
  const [openTray, setOpenTray] = useState(false);
  const [clearMixClicked, setClearMixClicked] = useState(false);

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

  const handleRemoveAudio = () => {
    setOtherAudio(null);
    dispatch(removeAudio());
  };

  const handleClearMix = () => {
    setClearMixClicked(true);
  };

  return (
    <>
      <div className={`audioPlayerWrapper ${menuClass}`}>
        <div className="row">
          <div className="col-12">
            <div className="audioPlayerControls">
              <div className="mixerLeft">
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
              </div>

              <div className="mixerRight">
                <button
                  className="playerAction"
                  onClick={() => {
                    setOpenTray(!openTray);
                  }}
                >
                  <img
                    src={mixerIcon}
                    alt="Mixer Icon"
                    className="playerActionIcon"
                  />
                  <p className="playerActionText">Mixer</p>
                  {/* <MixerButton className="playerActionIcon" /> */}
                </button>
              </div>

              <div className={`mixerTray ${openTray ? "open" : "close"}`}>
                <div className="mixerHeader">
                  <h3>Mixer</h3>
                  <button
                    className="notButton"
                    onClick={() => {
                      setOpenTray(false);
                    }}
                  >
                    <img src={crossIcon} alt="Close Button" />
                  </button>
                </div>
                <div className="individualSoundsWrapper">
                  {soundList.map((item, index) => (
                    <IndividualSound
                      key={index}
                      sound={item}
                      isPlaying={isPlaying}
                      individualRemoveSound={() => {
                        handleRemoveSound(index);
                      }}
                      clearMixClicked={clearMixClicked}
                      setSoundList={setSoundList}
                    />
                  ))}
                </div>
                <div className="otherAudioWrapper">
                  {otherAudio && (
                    <IndividualAudio
                      sound={otherAudio}
                      isPlaying={isPlaying}
                      individualRemoveAudio={() => {
                        handleRemoveAudio();
                      }}
                      clearMixClicked={clearMixClicked}
                      setOtherAudio={setOtherAudio}
                    />
                  )}
                </div>
                <div className="clearMixWrapper">
                  <button className="clearMixButton" onClick={handleClearMix}>
                    Clear Mix
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMixer;
