import React, { Fragment, useState } from "react";
import table from "./Table.module.css";
import SearchField from "../../UI/FormControl/SearchField/SearchField";
import Rows from "./Rows";
import styles from "./Subpages.module.css";
const Faculty = () => {
  const faculties = [
    {
      id: 1,
      fullname: "Ramos Erold 1",
      emp_no: "2018-101188",
      username: "eroldramos",
      birthdate: "2015-02-03",
      email: "eroldramos@gmail.com",
      contact_no: "09563435355",
      user_type: 1,
    },
    {
      id: 2,
      fullname: "Erold Ramos",
      emp_no: "2018-101188",
      username: "eroldramos",
      birthdate: "2015-02-03",
      email: "eroldramos@gmail.com",
      contact_no: "09563435355",
      user_type: 1,
    },
  ];
  const [searchFaculty, setSearchFaculty] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  const setSearchFacultyValue = (event) => {
    setSearchFaculty(event.target.value);
  };
  return (
    <Fragment>
      <div className={styles["search-field-container"]}>
        <form onSubmit={onSubmitHandler}>
          <SearchField
            id="link"
            onChange={setSearchFacultyValue}
            labelName="search"
            inputName="search"
            value={searchFaculty}
            placeholder="Search faculty"
            size=""
            type="filter"
          />
        </form>
      </div>
      <ul className={table["responsive-table"]}>
        <li className={table["table-header"]}>
          <div
            className={`${table["col"]} ${table["col-1"]} ${table["col-header"]}`}
          >
            Full Name
          </div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            Employee No.
          </div>
          <div
            className={`${table["col"]} ${table["col-3"]} ${table["col-header"]}`}
          >
            Username
          </div>
          <div
            className={`${table["col"]} ${table["col-4"]} ${table["col-header"]}`}
          >
            Birthdate
          </div>
          <div
            className={`${table["col"]} ${table["col-5"]} ${table["col-header"]}`}
          >
            Email
          </div>
          <div
            className={`${table["col"]} ${table["col-6"]} ${table["col-header"]}`}
          >
            Contact
          </div>
          <div
            className={`${table["col"]} ${table["col-7"]} ${table["col-header"]}`}
          >
            Actions
          </div>
        </li>

        {faculties &&
          faculties.map((data, index) => (
            <Rows
              id={data.id}
              fullname={data.fullname}
              emp_no={data.emp_no}
              username={data.username}
              email={data.email}
              contact_no={data.contact_no}
              birthdate={data.birthdate}
              user_type={data.user_type}
              key={index}
            />
          ))}
      </ul>
    </Fragment>
  );
};

export default Faculty;
