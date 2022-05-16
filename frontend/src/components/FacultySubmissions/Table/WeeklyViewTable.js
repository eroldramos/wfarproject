
import React, { Fragment, useState, useEffect } from "react";
import styles from "./WeeklyViewTable.module.css";
import ViewButton from "../../UI/FormControl/Button/TableCellButton"

const WeeklyTable = (props) => {

  const wfarStatus = 1; // 1 not submitted 2 to be checked 3 ok 4 with revision

  useEffect(() => {
    if(wfarStatus === 1){ setButtonId("notSubmitted"); setButtonLabel("Check Submission");} 
    else if(wfarStatus === 2){ setButtonId("toBeChecked"); setButtonLabel("Check Submission");} 
    else if(wfarStatus === 3){ setButtonId("ok"); setButtonLabel("View Submission");} 
    else if(wfarStatus === 4){ setButtonId("withRevisions"); setButtonLabel("Re-check Submission");}
  }, [])

  const [buttonLabel, setButtonLabel] = useState("");
  const [buttonId, setButtonId] = useState("");

  const filterFaculty = () =>{
    
  }
  return (
    <div className={styles.weeklyTableContainer}>
      <table className={styles.weeklyTable}>
        <tr>
          <th>
            Faculty{" "}
            <svg
                className={styles.sortFacultyName}
                onClick = {filterFaculty}
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
        <tr> {/* row 1  */}
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td><ViewButton 
            id= {buttonId}
            label = {buttonLabel}
            type = "primary"
            onClick={null}/></td>
        </tr>
        <tr> {/* row 2  */}
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td><ViewButton 
            id={buttonId}
            label={buttonLabel}
            type="primary"
            onClick={null}/></td>
        </tr>
        <tr> {/* row 3  */}
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td><ViewButton 
            id={buttonId}
            label={buttonLabel}
            type="primary"
            onClick={null}/></td>
        </tr>
        <tr> {/* row 4  */}
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td><ViewButton 
            id={buttonId}
            label={buttonLabel}
            type="primary"
            onClick={null}/></td>
        </tr>
        <tr> {/* row 5  */}
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td><ViewButton 
            id={buttonId}
            label={buttonLabel}
            type="primary"
            onClick={null}/></td>
        </tr>
        <tr> {/* row 6  */}
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td>sample</td>
          <td><ViewButton 
            id={buttonId}
            label={buttonLabel}
            type="primary"
            onClick={null}/></td>
        </tr>
      </table>
    </div>
  );
};

export default WeeklyTable;
