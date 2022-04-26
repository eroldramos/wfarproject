import { Fragment, useState } from "react";
import TextField from "../UI/FormControl/InputField/TextField";
import DateField from "../UI/FormControl/InputField/DateField";
import SearchField from "../UI/FormControl/InputField/SearchField";
import DropdownField from "../UI/FormControl/InputField/DropdownField";
import Button from "../UI/FormControl/Button/Button";

function Sample() {

    // sample use state for two-way binding
    const [sampleValue, setSampleValue] = useState('');
    const [sampleError, setSampleError] = useState(null);

    const sampleOnChangeHandlerFunction = (event) => {
        console.log(event.target.value); // outputs the value on console
        setSampleValue(event.target.value);

        event.target.value.indexOf("bad") != -1 ? setSampleError("There's a bad keyword.") : setSampleError(null);
    }

    const SAMPLE_OPTIONS = [
        { label: "Semester 1", value: "1" },
        { label: "Semester 2", value: "2" },
        { label: "Semester 3", value: "3" }
    ];

    const myFunction = () => {
        alert("You selected something, now configure this on the dropdown field component.");
    }

    return (
        <Fragment>

            <fieldset>
                <legend>Sample TextField components</legend>


                <div style={{ display: "flex" }}>
                    <TextField
                        id="sampleText"
                        labelName="Sample Text"
                        inputName="sampleText"
                        placeholder="Enter any sample text"
                        size="rg"
                    />
                    <TextField
                        id="sampleText"
                        labelName="Sample Text"
                        inputName="sampleText"
                        placeholder="Enter any sample text"
                        size="rg"
                    />
                    <TextField
                        id="sampleText"
                        labelName="Sample Text"
                        inputName="sampleText"
                        placeholder="Enter any sample text"
                        size="rg"
                    />
                </div>


                {/* How to use the text field component */}
                {/* Valid textfield - Regular */}

                <TextField
                    id="name"
                    onChange={sampleOnChangeHandlerFunction}
                    labelName="Full Name"
                    inputName="name"
                    placeholder="Enter your full name"
                    value={sampleValue}
                    error={sampleError}
                    size="rg"
                />
                <h3>Check if sample value is working: {sampleValue}</h3>


                {/* Invalid textfield - Medium */}
                <TextField
                    id="age"
                    onChange={null}
                    labelName="Age"
                    inputName="age"
                    placeholder="Enter your age"
                    error="Numbers only."
                    size="md"
                />


                {/* Invalid textfield - Large */}
                <TextField
                    id="link"
                    onChange={null}
                    labelName="MS Teams Link"
                    inputName="link"
                    placeholder="Enter ms teams link"
                    error={null}
                    size="lg"
                />

            </fieldset>

            <br />

            <fieldset>
                <legend>Sample Date-field components</legend>

                {/* How to use the date field component */}
                <DateField
                    id="bdate"
                    onChange={null}
                    labelName="Birthdate"
                    inputName="bdate"
                    value={null}
                    error={null}
                    size="rg"
                />

            </fieldset>

            <br />
            <form>

                <fieldset>
                    <legend>Sample Button components</legend>

                    {/* How to use the button component */}
                    <Button
                        label="Save"
                        type="primary" />

                    <hr />

                    <Button
                        label="Cancel"
                        type="cancel" />

                </fieldset>
            </form>


            <fieldset>
                <legend>Sample Textfield with X button</legend>
                <TextField
                    id="link"
                    onChange={null}
                    labelName="MS Teams Link"
                    inputName="link"
                    placeholder="Enter ms teams link"
                    error={null}
                    size="lg"
                />



            </fieldset>


            <fieldset>
                <legend>Sample Searchfield</legend>
                <SearchField
                    id="link"
                    onChange={null}
                    labelName="search"
                    inputName="search"
                    placeholder="Search faculty"
                    width="rg"
                    height="th" /*th - table height; fh - form height*/
                />

            </fieldset>

            <fieldset>
                <legend>Sample Dropdown</legend>
                <DropdownField
                    id="sample"
                    name="sample"
                    labelName="Semesters"
                    onChange={myFunction}
                    options={SAMPLE_OPTIONS}
                    width="rg"
                    height="th" /*th - table height; fh - form height*/
                />

            </fieldset>

            <p id="demo"></p>

        </Fragment>
    );
}

export default Sample;
