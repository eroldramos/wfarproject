import { Fragment, useState } from "react";
import InputField from "../UI/FormControl/InputField/InputField";
import DateField from "../UI/FormControl/DateField/DateField";
import SearchField from "../UI/FormControl/SearchField/SearchField";
import DropdownField from "../UI/FormControl/DropdownField/DropdownField";
import Button from "../UI/FormControl/Button/Button";
import Checkbox from "../UI/FormControl/Checkbox/Checkbox";
import ImageCard from "../UI/FormControl/ImageCard/ImageCard";
import Tab from "../UI/Tab/Tab";

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

    const SAMPLE_ITEMS = [
        { label: "Tab 1", id: 1, side: false },
        { label: "Tab 2", id: 2, side: false},
        { label: "Tab 3", id: 3, side: true }
    ];

    const myFunction = () => {
        alert("You selected something, now configure this on the dropdown field component.");
    }


    const myFunctionCheckbox = () => {
        alert("Configure this on the checkbox field component.");
    }

    return (
        <Fragment>

            <fieldset>
                <legend>Sample TextField components</legend>


                <div style={{ display: "flex" }}>
                    <InputField
                        id="sampleText"
                        type="text"
                        labelName="Sample Text"
                        inputName="sampleText"
                        placeholder="Enter any sample text"
                        size="rg"
                    />
                    <InputField
                        id="sampleText"
                        type="text"
                        labelName="Sample Text"
                        inputName="sampleText"
                        placeholder="Enter any sample text"
                        size="rg"
                    />
                    <InputField
                        id="sampleText"
                        type="number"
                        labelName="Sample Text"
                        inputName="sampleText"
                        placeholder="Enter any sample text"
                        size="rg"
                    />
                </div>


                {/* How to use the text field component */}
                {/* Valid textfield - Regular */}

                <InputField
                    id="name"
                    type="text"
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
                <InputField
                    id="age"
                    type="text"
                    onChange={null}
                    labelName="Age"
                    inputName="age"
                    placeholder="Enter your age"
                    error="Numbers only."
                    size="md"
                />


                {/* Invalid textfield - Large */}
                <InputField
                    id="link"
                    type="text"
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
                <legend>Sample Searchfield</legend>
                <SearchField
                    id="link"
                    onChange={null}
                    labelName="search"
                    inputName="search"
                    placeholder="Search faculty"
                    size="rg"
                    type="filter"
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
                    size="rg"
                    type="filter"
                />

            </fieldset>


            <fieldset>
                <legend>Sample Checkbox</legend>
                <Checkbox
                    id="sample"
                    name="sample"
                    label="Checkbox Sample"
                    labelName="Sample thing"
                    onChange={myFunctionCheckbox}
                    type="filter"
                />

            </fieldset>



            <fieldset>
                <legend>Image Cards</legend>
                <ImageCard
                    imageUrl="https://mspoweruser.com/wp-content/uploads/2020/09/Microsoft-Teams-meeting-recap.jpg"
                    onClickAddImage={null}
                    onRemoveImage={null}>
                </ImageCard>
                <ImageCard
                    imageUrl={null}
                    onClickAddImage={null}
                    onRemoveImage={null}>
                </ImageCard>
            </fieldset>

            <br></br>

            <Tab
                items={SAMPLE_ITEMS}
                onClick={null}
                ></Tab>

        </Fragment>
    );
}

export default Sample;
