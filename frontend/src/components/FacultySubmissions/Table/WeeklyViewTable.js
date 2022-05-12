
import React, { Fragment } from "react";
import styles from "./WeeklyViewTable.module.css";
import ViewButton from "../../UI/FormControl/Button/TableCellButton"

const WeeklyTable = (props) => {
  return (
    <div className={styles.weeklyTableContainer}>
      <table className={styles.weeklyTable}>
        <tr>
          <th>
            Faculty{" "}
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.70835 4.12492L8.0621 4.77117L5.95835 2.672V10.0833H5.04169V2.672L2.93794 4.77575L2.29169 4.12492L5.50002 0.916585L8.70835 4.12492Z"
                fill="#666B73"
              />
            </svg>
          </th>
          <th># Entries</th>
          <th>Status</th>
          <th>Date Submitted</th>
          <th></th>
        </tr>
        <tr>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td><ViewButton 
            id="viewSubmission"
            label="View Submission"
            type="primary"
            onClick={null}/></td>
        </tr>
        <tr>
          <td>sample</td>
        </tr>
        <tr>
          <td>sample</td>
        </tr>
        <tr>
          <td>sample</td>
        </tr>
        <tr>
          <td>sample</td>
        </tr>
        <tr>
          <td>sample</td>
        </tr>
      </table>
    </div>
  );
};

export default WeeklyTable;
