import React, { Fragment, useState, useEffect } from "react";
import "./SampleRedux.css";
import { getAllSems, addSem } from "./store/sampleActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SampleRedux() {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [label, setLabel] = useState("");
  const [schoolYear, setSchoolYear] = useState("");

  const allStates = useSelector((state) => state);
  const getAllSemsVariables = useSelector((state) => state.getAllSems);
  const {
    isLoading: getSemIsLoading,
    error: getSemError,
    allSems,
  } = getAllSemsVariables;

  const addSemVariables = useSelector((state) => state.addSem);
  const {
    isLoading: addSemIsLoading,
    error: addSemError,
    success: addSemSuccess,
  } = addSemVariables;

  const [sems, setSems] = useState([
    {
      id: 1,
      label: "pogi",
      school_year: "2021-2022",
    },
  ]);

  const onSetIdHandler = (event) => {
    setId(event.target.value);
  };

  const onSetLabelHandler = (event) => {
    setLabel(event.target.value);
  };
  const onSetSchoolYearHandler = (event) => {
    setSchoolYear(event.target.value);
  };
  const onAddSemHandler = (event) => {
    event.preventDefault();
    let data = {
      label: label,
      school_year: schoolYear,
    };
    console.log(data);
    dispatch(addSem(data));
    navigate("/");
  };

  const onUpdateSemHandler = (event) => {
    event.preventDefault();
    let data = {
      id: id,
      label: label,
      school_year: schoolYear,
    };
    console.log(data);
  };

  useEffect(() => {
    dispatch(getAllSems());
  }, [dispatch, addSemIsLoading]);

  useEffect(() => {
    if (allSems) {
      setSems(allSems);
    }
  }, [allSems]);

  console.log(allSems);
  console.log(allStates, "All States 0000");
  return (
    <Fragment>
      <form onSubmit={onAddSemHandler}>
        <label for="ID">ID</label>
        <br />
        <input type="text" value={id} onChange={onSetIdHandler} />
        <br />
        <label for="Label">Label</label>
        <br />
        <input type="text" value={label} onChange={onSetLabelHandler} />
        <br />
        <label for="School Year">School Year</label>
        <br />
        <input
          type="text"
          value={schoolYear}
          onChange={onSetSchoolYearHandler}
        />
        <br />
        <br />
        <button type="submit">Add Sem</button>
        <button type="button" onClick={onUpdateSemHandler}>
          Update Sem
        </button>
      </form>
      {addSemSuccess && <p>{addSemSuccess}</p>}
      {addSemError && <p>{addSemError}</p>}
      <table className="table-container">
        <tr>
          <th>Label</th>
          <th>School Year</th>
          <th>Action</th>
        </tr>
        {getSemIsLoading && <p>Loading......</p>}
        {sems.map((obj) => (
          <tr>
            <td>
              {obj.id} {obj.label}
            </td>
            <td>{obj["school_year"]}</td>
            <td>
              <button>Get Details</button>
            </td>
          </tr>
        ))}
      </table>
    </Fragment>
  );
}

export default SampleRedux;
