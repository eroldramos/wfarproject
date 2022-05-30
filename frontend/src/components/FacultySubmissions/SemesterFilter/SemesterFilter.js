import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";
import styles from "./SemesterFilter.module.css";
import { useSelector } from "react-redux";

const SemesterFilter = (props) => {
	const selectedSemester = useSelector(state => state.wfarSelectedSemester.semester);

	let semesters = [];
	props.options.map((semester) => {
		console.log(semester);
		semesters.push({
			value: semester.id,
			label: semester.school_year + " - " + semester.label,
			isSelected: semester.id == selectedSemester.id ? true : false
		});
	});

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
