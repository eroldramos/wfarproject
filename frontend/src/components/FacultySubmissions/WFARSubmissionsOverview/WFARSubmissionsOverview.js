import React, { Fragment, useEffect, useState } from "react";
import styles from "./WFARSubmissionsOverview.module.css";
import SearchFaculty from "../SearchFaculty/SearchFaculty";
import SemesterFilter from "../SemesterFilter/SemesterFilter";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import WFAROverviewTable from "../Table/WFAROverviewTable/WFAROverviewTable";
import { retrieveWfarsOverview } from "../../../store/wfarActions";

const WFARSubmissionsOverview = () => {

	// hooks
	const dispatch = useDispatch();

	const semesters = useSelector((state) => state.wfarSemesters.semesters);
	// gumawa ng redux state na makukuha 'yung active semester para sa default
	const [selectedSemester, setSelectedSemester] = useState(1);
	const [selectedPageNo, setSelectedPageNo] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [sort, setSort] = useState(0); // 0 - Ascending, 1 - Descending

	useEffect(() => {
		dispatch(retrieveWfarsOverview(selectedSemester, selectedPageNo, sort, searchValue));
	}, [selectedSemester, selectedPageNo, sort, searchValue]);

	const onChangeSemester = (id) => {
		setSelectedSemester(id);
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
				<div className={styles.searchFacultyContainer}>
					<SearchFaculty onEnterSearch={onEnterSearch}/>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<WFAROverviewTable onSortClicked={onSortClicked}></WFAROverviewTable>
			</div>
			<div className={styles.footerContainer}>
				<Footer onSelectedPage={onSelectedPage}></Footer>
			</div>
		</Fragment>
	);
};

export default WFARSubmissionsOverview;
