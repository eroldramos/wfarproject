import React, { Fragment, useEffect, useState } from "react";
import styles from "./WFARSubmissionsOverview.module.css";
import SearchFaculty from "../SearchFaculty/SearchFaculty";
import SemesterFilter from "../SemesterFilter/SemesterFilter";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import WFAROverviewTable from "../Table/WFAROverviewTable/WFAROverviewTable";
import { retrieveWfarsOverview, printWfarsOverview } from "../../../store/wfarActions";
import { retrieveWfarsSemestersList } from "../../../store/myWfarsActions";
import { retrieveActiveSemester } from "../../../store/wfarActions";
import { wfarSelectedSemesterActions } from "../../../store/wfarReducers";
import Swal from "sweetalert2";

const WFARSubmissionsOverview = () => {

	// hooks
	const dispatch = useDispatch();

	const semesters = useSelector((state) => state.wfarSemesters.semesters);
	const printError = useSelector((state) => state.wfarPrintOverview.error);
	const activeSemester = useSelector(state => state.wfarActiveSemester.semester);
	const selectedSemester = useSelector(state => state.wfarSelectedSemester.semester);
	
	const [selectedPageNo, setSelectedPageNo] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [sort, setSort] = useState(0); // 0 - Ascending, 1 - Descending
	const [isPrintSelected, setIsPrintOverview] = useState(false);

	// retrieving wfars and archived wfars
	useEffect(() => {
		dispatch(retrieveWfarsSemestersList());
		dispatch(retrieveActiveSemester());

	}, []);

	useEffect(() => {

		if (selectedSemester == null && activeSemester != null) {
			dispatch(wfarSelectedSemesterActions.setSelectedSemester({ semester: activeSemester[0]}));
		}
	}, [activeSemester, selectedSemester])

	useEffect(() => {
		if (selectedSemester != null) {
			dispatch(retrieveWfarsOverview(selectedSemester.id, selectedPageNo, sort, searchValue));
		}
	}, [selectedSemester, selectedPageNo, sort, searchValue]);


	/// others
	useEffect(() => {
		if (isPrintSelected) {
			dispatch(printWfarsOverview(selectedSemester.id, sort));
		}
	}, [isPrintSelected]);
	
	useEffect(() => {
		if (printError != null) {
			Swal.fire({
				html:
					'<h5>' + printError + '</h5>',
				icon: 'error',
				confirmButtonColor: '#BE5A40'
			})
		}
	}, [printError])

	const onChangeSemester = (id) => {
		for (let sem of semesters) {
			if (sem.id == id) {
				dispatch(wfarSelectedSemesterActions.setSelectedSemester({ semester: sem }));
				break;
			}
		}
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

	const onClickExportHandler = () => {
		dispatch(printWfarsOverview(selectedSemester.id, sort));
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
						selectedSemesterId={selectedSemester}
						size="rg"
						type="filter" />
				</div>
				<div className={styles.searchFacultyContainer}>
					<SearchFaculty onEnterSearch={onEnterSearch}/>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<WFAROverviewTable onSortClicked={onSortClicked}></WFAROverviewTable>
			</div>
			<div className={styles.footerContainer}>
				<Footer onSelectedPage={onSelectedPage} onClickExportHandler={onClickExportHandler}></Footer>
			</div>
		</Fragment>
	);
};

export default WFARSubmissionsOverview;
