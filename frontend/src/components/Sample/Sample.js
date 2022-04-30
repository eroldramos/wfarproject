import { Fragment, useState } from "react";
import InputField from "../UI/FormControl/InputField/InputField";
import DateField from "../UI/FormControl/DateField/DateField";
import SearchField from "../UI/FormControl/SearchField/SearchField";
import DropdownField from "../UI/FormControl/DropdownField/DropdownField";
import Button from "../UI/FormControl/Button/Button";
import TableCellButton from "../UI/FormControl/Button/TableCellButton";
import Checkbox from "../UI/FormControl/Checkbox/Checkbox";
import ImageCard from "../UI/FormControl/ImageCard/ImageCard";
import Tab from "../UI/Tab/Tab";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import FilterButton from "../UI/FormControl/Button/FilterButton";
import PrintButton from "../UI/FormControl/Button/PrintButton";
import IconButton from "../UI/FormControl/Button/IconButton";

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

    const icon = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 17.3333H17.3334V24C17.3334 24.7333 16.7334 25.3333 16 25.3333C15.2667 25.3333 14.6667 24.7333 14.6667 24V17.3333H8.00002C7.26669 17.3333 6.66669 16.7333 6.66669 16C6.66669 15.2666 7.26669 14.6666 8.00002 14.6666H14.6667V7.99996C14.6667 7.26663 15.2667 6.66663 16 6.66663C16.7334 6.66663 17.3334 7.26663 17.3334 7.99996V14.6666H24C24.7334 14.6666 25.3334 15.2666 25.3334 16C25.3334 16.7333 24.7334 17.3333 24 17.3333Z" fill="#323232" />
    </svg>;

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
                        type="primary"
                        size="rg" />

                    <hr />

                    <Button
                        label="Cancel"
                        type="cancel"
                        size="s" />

                    <Button
                        label="Cancel"
                        type="cancel"
                        size="xs" />

                    <IconButton
                        label="Button"
                        type="cancel"
                        size="xs"
                        svg={icon} />
                </fieldset>
            </form>

            <div>

                <SearchField
                    id="link"
                    onChange={null}
                    labelName="search"
                    inputName="search"
                    placeholder="Search faculty"
                    size="rg"
                    type="filter"
                />

            </div>

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
                    size="lg"
                    type="filter"
                />

            </fieldset>

            <div style={{display: "flex"}}>
                <DropdownField
                    id="sample"
                    name="sample"
                    labelName="Semesters"
                    onChange={myFunction}
                    options={SAMPLE_OPTIONS}
                    size="rg"
                    type="filter"
                />
                <DropdownField
                    id="sample"
                    name="sample"
                    labelName="Semesters"
                    onChange={myFunction}
                    options={SAMPLE_OPTIONS}
                    size="rg"
                    type="filter"
                />
            </div>
            
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

            <TableCellButton
                label="Check WFAR"
                type="primary"></TableCellButton>

            <FilterButton
                label="Overview"
                type="primary"></FilterButton>

            <SmallButton
                label="Check WFAR"
                type="primary"></SmallButton>
            <PrintButton
                label = "Print"
                type = "primary"
            ></PrintButton>

            <Tab
                items={SAMPLE_ITEMS}
                onClick={null}
                ></Tab>

        </Fragment>
    );
}

export default Sample;
