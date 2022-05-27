import CustomSearchField from "../../../../UI/FormControl/SearchField/CustomSearchField";
import styles from "../ViewFacultyStatus.module.css";
import Rows from "./Rows";
import table from "./Table.module.css";
import React, { Fragment, useState, useEffect } from "react";
import TransparentButton from "../../../../UI/FormControl/Button/TransparentButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getUnassignedFaculties,
  assignedFaculty,
} from "../../../../../store/manageFacultiesActions";
import Paginator from "../../../SubComponents/Paginator";
const UnassignedFaculty = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const getUnassignedFacultiesReducerValues = useSelector(
    (state) => state.getUnassignedFaculties
  );

  const {
    isLoading: unassignedIsLoading,
    error: unassignedError,
    unassignedFaculties: { faculties: unassignedFaculties, page, pages },
  } = getUnassignedFacultiesReducerValues;

  useEffect(() => {
    dispatch(getUnassignedFaculties(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (unassignedFaculties) {
      setListFaculties(unassignedFaculties);
      setCheckedState(new Array(unassignedFaculties.length).fill(false));
    }
  }, [unassignedFaculties]);

  const icon = (
    <svg
      width="17"
      height="17"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 4C6.5 2.895 5.605 2 4.5 2C3.395 2 2.5 2.895 2.5 4C2.5 5.105 3.395 6 4.5 6C5.605 6 6.5 5.105 6.5 4ZM7.5 5V6H9V7.5H10V6H11.5V5H10V3.5H9V5H7.5ZM0.5 9V10H8.5V9C8.5 7.67 5.835 7 4.5 7C3.165 7 0.5 7.67 0.5 9Z"
        fill="white"
      ></path>
    </svg>
  );
  const [listFaculties, setListFaculties] = useState([
    {
      id: 1,
      fullname: "Erold Ramos",
    },
    {
      id: 2,
      fullname: "Erold Ramos",
    },
  ]);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);
  const [modalIsShown, setModalIsShown] = useState(false);
  const [searchFaculty, setSearchFaculty] = useState("");
  console.log();
  const [checkedState, setCheckedState] = useState(
    new Array(listFaculties.length).fill(false)
  );
  const selectAllUsers = () => {
    if (isChecked) {
      setIsChecked((isChecked) => !isChecked);
      const updatedCheckedState = checkedState.map((currentCheckState, index) =>
        currentCheckState === isChecked ? currentCheckState : !currentCheckState
      );

      setCheckedState(updatedCheckedState);

      let arrayId = [];
      const newArrayId = updatedCheckedState.reduce(
        (sum, currentState, index) => {
          if (currentState === true) {
            arrayId.push({
              id: listFaculties[index].id,
              fullname: listFaculties[index].fullname,
            });
            return arrayId;
          }
          return arrayId;
        },
        0
      );
      setSelectedUser(newArrayId);
    }
    if (!isChecked) {
      setIsChecked((isChecked) => !isChecked);
      const updatedCheckedState = checkedState.map((currentCheckState, index) =>
        currentCheckState === !isChecked
          ? !currentCheckState
          : currentCheckState
      );

      setCheckedState(updatedCheckedState);
      let arrayId = [];
      const newArrayId = updatedCheckedState.reduce(
        (sum, currentState, index) => {
          if (currentState === true) {
            arrayId.push({
              id: listFaculties[index].id,
              fullname: listFaculties[index].fullname,
            });
            return arrayId;
          }
          return arrayId;
        },
        0
      );
      setSelectedUser(newArrayId);
    }
  };

  const handleOnChange = (position) => {
    if (!isChecked) {
      setIsChecked(true);
    }
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    let arrayId = [];
    const newArrayId = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          arrayId.push({
            id: listFaculties[index].id,
            fullname: listFaculties[index].fullname,
          });
          return arrayId;
        }
        return arrayId;
      },
      0
    );
    setSelectedUser(newArrayId);
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
  const onAssignedFacultyHandler = () => {
    let selectedId = [];
    for (let user of selectedUser) {
      selectedId.push(user.id);
    }
    console.log(selectedId);
    let data = {
      assignee_id: props.id,
      assigned_faculties: selectedId,
    };

    dispatch(assignedFaculty(data));
    alert("Assigned Successfully");
    props.onClose();
  };
  console.log(isChecked);
  console.log(checkedState);
  console.log(selectedUser);
  console.log(checkedState[0]);
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
            size="lg"
            type="filter"
          />
        </form>
      </div>
      <ul className={table["responsive-table"]}>
        <li className={table["table-header"]}>
          <div
            className={`${table["col"]} ${table["col-1"]} ${table["col-header"]}`}
          >
            <input
              type="checkbox"
              checked={!isChecked && selectedUser.length > 0 ? true : false}
              onChange={() => selectAllUsers()}
            />
          </div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            <div className={table["label-container"]}>
              {selectedUser.length} Selected.
            </div>
            <div className={table["icon-container"]}>
              {selectedUser.length > 0 && (
                <TransparentButton
                  onClick={onAssignedFacultyHandler}
                  label="Assign "
                  type="transparent"
                  size="xs"
                  svg={icon}
                />
              )}
            </div>
          </div>
        </li>
        {listFaculties.length === 0 && (
          <p className={table["no-data-text"]}>No data Found</p>
        )}
        {listFaculties &&
          listFaculties.map((data, index) => (
            <Rows
              id={data.id}
              first_name_and_middle_name={`${data.first_name} ${data.middle_name}`}
              last_name={data.last_name}
              key={index}
              checked={checkedState[index] ? checkedState[index] : false}
              onChange={() => handleOnChange(index)}
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

export default UnassignedFaculty;
