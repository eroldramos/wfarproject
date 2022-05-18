import styles from "./Login.module.css";
import cictLogo from "../../assets/Login_Register-Images/cict-logo.png";
import cictBg from "../../assets/Login_Register-Images/cict_bg1.png";
import InputField from "../UI/FormControl/InputField/InputField";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import Checkbox from "../UI/FormControl/Checkbox/Checkbox";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import UserRegister from "./UserRegister";
import { Routes, Route } from "react-router-dom";
const Login = () => {
  const isLogin = false;
  return (
    <div>
      <div
        className={styles["background-image"]}
        style={{ backgroundImage: "url(" + cictBg + ")" }}
      ></div>
      <div className={styles["overlay"]}></div>
      <div className={styles["logo-splashscreen"]}>
        <div className={styles["logo-splashscreen1"]}>
          <div className={styles["image-container"]}>
            <img src={cictLogo} />
          </div>
        </div>
        <div className={styles["logo-splashscreen2"]}>
          <div className={styles["logo-text"]}>
            <p className={styles["cict-wfar"]}>CICT - WFAR</p>
            <p className={styles["management-system"]}>Management System</p>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="" element={<UserLogin />} />
        <Route path="register/" element={<UserRegister />} />
        <Route path="admin-login/" element={<AdminLogin />} />
      </Routes>
      {/* {isLogin && <UserLogin></UserLogin>}
      {!isLogin && <UserRegister></UserRegister>} */}
    </div>
  );
};
export default Login;
