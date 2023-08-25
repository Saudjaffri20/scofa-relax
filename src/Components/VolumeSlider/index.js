import { useDispatch, useSelector } from "react-redux";
import {
  changeVolume,
  decreaseMixerVolume,
  increaseMixerVolume,
} from "../../Store/Slices/MixerSlice";

import "./style.css";

const VolumeSlider = () => {
  const dispatch = useDispatch();

  const volume = useSelector((state) => state.mixer.volume);

  // const increaseVolume = () => {
  //   dispatch(increaseMixerVolume());
  // };

  // const decreaseVolume = () => {
  //   dispatch(decreaseMixerVolume());
  // };

  const handleVolumeSlider = (e) => {
    dispatch(changeVolume(e.target.value));
  };

  return (
    <div className="overallVolumeControl">
      {/* <button
        className="playerAction overallVolumeAction"
        onClick={decreaseVolume}
      >
        -
      </button> */}
      <div className="playerVolume">
        <input
          type="range"
          name=""
          id=""
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            handleVolumeSlider(e);
          }}
        />
      </div>
      {/* <button
        className="playerAction overallVolumeAction"
        onClick={increaseVolume}
      >
        +
      </button> */}
    </div>
  );
};

export default VolumeSlider;
