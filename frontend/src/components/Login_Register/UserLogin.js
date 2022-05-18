import styles from "./Login.module.css";
import cictLogo from "../../assets/Login_Register-Images/cict-logo.png"
import cictBg from "../../assets/Login_Register-Images/cict_bg1.png"
import InputField from "../UI/FormControl/InputField/InputField";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import Checkbox from "../UI/FormControl/Checkbox/Checkbox"
import { Fragment } from "react";
const Login = () =>{
    

    return(
        <Fragment>
            <div className={styles["login-form-container"]}>
                <div className={styles["login-form"]}>
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
                        <p>Welcome Back!</p>
                        <p>Please login to your account</p>
                    </div>

                    <form className={styles["form-container"]} action="" id="login-fields" >
                        <div className={styles["form-field"]}>
                            <InputField 
                                id="userName"
                                type="text"
                                labelName=""
                                inputName="username"
                                placeholder="Username or Email"
                                size="lg"
                                noLabel = "no-label-input"
                                custom = "form-control-custom"/>
                            {/* <input type="text" placeholder="Username or Email"/> */}
                        </div>
                        <div className={styles["form-field"]}>
                            <InputField 
                                id="sampleText"
                                type="text"
                                labelName=""
                                inputName="password"
                                placeholder="Password"
                                size="lg"
                                noLabel = "no-label-input"
                                custom = "form-control-custom"/>
                            {/* <input type="password" placeholder="Password"/> */}
                        </div>
                        <div>
                            <div className={styles["form-fields"]}>
                                <Checkbox
                                    id="rememberMe"
                                    name="rememberMe"
                                    label=""
                                    labelName="Remember me"
                                    onChange={null}
                                    type="filter"
                                    custom = "no-height"
                                />
                                {/* <input type="checkbox" name="remember-me" id="remember-me"/>
                                <label for="remember-me">Remember me</label> */}
                            </div>
                            <div className={styles["forgot-password"]}>
                                <h5>Forgot password?</h5>
                            </div>
                        </div>
                        <div className={styles["signin-button-container"]}>
                            <SmallButton label="Sign" type="primary" size="l-l"></SmallButton>
                        </div>
                        <div className={styles["signup-link"]}>
                            <p>Don't have an account?<h5> Sign up</h5></p>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
export default Login;