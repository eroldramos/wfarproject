import {
  authLoginActions,
  authRegisterActions,
  forgetPasswordActions,
  resetPasswordActions,
} from "./authReducers";
import styles from "../components/Login_Register/Register.module.css";
import Swal from "sweetalert2";
export const login = (username, password, loginMode) => {
  return async (dispatch, getState) => {
    let url = "/api/faculty-login/";

    if (loginMode === "Admin") {
      url = "/api/admin-login/";
    }

    try {
      dispatch(authLoginActions.loginRequest());

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = data.detail;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      console.log(data);

      dispatch(authLoginActions.loginSuccess({ userInfo: data }));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
      dispatch(authLoginActions.loginFail({ error: error.message }));
    }
  };
};

export const register = (registrationObj) => {
  return async (dispatch, getState) => {
    let url = "/api/faculty-register/";

    try {
      dispatch(authRegisterActions.registerRequest());

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(registrationObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errors = [];
        console.log(data.errors);
        for (let error of data.errors) {
          errors.push(new Error(error));
        }
        if (errors.length > 0) {
          throw errors;
        }
      }

      const data = await response.json();

      console.log(data);

      dispatch(authRegisterActions.registerSuccess({ success: data.detail }));
    } catch (errors) {
      console.log(errors[0]);
      let errorMessages = [];
      for (let error of errors) {
        errorMessages.push(error.message);
        console.log(error.message);
      }
      dispatch(authRegisterActions.registerFail({ error: errorMessages }));

      let htmlString = "";

      errors.map((err, index) => (htmlString += `<p>${err}</p>`));

      Swal.fire({
        html: `
        
        <div class=${styles["error-handler-container"]}>
            ${htmlString}
          </div>
        `,
        icon: "warning",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "OK",
        // iconColor: "#D1D1D1", // question icon color
        confirmButtonColor: "#BE5A40",
        cancelButtonColor: "#A1A1A1",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate("/");
        } else if (result.isDenied) {
        } else if (result.isDismissed) {
        }
      });
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    dispatch(authLoginActions.logout());
    localStorage.removeItem("userInfo");
  };
};

export const forgetPassword = (obj) => {
  return async (dispatch, getState) => {
    let url = "/api/forgot-password/";

    try {
      dispatch(forgetPasswordActions.forgetPasswordRequest());

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = data.detail;
        console.log(data);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      dispatch(
        forgetPasswordActions.forgetPasswordSuccess({ success: data.detail })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        forgetPasswordActions.forgetPasswordFail({ error: error.message })
      );
    }
  };
};

export const resetPassword = (obj, token) => {
  return async (dispatch, getState) => {
    let url = `/api/reset-password/${token}/`;

    try {
      dispatch(resetPasswordActions.resetPasswordRequest());

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = data.detail;
        console.log(data);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      dispatch(
        resetPasswordActions.resetPasswordSuccess({ success: data.detail })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        resetPasswordActions.resetPasswordFail({ error: error.message })
      );
    }
  };
};
