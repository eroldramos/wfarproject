import React, { Fragment } from "react";
import FilterButton from "../../UI/FormControl/Button/FilterButton";
import styles from "./ViewOptions.module.css";
import { useNavigate } from "react-router-dom";

const ViewOptions = () => {
  const navigate = useNavigate();
  const changeView = () => {
      console.log("Hello");
    navigate("/WeeklyView");
  };
  return (
    <Fragment>
      <div className={styles.viewOptionsContainer}>
        <FilterButton
          id="overView"
          label="Overview"
          type="primary"
          onClick={() => navigate("/OverView")}
        ></FilterButton>
        <FilterButton
          id="weeklyView"
          label="Weekly View"
          type="primary"
          onClick={() => navigate("/WeeklyView")}
        ></FilterButton>
      </div>
    </Fragment>
  );
};

export default ViewOptions;
