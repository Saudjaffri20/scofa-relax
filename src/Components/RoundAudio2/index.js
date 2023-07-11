import { LockBadge } from "../../Assets/svg";
import { useDispatch } from "react-redux";
import { playAudio } from "../../Store/Slices/AudioSlice";
// import { playSound } from "./../../Store/Slices/SoundPlayerSlice";
import { playSound2 } from "./../../Store/Slices/SoundPlayerSlice2";
import "./style.css";
import BASEURL from "../../Config/global";

const RoundAudio = ({item}) => {
  const dispatch = useDispatch();

  const dispatchPlaySound = (item) => {
    dispatch(playSound2(item));
  };
  return (
    <div className="roundAudioWrapper">
      <div
        className="roundAudio"
        onClick={() => {
          dispatchPlaySound(item);
        }}
      >
        <div className="imageWrapper">
          <img
            src={`${BASEURL + item.thumbnail}`}
            alt="Sound Thumbnail"
          />
        </div>
        <p>{item.title}</p>
        {item.premium && (
          <span className="premiumBadge">
            <LockBadge />
          </span>
        )}
      </div>
    </div>
  );
};

export default RoundAudio;
