import React from "react";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import "./style.css";

const CustomToast = ({ title, message, show, close }) => {
  return (
    <>
      <ToastContainer className="p-3" position={'top-end'} style={{ zIndex: 1 }}>
        <Toast
          show={show}
          onClose={close}
          delay={3000}
          autohide={true}
          top-end
          className="customToast"
        >
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
export default CustomToast;
