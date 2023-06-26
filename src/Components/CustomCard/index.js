import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";

const CustomCard = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className="customCardSkeleton skeleton"></div>}
      <div
        className={`customCard ${isLoading ? "d-none" : ""}`}
        onClick={props.onClick}
      >
        <img
          src={props?.image}
          alt={props?.alt}
          className="customCardImage"
          onLoad={() => {
            setIsLoading(false);
          }}
        />
        <div className="customCardOverlay"></div>
        <h3 className="customCardTitle">{props?.title}</h3>
      </div>
    </>
  );
};

export default CustomCard;
