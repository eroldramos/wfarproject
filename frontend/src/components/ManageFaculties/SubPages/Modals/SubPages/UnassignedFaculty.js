import SearchField from "../../../../UI/FormControl/SearchField/SearchField";
import styles from "../ViewFacultyStatus.module.css";
import Rows from "./Rows";
import table from "./Table.module.css";
import React, { Fragment, useState, useEffect } from "react";
import TransparentButton from "../../../../UI/FormControl/Button/TransparentButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUnassignedFaculties,
  assignedFaculty,
} from "../../../../../store/manageFacultiesActions";

const UnassignedFaculty = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const getUnassignedFacultiesReducerValues = useSelector(
    (state) => state.getUnassignedFaculties
  );

  const {
    isLoading: unassignedIsLoading,
    error: unassignedError,
    unassignedFaculties,
  } = getUnassignedFacultiesReducerValues;

  useEffect(() => {
    dispatch(getUnassignedFaculties());
  }, [dispatch]);

  useEffect(() => {
    if (unassignedFaculties) {
      setListFaculties(unassignedFaculties);
      setCheckedState(new Array(unassignedFaculties.length).fill(false));
    }
  }, [unassignedFaculties]);

  const icon = (
    <svg
      width="19"
      height="13"
      viewBox="0 0 19 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2917 3.33334C10.2917 1.58376 8.87466 0.166672 7.12508 0.166672C5.3755 0.166672 3.95841 1.58376 3.95841 3.33334C3.95841 5.08292 5.3755 6.5 7.12508 6.5C8.87466 6.5 10.2917 5.08292 10.2917 3.33334ZM11.8751 4.91667V6.5H14.2501V8.875H15.8334V6.5H18.2084V4.91667H15.8334V2.54167H14.2501V4.91667H11.8751ZM0.791748 11.25V12.8333H13.4584V11.25C13.4584 9.14417 9.23883 8.08334 7.12508 8.08334C5.01133 8.08334 0.791748 9.14417 0.791748 11.25Z"
        fill="#BE5A40"
      />
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
        {listFaculties.length === 0 && <p>Not Found</p>}
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
    </Fragment>
  );
};

export default UnassignedFaculty;
