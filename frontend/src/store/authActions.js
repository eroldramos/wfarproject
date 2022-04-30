import { authLoginActions, authRegisterActions } from "./authReducers";

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
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    dispatch(authLoginActions.logout());
    localStorage.removeItem("userInfo");
  };
};
