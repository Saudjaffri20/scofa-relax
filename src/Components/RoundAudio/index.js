import { LockBadge } from "../../Assets/svg";
import { useDispatch } from "react-redux";
import { playAudio } from "../../Store/Slices/AudioSlice";
import { playSound } from "./../../Store/Slices/SoundPlayerSlice";
import "./style.css";
import BASEURL from "../../Config/global";

const RoundAudio = (props) => {
  const dispatch = useDispatch();

  const dispatchPlaySound = (item) => {
    dispatch(playSound(item));
  };

  return (
    <div className="roundAudioWrapper">
      <div
        className="roundAudio"
        onClick={() => {
          dispatchPlaySound(props?.item);
        }}
      >
        <div className="imageWrapper">
          <img
            src={`${BASEURL + props.item.thumbnail}`}
            alt="Sound Thumbnail"
          />
        </div>
        <p>{props.item.title}</p>
        {props.item.premium && (
          <span className="premiumBadge">
            <LockBadge />
          </span>
        )}
      </div>
    </div>
  );
};

export default RoundAudio;
