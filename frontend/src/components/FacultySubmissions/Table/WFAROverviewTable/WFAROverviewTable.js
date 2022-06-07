import { Fragment, useEffect, useState, useRef } from "react";
import styles from "./WFAROverviewTable.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WFAROverviewTable = (props) => {

	// hooks
	const navigate = useNavigate();
	const activeSemester = useSelector(state => state.wfarActiveSemester.semester);
	const selectedSemester = useSelector(state => state.wfarSelectedSemester.semester);
	const userInfo = useSelector((state) => state.login.userInfo);

	// constants
	const month = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const facultiesWithWfars = useSelector(state => state.wfarRetrieveOverview.facultiesWithWfars);
	const weekBrackets = useSelector(state => state.wfarRetrieveOverview.weekBrackets);
	const semesterNoOfWeeks = useSelector(state => state.wfarRetrieveOverview.semesterNoOfWeeks);
	const currentWeekNo = useSelector(state => state.wfarRetrieveOverview.currentWeekNo);

	const weekTextClass = styles["weekTextContainer"] + " " + styles["presentWeek"];

	const [thWeeks, setThWeeks] = useState([]);
	const [tdWfars, setTdWfars] = useState([]);
	const [sortSvgClass, setSortSvgClass] = useState('sortAscSvg');

	const onClickSortHandler = () => {
		props.onSortClicked();
		setSortSvgClass((prevState) => {
			return prevState === 'sortAscSvg' ? 'sortDescSvg' : 'sortAscSvg';
		});

		console.log(sortSvgClass);
	}

	useEffect(() => {
		let weeksBuffer = [];
		let wfarsBuffer = [[], []];
		if (weekBrackets !== null && semesterNoOfWeeks !== 0 && currentWeekNo !== 0 && facultiesWithWfars !== null &&
			activeSemester !== null && selectedSemester !== null) {

			console.log(facultiesWithWfars);

			for (let i = 0; i < semesterNoOfWeeks; i++) {
				let startDate = new Date(weekBrackets[i + i]);
				let endDate = new Date(weekBrackets[i + i + 1]);
				let startDateLbl = month[startDate.getMonth()] + " " + startDate.getDate();
				let endDateLbl = month[endDate.getMonth()] + " " + endDate.getDate();

				if (i + 1 === currentWeekNo) {
					weeksBuffer.push(<th>
						<p className={weekTextClass}>Week {i + 1}</p>
						<p className={styles['weekLabel']}>{startDateLbl} - {endDateLbl}</p>
					</th>);
				} else {
					weeksBuffer.push(<th>
						<p className={styles["weekTextContainer"]}>Week {i + 1}</p>
						<p className={styles['weekLabel']}>{startDateLbl} - {endDateLbl}</p>
					</th>);
				}
			}

			let faculties = facultiesWithWfars;
			console.log("i > " + faculties.length);
			for (let i = 0; i < faculties.length; i++) {
				wfarsBuffer[i] = []
				let wfarWithWeeks = faculties[i].wfars.length;
				// console.log("weeks: " + wfarWithWeeks);
				// console.log("current_week_no: " + currentWeekNo);
				for (let j = wfarWithWeeks; j < semesterNoOfWeeks; j++) {

					if (j + 1 <= currentWeekNo) {
						wfarsBuffer[i].push(<td><span className={styles['noSubmission']}>No submission</span></td>)
					} else {
						wfarsBuffer[i].push(<td></td>)
					}

				}
			}

			setThWeeks(weeksBuffer);
			setTdWfars(wfarsBuffer);

			const element = document.querySelector("#tableWFAROverview");
			if (activeSemester[0].id == selectedSemester.id) {
				const scroll = (198 * currentWeekNo) - (115.5 * 2);
				element.scrollLeft = scroll;
			} else {
				element.scrollLeft = 0;
			}
		}
	}, [weekBrackets, semesterNoOfWeeks, facultiesWithWfars, activeSemester, selectedSemester]);


	const navigateToCheckWFAR = (index) => {
		navigate("/WFARChecking/" + index)
	}

	const onScrollHandler = (event) => {
		const element = document.querySelector("#tableWFAROverview");
		console.log(element.scrollLeft)
	}


	const ViewFaculty = (id) => {
		//save ID to view_id
		let data = {
			view_id: id,
		};
		axios({
			method: "POST",
			url:
				"http://127.0.0.1:8000/api/profile/view-faculty/" + userInfo.id + "/",
			data: data,
		});
		//open viewfaculty
		navigate("/view-faculty");
	};

	return (
		// <div className={styles.tableContainer}>
		<table className={styles.table} id="tableWFAROverview" onScroll={onScrollHandler}>
			<tr>    {/* Row 1 */}
				<th className={styles['fixed']}>
					<div className={styles['facultyLabel']}>Faculty{" "}
						<svg className={styles[sortSvgClass]} onClick={onClickSortHandler}
							width="11"
							height="11"
							viewBox="0 0 11 11"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.70835 4.12492L8.0621 4.77117L5.95835 2.672V10.0833H5.04169V2.672L2.93794 4.77575L2.29169 4.12492L5.50002 0.916585L8.70835 4.12492Z"
								fill="#666B73" />
						</svg>
					</div>
				</th>
				{thWeeks}
			</tr>
			{facultiesWithWfars !== null && facultiesWithWfars.map((faculty, index) => {
				return (
					<tr>
						<td className={styles['fixed']} onClick={() => ViewFaculty(faculty.id)}>
							<strong>{faculty.last_name}</strong>, {faculty.first_name + " "}
							{faculty.middle_name != null && faculty.middle_name != "N/a" ? faculty.middle_name[0] + ". " : ""}
							{faculty.extension_name != null && faculty.extension_name != "N/a" ? faculty.extension_name : ""}
						</td>
						{faculty.wfars.map((wfars, index) => {


							return <td>
								{wfars.status === 1 && <span className={styles['noSubmission']}>No submission</span>}
								{wfars.status === 2 && <span className={styles['forChecking']} onClick={() => navigateToCheckWFAR(wfars.id)} style={{ cursor: "pointer" }}>For Checking</span>}
								{wfars.status === 3 && <span className={styles['ok']} onClick={() => navigateToCheckWFAR(wfars.id)} style={{ cursor: "pointer" }}>
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8.16995 0.035792C5.88849 0.247328 3.77337 1.32101 2.2563 3.03797C0.739042 4.75492 -0.0662966 6.98601 0.00427525 9.27616C0.0749888 11.5663 1.0162 13.7432 2.63645 15.3636C4.25669 16.9838 6.43367 17.925 8.72385 17.9957C11.0141 18.0663 13.2452 17.261 14.962 15.7437C16.679 14.2264 17.7527 12.1115 17.9642 9.83005C18.1215 8.07035 17.7588 6.30314 16.9212 4.74765C16.0837 3.19201 14.808 1.91636 13.2524 1.07887C11.6969 0.241231 9.92969 -0.121426 8.16999 0.0358304L8.16995 0.035792ZM13.8345 6.9774L8.50023 12.2561C8.34012 12.4119 8.12559 12.4992 7.90224 12.4992C7.6789 12.4992 7.46438 12.4119 7.30426 12.2561L4.16021 9.25365C3.93896 9.04107 3.84791 8.72666 3.92116 8.42887C3.99457 8.13092 4.22136 7.89488 4.51601 7.80949C4.81067 7.72398 5.1285 7.80232 5.34975 8.01475L7.88731 10.4494L12.6364 5.75817C12.8558 5.55187 13.1675 5.47592 13.4572 5.558C13.7471 5.64022 13.9726 5.8685 14.0511 6.15927C14.1297 6.45005 14.0499 6.7607 13.8409 6.97762L13.8345 6.9774Z" fill="#1A9E50" />
									</svg>
								</span>}
								{wfars.status === 4 && <span className={styles['withRevisions']} onClick={() => navigateToCheckWFAR(wfars.id)} style={{ cursor: "pointer" }}>With Revisions</span>}
							</td>
						})}
						{tdWfars[index]}
					</tr>);
			})}
		</table>

		// </div>
	);
};

export default WFAROverviewTable;
