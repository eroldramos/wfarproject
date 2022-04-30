import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { logout } from "../../store/authActions";
function DummyDashBoard() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const loggedUser = useSelector((state) => state.login);
  const { error, loading, userInfo } = loggedUser;

  const onLogoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <Fragment>
      DummyDashBoard
      <button onClick={onLogoutHandler}>Logout</button>
    </Fragment>
  );
}

export default DummyDashBoard;
