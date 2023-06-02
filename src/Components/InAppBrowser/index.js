// import { useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./style.css";

const InAppBrowser = (props) => {

  //   const iframeRef = useRef(null);
  //   const [isLoaded, setIsLoaded] = useState(false);
  //   console.log(iframeRef);

  //   useEffect(() => {
  //     if (iframeRef != null) {
  //       //   window.addEventListener("popstate", handleBackButton);
  //       const iframe = iframeRef.current;
  //       if (iframe) {
  //         iframe.addEventListener("load", () => {
  //           setIsLoaded(true);
  //         });
  //       }
  //     }

  //     return () => {
  //       //   window.removeEventListener("popstate", handleBackButton);
  //     };
  //   }, []);

  //   const handleBackButton = () => {
  //     const iframe = iframeRef.current;
  //     iframe.contentWindow.history.back();
  //   };

  return (
    <>
      <Offcanvas
        show={props.show}
        onHide={props.handleClose}
        placement={"bottom"}
        name={"bottom"}
        className="webView"
      >
        <div className="webViewHeader">
          {/* <button onClick={handleBackButton}>Back</button> */}
          <button type="button" className="webViewClose" onClick={props.close}>
            x
          </button>
        </div>
        <div className="webViewContent">
          {/* {isLoaded ? "" : <p>Abc</p>} */}
          <iframe
            title={props.title}
            src={props.src}
          ></iframe>
        </div>
      </Offcanvas>
    </>
  );
};
export default InAppBrowser;
