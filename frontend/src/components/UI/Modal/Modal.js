import { Fragment, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";


const ModalOverlay = (props) => {
  
  const modal = classes["modal"] + " " + classes[props.size];
  
  //calculating modal height
  // const heightRef = useRef();
  
  // const [modalHeight, setModalHeight] = useState(modal.heightRef)

  // useEffect(()=>{
  //   console.log(heightRef.current.clientHeight+"Hello")
  //   console.log("ASDS")
  // }, [])

  //

  return (
    <div className={modal}>
      <div className={classes["scrollable-area"]}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};


const Modal = (props) => {
  return (
    <Fragment >
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay size ={props.size}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
