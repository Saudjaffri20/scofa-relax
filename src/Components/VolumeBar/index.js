import { useDispatch, useSelector } from "react-redux";
import {
  decreaseMixerVolume,
  increaseMixerVolume,
} from "../../Store/Slices/MixerSlice";

import "./style.css";

const VolumeBar = () => {
  const dispatch = useDispatch();

  const volume = useSelector((state) => state.mixer.volume);

  const increaseVolume = () => {
    dispatch(increaseMixerVolume());
  };

  const decreaseVolume = () => {
    dispatch(decreaseMixerVolume());
  };

  return (
    <div className="overallVolumeControl">
      <button
        className="playerAction overallVolumeAction"
        onClick={decreaseVolume}
      >
        -
      </button>
      <div className="volumeBars">
        <div className={`volumeBar ${volume >= 0.2 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 0.4 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 0.6 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 0.8 ? "active" : ""}`}></div>
        <div className={`volumeBar ${volume >= 1 ? "active" : ""}`}></div>
      </div>
      <button
        className="playerAction overallVolumeAction"
        onClick={increaseVolume}
      >
        +
      </button>
    </div>
  );
};

export default VolumeBar;
