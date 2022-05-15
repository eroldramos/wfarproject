import React from "react";
import styles from "./Table.module.css";

const genericTable = (props) => {

  const weekTextClass = styles["weekTextContainer"]+ " " + styles["presentWeek"]
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <tr>    {/* Row 1 */}
          <th>
            Faculty{" "}
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.70835 4.12492L8.0621 4.77117L5.95835 2.672V10.0833H5.04169V2.672L2.93794 4.77575L2.29169 4.12492L5.50002 0.916585L8.70835 4.12492Z"
                fill="#666B73"/>
            </svg>
          </th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h4>Hello</h4></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h4>Hello</h4></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h4>Hello</h4></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h4>Hello</h4></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h4>Hello</h4></th>
        </tr>
      </table>
    </div>
  );
};

export default genericTable;
