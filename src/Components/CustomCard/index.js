import { Link } from "react-router-dom";
import "./style.css";

const CustomCard = (props) => {
  return (
    <>
      <div className="customCard" onClick={props.onClick}>
        <img src={props?.image} alt={props?.alt} className="customCardImage" />
        <div className="customCardOverlay"></div>
        <h3 className="customCardTitle">{props?.title}</h3>
      </div>
    </>
  );
};

export default CustomCard;
