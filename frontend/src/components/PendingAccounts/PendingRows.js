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
          {props.fullname}
        </div>
        <div
          className={`${table["col"]} ${table["col-3"]}`}
          data-label="Employee No."
        >
          {props.emp_no}
        </div>
        <div
          className={`${table["col"]} ${table["col-4"]}`}
          data-label="Username"
        >
          {props.username}
        </div>
        <div className={`${table["col"]} ${table["col-5"]}`} data-label="Email">
          {props.email}
        </div>
        <div
          className={`${table["col"]} ${table["col-6"]}`}
          data-label="Contact"
        >
          {props.contact_no}
        </div>
        <div
          className={`${table["col"]} ${table["col-7"]}`}
          data-label="Created"
        >
          {props.civilStatus == 1 && "Married"}
          {props.civilStatus == 2 && "Widowed"}
          {props.civilStatus == 3 && "Separated"}
          {props.civilStatus == 4 && "Divorced"}
          {props.civilStatus == 5 && "Single"}
        </div>
        <div
          className={`${table["col"]} ${table["col-8"]}`}
          data-label="Action"
        >
          {props.createdAt}
        </div>
      </li>
    </Fragment>
  );
};

export default PendingRows;
