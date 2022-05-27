import React from "react";
import style from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={style["loading-spinner-container"]}>
      <div className={style["loader"]}></div>
    </div>
  );
};

export default LoadingSpinner;
