import { useState } from "react";
import "./style.css";
import { Eye, EyeSlash } from "../../Assets/svg";

const CustomInput = (props) => {
  const [typePass, setTypePass] = useState(true);

  const togglePassType = () => {
    setTypePass(!typePass);
  };

  return (
    <>
      <div className="inputWrapper">
        {props?.label && (
          <label htmlFor={props?.id} className={props?.labelClass}>
            {props?.label}
            {props?.required ? "*" : ""}
          </label>
        )}

        {props?.type === "password" ? (
          <div className="passwordWrapper">
            <input
              type={typePass ? "password" : "text"}
              placeholder={props?.placeholder}
              required={props?.required}
              id={props?.id}
              name={props?.name}
              className={`${props?.inputClass} passInput`}
              onChange={props?.onChange}
            />
            <button
              type="button"
              className="eyeButton"
              onClick={togglePassType}
            >
              {typePass ? <EyeSlash /> : <Eye />}
            </button>
          </div>
        ) : (
          <input
            type={props?.type}
            placeholder={props?.placeholder}
            required={props?.required}
            id={props?.id}
            maxLength={props?.maxLength}
            name={props?.name}
            className={props?.inputClass}
            value={props?.value}
            onChange={props?.onChange}
          />
        )}
      </div>
    </>
  );
};
export default CustomInput;
