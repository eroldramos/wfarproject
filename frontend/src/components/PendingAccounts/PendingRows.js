import React, { Fragment } from "react";
import table from "./Table.module.css";
const PendingRows = (props) => {
  return (
    <Fragment>
      <li className={table["table-row"]}>
        <div
          className={`${table["col"]} ${table["col-1"]}`}
          data-label="Select to Accept"
        >
          <input
            type="checkbox"
            name={props.id}
            value={props.id}
            checked={props.checked}
            onChange={props.onChange}
          />
        </div>
        <div
          className={`${table["col"]} ${table["col-2"]}`}
          data-label="Full Name"
        >
          <h5>{props.fullname}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-3"]}`}
          data-label="Employee No."
        >
          <h5>{props.emp_no}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-4"]}`}
          data-label="Username"
        >
          <h5>{props.username}</h5>
        </div>
        <div className={`${table["col"]} ${table["col-5"]}`} data-label="Email">
        <h5>{props.email}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-6"]}`}
          data-label="Contact"
        >
          <h5>{props.contact_no}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-7"]}`}
          data-label="Created"
        >
          <h5>{props.civilStatus == 1 && "Married"}</h5>
          <h5>{props.civilStatus == 2 && "Widowed"}</h5>
          <h5>{props.civilStatus == 3 && "Separated"}</h5>
          <h5>{props.civilStatus == 4 && "Divorced"}</h5>
          <h5>{props.civilStatus == 5 && "Single"}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-8"]}`}
          data-label="Action"
        >
          <h5>{props.createdAt}</h5>
        </div>
      </li>
    </Fragment>
  );
};

export default PendingRows;
