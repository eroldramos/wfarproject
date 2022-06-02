import React, { Fragment, useEffect, useState } from "react";
import styles from "./WFARWeeklyView.module.css";
import SemesterFilter from "../SemesterFilter/SemesterFilter";
import SearchFaculty from "../SearchFaculty/SearchFaculty";
import WeeklyTable from "../Table/WFARWeeklyTable/WeeklyViewTable";
import WeekFilter from "./WeekFilter/WeekFilter";
import StatusFilter from "./StatusFilter/StatusFilter";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { retrieveWfarsSemestersList } from "../../../store/myWfarsActions";
import { retrieveActiveSemester, retrieveWeeklyWfars } from "../../../store/wfarActions";
import { wfarSelectedSemesterActions } from "../../../store/wfarReducers";

const WFARWeeklyView = () => {

    // hooks
    const dispatch = useDispatch();

    const semesters = useSelector((state) => state.wfarSemesters.semesters);
    const activeSemester = useSelector(state => state.wfarActiveSemester.semester);

    // 
    const selectedSemester = useSelector(state => state.wfarSelectedSemester.semester);
    const [selectedWeekNo, setSelectedWeekNo] = useState(1);
    const [selectedPageNo, setSelectedPageNo] = useState(1);
    const [status, setStatus] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [sort, setSort] = useState(0); // 0 - Ascending, 1 - Descending
    const [weeks, setWeeks] = useState([]);

    useEffect(() => {
        dispatch(retrieveWfarsSemestersList());
        dispatch(retrieveActiveSemester());

    }, []);

    useEffect(() => {
        if (selectedSemester == null && activeSemester != null) {
            dispatch(wfarSelectedSemesterActions.setSelectedSemester({ semester: activeSemester[0] }));
        } else if (selectedSemester != null) {
        }
    }, [activeSemester, selectedSemester])

    useEffect(() => {
        if (selectedSemester != null && activeSemester != null) {
            let tempWeeks = [];

            for (let i = 1; i <= selectedSemester.current_week  ; i++) {
                tempWeeks.push({ value: i, label: "Week " + i });
            }

            setWeeks(tempWeeks);
            if (selectedSemester.id == activeSemester[0].id) {
                setSelectedWeekNo(selectedSemester.current_week);
            } else {
                setSelectedWeekNo(selectedSemester.no_of_weeks);
            }
        }
    }, [selectedSemester, activeSemester])

    useEffect(() => {
        if (selectedSemester != null) {
            console.log("week no : " + selectedWeekNo);
            console.log("searchValue : " + searchValue);
            dispatch(retrieveWeeklyWfars(selectedSemester.id, selectedWeekNo, status, selectedPageNo, sort, searchValue));
        }
    }, [selectedSemester, selectedWeekNo, status, selectedPageNo, searchValue, sort])

    const onChangeSemester = (id) => {
        for (let sem of semesters) {
            if (sem.id == id) {
                dispatch(wfarSelectedSemesterActions.setSelectedSemester({ semester: sem }));
                break;
            }
        }
    }

    const onChangeWeek = (weekNo) => {
        setSelectedWeekNo(weekNo);
    }

    const onSelectedPage = (pageNo) => {
        setSelectedPageNo(pageNo);
    }

    const onEnterSearch = (search) => {
        setSearchValue(search);
    }

    const onSortClicked = () => {
        setSort((prevState) => {
            return prevState === 0 ? 1 : 0;
        });
    }

    const onChangeStatus = (statusNo) => {
        console.log("status");
        console.log(statusNo);
        setStatus(statusNo);
    }

    return (
        <Fragment>
            <div className={styles.secondarycontainer}>
                <div className={styles.semFilterContainer}>
                    <SemesterFilter
                        id="semester"
                        name="semester"
                        labelName={"Semester"}
                        onChange={onChangeSemester}
                        options={semesters}
                        size="rg"
                        type="filter" />
                </div>
                <div className={styles.weekFilterContainer}>
                    <WeekFilter
                        id="weekFilter"
                        selectedWeekNo={selectedWeekNo}
                        name="weekFilter"
                        label="Week"
                        labelName={"Week"}
                        size="rg"
                        type="filter"
                        weeks={weeks}
                        onChange={onChangeWeek}
                    />
                </div>
                <div className={styles.statusFilterContainer}>
                    <StatusFilter
                        id="statusFilter"
                        name="statusFilter"
                        label="Status"
                        labelName={"Status"}
                        size="rg"
                        type="filter"
                        selectedStatus={0}
                        onChange={onChangeStatus}
                    />
                </div>
                <div className={styles.searchFilterContainer}>
                    <SearchFaculty onEnterSearch={onEnterSearch} />
                </div>
            </div>
            <div className={styles.tableContainer}>
                <WeeklyTable status={status}></WeeklyTable>
            </div>
            <div className={styles.footerContainer}>
                <Footer></Footer>
            </div>
        </Fragment>
    );
};

export default WFARWeeklyView;
