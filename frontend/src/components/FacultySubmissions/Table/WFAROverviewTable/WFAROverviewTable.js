import React from "react";
import styles from "./WFAROverviewTable.module.css";

const WFAROverviewTable = (props) => {

  const date = new Date();
  console.log(date.getDate());
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
          <th><h3 className={weekTextClass}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
          <th><h3 className={styles.weekTextContainer}>Week 1</h3><h5>Hello</h5></th>
        </tr>
        <tr>
          <td width={"500"}>agagagavvvvvv vvvvvvga</td>
          <td width={"500"}>agagagavvvvvv vvvvvvga</td>
          <td width={"500"}>agagagavvvvvv vvvvvvga</td>
          <td width={"500"}>agagagavvvvvv vvvvvvga</td>
          <td width={"500"}>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
          <td>agagagavvvvvv vvvvvvga</td>
        </tr>
      </table>
    </div>
  );
};

export default WFAROverviewTable;
