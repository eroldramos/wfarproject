import styles from "./Register.module.css";
import cictLogo from "../../assets/Login_Register-Images/cict-logo.png"
import InputField from "../UI/FormControl/InputField/InputField";
import { Fragment } from "react";
import DropdownField from "../UI/FormControl/DropdownField/DropdownField";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import DateField from "../UI/FormControl/DateField/DateField";
const Register = () =>{
    
    const SAMPLE_OPTIONS = [
        { label: "Semester 1", value: "1" },
        { label: "Semester 2", value: "2" },
        { label: "Semester 3", value: "3" },
      ];
    return(
        <Fragment>
            <div className={styles["register-form-container"]}>
            <div className={styles["register-form"]}>
                <div className={styles["cict-wfar-logo"]}>
                    <div className={styles["image-container"]}>
                        <img src={cictLogo}/>
                    </div>
                    <div>
                        <p className={styles["cict-wfar"]}>CICT - WFAR</p>
                        <p className={styles["management-system"]}>Management System</p>
                    </div>
                </div>
                <div className={styles["form-greetings"]}>
                    <p>Welcome to CICT WFAR!</p>
                    <p>Please create an account to continue</p>
                </div>

                <form action="" id="register-fields">
                    <div className={styles["register-form-section"]}>
                        <p>Employee Information</p>
                        <hr/>
                        <div className={styles["form-field"]}>
                            <InputField 
                                id="empNo"
                                type="text"
                                labelName="Employee Number"
                                inputName="empNo"
                                placeholder="Employee Number"
                                size="lg"
                                // noLabel = "no-label-input"
                                custom = "form-control-custom"
                                    labelMargin = "nm"/>
                            {/* <label for="">Employee Number</label>
                            <input type="text" placeholder="Employee Number"/> */}
                        </div>
                        <div className={styles["form-field"]}>
                            <InputField 
                                id=""
                                type="text"
                                labelName="First Name"
                                inputName=""
                                placeholder="First Name"
                                size="lg"
                                // noLabel = "no-label-input"
                                custom = "form-control-custom"
                                    labelMargin = "nm"/>
                            {/* <label for="">First Name</label>
                            <input type="text" placeholder="First Name"/> */}
                        </div>
                        <div className={styles["form-field"]}>
                            <InputField 
                                id=""
                                type="text"
                                labelName="Middle Name"
                                inputName=""
                                placeholder="Middle Name"
                                size="lg"
                                // noLabel = "no-label-input"
                                custom = "form-control-custom"
                                    labelMargin = "nm"/>
                            {/* <label for="">Middle Name</label>
                            <input type="text" placeholder="Middle Name"/> */}
                        </div>
                        <div className={styles["registration-double-form"]+ " "+ styles["registration-double-form2"]}>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="Last Name"
                                    inputName=""
                                    placeholder="Last Name"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Last Name</label>
                                <input type="text" placeholder="Last Name"/> */}
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="Extension Name"
                                    inputName=""
                                    placeholder="Extension Name"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Last Name</label>
                                <input type="text" placeholder="Last Name"/> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles["register-form-section"]}>
                        <p>Account Information</p>
                        <hr/>
                        <div className={styles["form-field"]}>
                            <InputField 
                                id=""
                                type="text"
                                labelName="Username"
                                inputName=""
                                placeholder="Username"
                                size="lg"
                                // noLabel = "no-label-input"
                                custom = "form-control-custom"
                                    labelMargin = "nm"/>
                            {/* <label for="">Username</label>
                            <input type="text" placeholder="Username"/> */}
                        </div>
                        <div className={styles["form-field"]}>
                            <InputField 
                                id=""
                                type="text"
                                labelName="Email"
                                inputName=""
                                placeholder="Email"
                                size="lg"
                                // noLabel = "no-label-input"
                                custom = "form-control-custom"
                                    labelMargin = "nm"/>
                            {/* <label for="">Email</label>
                            <input type="email" placeholder="Email"/> */}
                        </div>
                        <div className={styles["registration-double-form"]}>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="password"
                                    labelName="Password"
                                    inputName=""
                                    placeholder="Password"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Password</label>
                                <input type="password" placeholder="Password"/> */}
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="password"
                                    labelName="Confirm Password"
                                    inputName=""
                                    placeholder="Confirm Password"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Confirm Password</label>
                                <input type="password" placeholder="Confirm Password"/> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles["register-form-section"]}>
                        <p>Personal Information</p>
                        <hr/>
                        <div className={styles["registration-double-form"]}>
                            <div className={styles["form-field"]}>
                                <DropdownField
                                    id="sample"
                                    name="sample"
                                    labelName="Civil Status"
                                    onChange={null}
                                    options={SAMPLE_OPTIONS}
                                    size="l"
                                    type="select"
                                    />
                                {/* <label for="">Birthdate</label>
                                <input type="date" placeholder="Birthdate"/> */}
                            </div>
                            <div className={styles["form-field"]}>
                                <DropdownField
                                    id="sample"
                                    name="sample"
                                    labelName="Sex"
                                    onChange={null}
                                    options={SAMPLE_OPTIONS}
                                    size="l"
                                    type="select"
                                    />
                                {/* <label for="">Sex</label>
                                <select id="sex" name="sex">
                                    <option selected disabled>Select one</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select> */}
                            </div>
                        </div>
                        <div className={styles["form-field"]}>
                            <DateField
                                id="bdate"
                                onChange={null}
                                labelName="Birthdate"
                                inputName="bdate"
                                value={null}
                                error={null}
                                size="md"
                                labelMargin = "nm"
                                formPadding = "cp" // custom padding
                                />
                            {/* <label for="">Civil Status</label>
                            <select id="civil-status" name="civil-status">
                                <option selected disabled>Select one</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="separated">Separated </option>
                                <option value="widowed">Widowed</option>
                            </select> */}
                        </div>
                    </div>
                    <div className={styles["register-form-section"]}>
                        <p>Contact Information</p>
                        <hr/>
                        <div className={styles["registration-double-form"]}>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="Street Name"
                                    inputName=""
                                    placeholder="Street Name"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Street Name</label>
                                <input type="text" placeholder="Street Name"/> */}
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="House Number"
                                    inputName=""
                                    placeholder="House Number"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Barangay/District</label>
                                <input type="text" placeholder="Barangay/District"/> */}
                            </div>
                        </div>
                        <div className={styles["registration-double-form"]}>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="Subdivision"
                                    inputName=""
                                    placeholder="Subdivision"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Street Name</label>
                                <input type="text" placeholder="Street Name"/> */}
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="Barangay/District"
                                    inputName=""
                                    placeholder="Barangay/District"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Barangay/District</label>
                                <input type="text" placeholder="Barangay/District"/> */}
                            </div>
                        </div>
                        <div className={styles["registration-double-form"]}>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="City/Municipality"
                                    inputName=""
                                    placeholder="City/Municipality"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">City/Municipality</label>
                                <input type="text" placeholder="City/Municipality"/> */}
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="text"
                                    labelName="Province/State"
                                    inputName=""
                                    placeholder="Province/State"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Province/State</label>
                                <input type="text" placeholder="Province/State"/> */}
                            </div>
                        </div>
                        <div className={styles["registration-double-form"]}>
                            <div className={styles["form-field"]}>
                                    <InputField 
                                        id=""
                                        type="text"
                                        labelName="Zip Code"
                                        inputName=""
                                        placeholder="Zip Code"
                                        size="lg"
                                        // noLabel = "no-label-input"
                                        custom = "form-control-custom"
                                        labelMargin = "nm"/>
                                {/* <label for="">Contact Number</label>
                                <input type="number" placeholder="Contact Number"/> */}
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField 
                                    id=""
                                    type="tel"
                                    labelName="Contact Number"
                                    inputName=""
                                    placeholder="Ex. 0956"
                                    size="lg"
                                    // noLabel = "no-label-input"
                                    custom = "form-control-custom"
                                    labelMargin = "nm"/>
                                {/* <label for="">Province/State</label>
                                <input type="text" placeholder="Province/State"/> */}
                            </div>
                        </div>
                    </div>
                    <SmallButton label="Sign Up" type="primary" size="l-l"></SmallButton>
                    <div className={styles["signin-link"]}>
                        <p>Already have an account?<h5> Sign in</h5></p>
                    </div>
                </form>
            </div>
        </div>
        </Fragment>
    );
}
export default Register;