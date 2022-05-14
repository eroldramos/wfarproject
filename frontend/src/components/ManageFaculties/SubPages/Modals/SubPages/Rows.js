import React, { Fragment, useState } from "react";
import table from "./Table.module.css";
const Rows = (props) => {
  return (
    <Fragment>
      <li className={table["table-row"]}>
        <div
          className={`${table["col"]} ${table["col-1"]}`}
          data-label="Full Name"
        >
          <input
            type="checkbox"
            name={props.id}
            value={props.id}
            checked={props.checked}
            onChange={props.onChange}
          />
        </div>
        <div className={`${table["col"]} ${table["col-2"]}`} data-label="">
          <strong>{props.id}</strong>, {props.fullname}
        </div>
      </li>
    </Fragment>
  );
};

export default Rows;
