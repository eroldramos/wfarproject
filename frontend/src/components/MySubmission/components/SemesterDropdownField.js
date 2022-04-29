import { Fragment } from "react";
import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";
const SemesterDropdownField = (props) => {

    return (
        <div>
            <label>{props.labelName}</label>
            <DropdownField
                id={props.id}
                name={props.name}
                labelName={null}
                onChange={props.onChange}
                options={props.optionItems}
                size={props.size}
                type={props.type} />
        </div>
    )
}

export default SemesterDropdownField;