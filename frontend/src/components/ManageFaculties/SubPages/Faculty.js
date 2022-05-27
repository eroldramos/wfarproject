import React, { Fragment, useState, useEffect } from "react";
import table from "./Table.module.css";
import CustomSearchField from "../../UI/FormControl/SearchField/CustomSearchField";
import Rows from "./Rows";
import styles from "./Subpages.module.css";
import { getFaculties } from "../../../store/manageFacultiesActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../SubComponents/Paginator";
const Faculty = () => {
  const search = useLocation().search;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const getFacultiesReducerValues = useSelector((state) => state.getFaculties);
  const {
    isLoading: getFacultiesIsLoading,
    error: getFacultiesError,
    faculties: { faculties, pages, page },
  } = getFacultiesReducerValues;

  const changeUserTypeReducerValues = useSelector(
    (state) => state.changeUserType
  );
  const {
    isLoading: userTypeIsLoading,
    error: userTypeError,
    success: userTypeSuccess,
  } = changeUserTypeReducerValues;

  const assignedFacultyReducerValues = useSelector(
    (state) => state.assignedFaculty
  );
  const { isLoading: assignIsLoading } = assignedFacultyReducerValues;

  const [searchFaculty, setSearchFaculty] = useState("");
  const [listFaculty, setListFaculty] = useState([]);

  const [ableToSearch, setAbleToSearch] = useState(true);

  useEffect(() => {
    if (userTypeSuccess && !userTypeIsLoading) {
      console.log("ufkckkkkcakdsakfk");
      navigate(window.location.pathname);
    }
    if (ableToSearch) {
      dispatch(getFaculties(search));
    }
  }, [
    dispatch,
    userTypeSuccess,
    userTypeIsLoading,
    assignIsLoading,
    search,
    ableToSearch,
  ]);

  useEffect(() => {
    if (faculties && !userTypeIsLoading) {
      setListFaculty(faculties);
    }
  }, [faculties, userTypeIsLoading]);

  const disableSearch = () => {
    setAbleToSearch(false);
  };
  const enableSearch = () => {
    setAbleToSearch(true);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (searchFaculty) {
      navigate(`${window.location.pathname}?search=${searchFaculty}&page=1`);
    } else {
      navigate(window.location);
    }
  };
  const setSearchFacultyValue = (event) => {
    setSearchFaculty(event.target.value);
  };
  return (
    <Fragment>
      <div className={styles["search-field-container"]}>
        <form onSubmit={onSubmitHandler}>
          <CustomSearchField
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
            <h5>Full Name</h5>
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
          </div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            <h5>Employee No.</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-3"]} ${table["col-header"]}`}
          >
            <h5>Username</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-4"]} ${table["col-header"]}`}
          >
            <h5>Birthdate</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-5"]} ${table["col-header"]}`}
          >
            <h5>Email</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-6"]} ${table["col-header"]}`}
          >
            <h5>Contact</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-7"]} ${table["col-header"]}`}
          >
            <h5>Actions</h5>
          </div>
        </li>
        {listFaculty.length === 0 && (
          <p className={styles["no-data-text"]}>No data Found</p>
        )}
        {listFaculty &&
          listFaculty.map((data, index) => (
            <Rows
              enableSearch={enableSearch}
              disableSearch={disableSearch}
              id={data.id}
              fullname={`${data.last_name}, ${data.first_name} ${data.middle_name}`}
              emp_no={data.emp_no}
              username={data.username}
              email={data.email}
              contact_no={data.contact_no}
              birthdate={data.birthdate}
              user_type={data.user_type}
              assignee_id={data.assignee_id}
              key={index}
            />
          ))}
      </ul>
      <div className={styles["paginator-container"]}>
        <Paginator
          search={search}
          page={page}
          pages={pages}
          url={window.location.pathname}
        />
      </div>
    </Fragment>
  );
};

export default Faculty;
