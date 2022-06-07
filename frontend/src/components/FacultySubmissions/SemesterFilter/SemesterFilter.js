import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";
import styles from "./SemesterFilter.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const SemesterFilter = (props) => {
	const redux_semesters = useSelector((state) => state.wfarSemesters.semesters);
	const selectedSemester = useSelector(state => state.wfarSelectedSemester.semester);
	const [semesters, setSemesters] = useState([]);
	const [selectedSemesterId, setSelectedSemesterId] = useState('');

	useEffect(() => {
		const temp = [];

		if (selectedSemester != null && redux_semesters != null) {
			setSelectedSemesterId(selectedSemester.id);
			console.log("selectedSemester.id")
			console.log(selectedSemester.id)

			redux_semesters.map((semester) => {
				console.log(semester);
				temp.push({
					value: semester.id,
					label: semester.school_year + " - " + semester.label,
					isSelected: semester.id == selectedSemester.id ? true : false
				});
				console.log("comparison")
				console.log(semester.id)
				console.log(selectedSemester.id)
				console.log("semester.id == selectedSemester.id ? true : false")
				console.log(semester.id == selectedSemester.id ? true : false)
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
				selectedValue={selectedSemesterId}
			></DropdownField>
		</div>
	);
};
export default SemesterFilter;
