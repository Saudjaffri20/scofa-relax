import { useState } from "react";
import IndividualSound from "./IndividualSound";
import "./style.css";

const MainMixer = ({ sounds }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [openTray, setOpenTray] = useState(false);

  const handlePlayAll = () => {
    setIsPlaying(true);
  };

  const handlePauseAll = () => {
    setIsPlaying(false);
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
        {sounds.map((item, index) => (
          <IndividualSound sound={item} isPlaying={isPlaying} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MainMixer;
