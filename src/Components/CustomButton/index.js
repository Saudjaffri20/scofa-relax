import React from 'react'
import "./style.css"

const CustomButton = (props) => {
  return (
    <>
      <button type={props?.type} className={`${props?.variant} customButton`} onClick={props?.onClick}>{props?.text}</button>
    </>
  )
}
export default CustomButton;
