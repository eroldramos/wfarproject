import WFARSubmissionsOverview from "./WFARSubmissionsOverview/WFARSubmissionsOverview";
import WFARWeeklyView from "./WFARWeeklyView/WFARWeeklyView";
import styles from "./FacultySubmission.module.css";
import FilterButton from "../UI/FormControl/Button/FilterButton";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { retrieveWfarsSemestersList } from "../../store/myWfarsActions";
import { retrieveActiveSemester } from "../../store/wfarActions";
import { wfarSelectedSemesterActions } from "../../store/wfarReducers";

const FacultySubmission = () => {
    // hooks
    const dispatch = useDispatch();
    const [selectedMenu, setSelectedMenu] = useState("Overview")

    // redux states, objects
    const activeSemester = useSelector(state => state.wfarActiveSemester.semester);
    const selectedSemester = useSelector(state => state.wfarSelectedSemester.semester);

    // retrieving wfars and archived wfars
    useEffect(() => {
        dispatch(retrieveWfarsSemestersList());
        dispatch(retrieveActiveSemester());

    }, []);

    useEffect(() => {
        if (selectedSemester == null && activeSemester != null) {
            console.log("active semester")
            console.log(activeSemester)
            dispatch(wfarSelectedSemesterActions.setSelectedSemester({ semester: activeSemester[0] }));
            console.log("selectedSemester")
            console.log(selectedSemester)
        }
    }, [activeSemester, selectedSemester])

    const updateSelectedMenu = (text) => {
        setSelectedMenu(text);
    }

    return (
        <Fragment>
            <div className={styles.mainContainer}>
                <h1>Weekly Faculty Accomplishment Reports</h1>
                <div style={{ width: "fit-content", float: "left" }}>
                    <h3>Faculty Submissions {selectedMenu}</h3> 
                </div>

                <div className={styles.viewOptionsContainer}>
                    <FilterButton
                        label="Overview"
                        type="primary"
                        linkTo="overview"
                        navigateName={updateSelectedMenu} />
                    <FilterButton
                        label="Weekly View"
                        type="primary"
                        linkTo="weekly-view"
                        navigateName={updateSelectedMenu} />
                </div>

            </div>
            <Routes>
                <Route path="" element={<WFARSubmissionsOverview />}></Route>
                <Route path="overview" element={<WFARSubmissionsOverview />}></Route>
                <Route path="weekly-view" element={<WFARWeeklyView />}></Route>
            </Routes>
        </Fragment>
    )
}

export default FacultySubmission;