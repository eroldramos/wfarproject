import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";
import styles from "./SemesterFilter.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SemesterFilter = (props) => {
	const redux_semesters = useSelector((state) => state.wfarSemesters.semesters);
	const selectedSemester = useSelector(state => state.wfarSelectedSemester.semester);
	const [semesters, setSemesters] = useState([]);

	useEffect(() => {
		const temp = [];

		if (selectedSemester != null && redux_semesters != null) {
			redux_semesters.map((semester) => {
				console.log(semester);
				temp.push({
					value: semester.id,
					label: semester.school_year + " - " + semester.label,
					isSelected: semester.id == selectedSemester.id ? true : false
				});
			});

			setSemesters(temp);
		}

	}, [selectedSemester, redux_semesters])


	return (
		<div className={styles.semFilterContainer}>
			<DropdownField
				id={props.id}
				name={props.name}
				labelName={props.labelName}
				onChange={props.onChange}
				options={semesters}
				size={props.size}
				type={props.type}
			></DropdownField>
		</div>
	);
};
export default SemesterFilter;
