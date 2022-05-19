import SearchField from "../../../../UI/FormControl/SearchField/SearchField";
import styles from "../ViewFacultyStatus.module.css";
import RadioRows from "./RadioRows";
import table from "./Table.module.css";
import React, { Fragment, useState, useEffect } from "react";
import TransparentButton from "../../../../UI/FormControl/Button/TransparentButton";
import {
  getDepartmentHeads,
  assignedFaculty,
} from "../../../../../store/manageFacultiesActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../../../SubComponents/Paginator";
const DepartmentHead = (props) => {
  const icon = (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 4C6.5 2.895 5.605 2 4.5 2C3.395 2 2.5 2.895 2.5 4C2.5 5.105 3.395 6 4.5 6C5.605 6 6.5 5.105 6.5 4ZM7.5 5V6H9V7.5H10V6H11.5V5H10V3.5H9V5H7.5ZM0.5 9V10H8.5V9C8.5 7.67 5.835 7 4.5 7C3.165 7 0.5 7.67 0.5 9Z" fill="white"/>
</svg>

  );

  const search = useLocation().search;
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const getDepartmentHeadsReducerValues = useSelector(
    (state) => state.getDepartmentHeads
  );
  const {
    isLoading: getDepartmentHeadsIsLoading,
    error: getDepartmentHeadsError,
    departmentheads: { faculties: departmentheads, pages, page },
  } = getDepartmentHeadsReducerValues;

  useEffect(() => {
    dispatch(getDepartmentHeads(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (departmentheads) {
      setListFaculty(departmentheads);
    }
  }, [departmentheads]);

  const [searchFaculty, setSearchFaculty] = useState("");
  const [listFaculty, setListFaculty] = useState([
    {
      id: 1,
      fullname: "Erold Ramos",
    },
    {
      id: 2,
      fullname: "Erold Ramos",
    },
  ]);
  const [assigneeId, setAssigneeId] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (searchFaculty) {
      navigate(
        `/manage-faculty/faculty/department-head/?search=${searchFaculty}&page=1`
      );
    } else {
      navigate(window.location);
    }
  };
  const setSearchFacultyValue = (event) => {
    setSearchFaculty(event.target.value);
  };
  const onHandleChange = (event) => {
    setAssigneeId(event.target.value);
  };

  const onAssignedFacultyHandler = () => {
    let selectedId = [];

    selectedId.push(props.id);

    console.log(selectedId);
    let data = {
      assignee_id: assigneeId,
      assigned_faculties: selectedId,
    };

    dispatch(assignedFaculty(data));
    console.log(data);
    alert("Assigned Successfully");
    props.onCloseAssignModal();
  };

  console.log(assigneeId);
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
            size="lg"
            type="filter"
          />
        </form>
      </div>
      <ul className={table["responsive-table"]}>
        <li className={table["table-header"]}>
          <div
            className={`${table["col"]} ${table["col-1"]} ${table["col-header"]}`}
          ></div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            <div className={table["label-container"]}>
              Choose a Department Head.
            </div>
            <div className={table["icon-container2"]}>
              {assigneeId > 0 && (
                <TransparentButton
                  onClick={onAssignedFacultyHandler}
                  label="Assign"
                  type="transparent"
                  size="xs"
                  svg={icon}
                />
              )}
            </div>
          </div>
        </li>
        {listFaculty.length === 0 && <p className={table["no-data-text"]}>No Department Head Found</p>}
        {listFaculty &&
          listFaculty.map((data, index) => (
            <RadioRows
              id={data.id}
              value={data.id}
              first_name_and_middle_name={`${data.first_name} ${data.middle_name}`}
              last_name={data.last_name}
              key={index}
              checked={assigneeId == data.id}
              onChange={onHandleChange}
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

export default DepartmentHead;
