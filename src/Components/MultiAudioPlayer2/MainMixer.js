import { useState } from "react";
import { useDispatch } from "react-redux";

import { removeSoundAction } from "../../Store/Slices/SoundPlayerSlice2";
import IndividualSound from "./IndividualSound";

import "./style.css";

const MainMixer = ({ soundList, setSoundList }) => {
  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(true);
  const [openTray, setOpenTray] = useState(false);

  const handlePlayAll = () => {
    setIsPlaying(true);
  };

  const handlePauseAll = () => {
    setIsPlaying(false);
  };

  const removeSound = (index) => {
    const updatedSoundList = [...soundList];
    updatedSoundList.splice(index, 1);
    setSoundList(updatedSoundList);
    dispatch(removeSoundAction(index));
  };

  return (
    <div className="audioPlayerWrapper">
      <div className="row">
        <div className="col-12">
          <div className="audioPlayerControls">
            {isPlaying ? (
              <button onClick={handlePauseAll}>Pause</button>
            ) : (
              <button onClick={handlePlayAll}>Play</button>
            )}
            <button
              className="mixerButton"
              onClick={() => {
                setOpenTray(!openTray);
              }}
            >
              Mixer
            </button>
          </div>
        </div>
      </div>
      <div className={`mixerTray ${!openTray ? "d-none" : "d-block"}`}>
        {soundList.map((item, index) => (
          <IndividualSound
            sound={item}
            isPlaying={isPlaying}
            key={index}
            removeSound={() => {
              removeSound(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MainMixer;
