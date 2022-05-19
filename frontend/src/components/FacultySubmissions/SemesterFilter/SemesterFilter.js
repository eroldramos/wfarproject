import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";
import styles from "./SemesterFilter.module.css";
const SemesterFilter = (props) => {

	let semesters = [];
	props.options.map((semester) => {
		console.log(semester);
		semesters.push({
			value: semester.id,
			label: semester.school_year + " - " + semester.label,
			isSelected: semester.is_active
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
