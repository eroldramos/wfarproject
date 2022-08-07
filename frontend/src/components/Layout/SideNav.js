import { Fragment, useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import ProfileImage from "../../assets/profile.png";
import { useNavigate, NavLink, Link } from "react-router-dom";
import "./SideNav.css";
import { logout } from "../../store/authActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const SideNav = (props) => {
  //HOOKS DECLARATIONS
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //HOOKS-END
  const loggedUser = useSelector((state) => state.login);
  const { error, isLoading, userInfo } = loggedUser;
  //ROUTINGS PROGRAMTICALLY
  const onNavigateToManageSemesters = () => {
    navigate("/manage-semesters/");
  };
  const onNavigateToManageFaculties = () => {
    if (userInfo && userInfo.isAdmin) {
      navigate("/manage-faculty/department-head/");
    } else {
      navigate("/manage-faculty/faculty/");
    }
  };
  const onNavigateToPendingAccounts = () => {
    navigate("/pending-accounts/");
  };

  const onNavigateToDashboard = () => {
    navigate("/dashboard/");
  };

  const onNavigateToFacultySubmission = () => {
    navigate("/facultySubmission/");
  };
  const onNavigateToMySubmission = () => {
    navigate("/mySubmission/");
  };
  //END

  //HANDLERS

  const onLogoutHandler = () => {
    Swal.fire({
      html: "<h4>Logout</h4>" + "<h5>Are you sure you want to logout?</h5>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#BE5A40",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(logout());
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });

    console.log(logout());
  };
  //
  const [profile_pic, setprofile_pic] = useState();
  const [profileInfo, setProfileInfo] = useState({});

  //   useEffect(() => {
  //     if (!userInfo) {
  //       navigate("/");
  //     }
  //   }, [userInfo, dispatch]);

  useEffect(() => {
    const url = "/api/profile/" + userInfo.id;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setprofile_pic(json[0].profile_picture);
        setProfileInfo(json[0]);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchData();
  }, [userInfo, dispatch]);

  const spanElements = document.getElementsByClassName("nav-open-text");
  const liElements = document.getElementsByTagName("li");

  const openNav = () => {
    for (let i = 0; i < spanElements.length; i++) {
      spanElements[i].style.display = "block";
    }

    for (let i = 0; i < spanElements.length; i++) {
      liElements[i].style.justifyContent = "flex-start";
    }

    document.getElementById("nav-open").style.display = "none";
    document.getElementById("nav-close").style.display = "block";
    document.getElementById("side-nav").style.width = "245px";
    document.getElementById("main").style.marginLeft = "245px";
    document.getElementsByClassName("account-profile")[0].style.display =
      "flex";
  };

  const closeNav = () => {
    for (let i = 0; i < spanElements.length; i++) {
      spanElements[i].style.display = "none";
    }

    for (let i = 0; i < spanElements.length; i++) {
      liElements[i].style.justifyContent = "center";
    }

    document.getElementById("nav-open").style.display = "block";
    document.getElementById("nav-close").style.display = "none";
    document.getElementById("side-nav").style.width = "85px";
    document.getElementById("main").style.marginLeft = "85px";
    document.getElementsByClassName("account-profile")[0].style.display =
      "block";
  };

  
    console.log("userInfo", userInfo);

  return (
    <Fragment>
      <div id="side-nav">
        <ul className="side-nav-ul">
          <li id="nav-open" onClick={openNav} title="Open navigation">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.75 16.5H19.25V14.6667H2.75V16.5ZM2.75 11.9167H19.25V10.0833H2.75V11.9167ZM2.75 5.5V7.33333H19.25V5.5H2.75Z"
                fill="white"
              />
            </svg>
          </li>
          <li id="nav-close" onClick={closeNav} title="Close navigation">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4167 5.87575L16.1242 4.58325L11 9.70742L5.87584 4.58325L4.58334 5.87575L9.7075 10.9999L4.58334 16.1241L5.87584 17.4166L11 12.2924L16.1242 17.4166L17.4167 16.1241L12.2925 10.9999L17.4167 5.87575Z"
                fill="white"
              />
            </svg>
          </li>
          <li id="nav-logo" onClick={onNavigateToDashboard}>
            <img src={Logo} />
            <span className="opacity-50 nav-open-text">
              CICT - WFAR
              <br />
              Management System
            </span>
          </li>
          <li
            className={`nav-menu-item ${
              window.location.pathname == "/dashboard/"
                ? "nav-menu-item--active"
                : ""
            }`}
            onClick={onNavigateToDashboard}
            title="Dashboard"
          >
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.81639 0.994385H2.35002C1.72747 0.996624 1.13091 1.24579 0.690644 1.68738C0.250553 2.12915 0.00223802 2.72768 0 3.3524V7.83417V7.83398C0.00223207 8.45865 0.250549 9.05724 0.690644 9.49901C1.13092 9.94059 1.72742 10.1898 2.35002 10.192H6.81658H6.8164C7.43895 10.1898 8.0355 9.9406 8.47577 9.49901C8.91586 9.05723 9.16418 8.4587 9.16642 7.83398V3.35241C9.16418 2.72774 8.91587 2.12915 8.47577 1.68738C8.0355 1.2458 7.439 0.996635 6.8164 0.994389L6.81639 0.994385ZM7.4998 7.83403C7.4998 8.016 7.42781 8.19032 7.29966 8.31889C7.1715 8.44747 6.99777 8.51972 6.81644 8.51972H2.35006C2.1687 8.51972 1.99498 8.44749 1.86684 8.31889C1.7387 8.1903 1.6667 8.01598 1.6667 7.83403V3.35245C1.6667 3.17048 1.73868 2.99616 1.86684 2.86758C1.995 2.73901 2.16872 2.66676 2.35006 2.66676H6.81663H6.81644C6.9978 2.66676 7.17152 2.73899 7.29966 2.86758C7.4278 2.99618 7.4998 3.17049 7.4998 3.35245L7.4998 7.83403Z"
                fill="white"
              />
              <path
                d="M17.65 0.994385H13.1836C12.5611 0.996624 11.9645 1.24579 11.5243 1.68738C11.0842 2.12915 10.8359 2.72768 10.8336 3.3524V7.83417V7.83399C10.8359 8.45866 11.0842 9.05724 11.5243 9.49901C11.9645 9.9406 12.561 10.1898 13.1836 10.192H17.6502H17.65C18.2726 10.1898 18.8691 9.9406 19.3094 9.49901C19.7495 9.05723 19.9978 8.4587 20 7.83399V3.35241C19.9978 2.72774 19.7495 2.12915 19.3094 1.68738C18.8691 1.2458 18.2726 0.996635 17.65 0.994389L17.65 0.994385ZM18.3334 7.83403C18.3334 8.016 18.2614 8.19032 18.1333 8.3189C18.0051 8.44747 17.8314 8.51972 17.6501 8.51972H13.1837C13.0023 8.51972 12.8286 8.44749 12.7005 8.3189C12.5723 8.1903 12.5003 8.01598 12.5003 7.83403V3.35245C12.5003 3.17048 12.5723 2.99616 12.7005 2.86758C12.8286 2.73901 13.0023 2.66676 13.1837 2.66676H17.6503H17.6501C17.8314 2.66676 18.0052 2.73899 18.1333 2.86758C18.2614 2.99618 18.3334 3.1705 18.3334 3.35245L18.3334 7.83403Z"
                fill="white"
              />
              <path
                d="M6.81639 11.8645H2.35002C1.72747 11.8667 1.13091 12.1159 0.690644 12.5575C0.250553 12.9993 0.00223802 13.5978 0 14.2225V18.7043V18.7041C0.00223207 19.3288 0.250549 19.9274 0.690644 20.3691C1.13092 20.8107 1.72742 21.0599 2.35002 21.0621H6.81658H6.8164C7.43895 21.0599 8.0355 20.8107 8.47577 20.3691C8.91586 19.9273 9.16418 19.3288 9.16642 18.7041V14.2225C9.16418 13.5979 8.91587 12.9993 8.47577 12.5575C8.0355 12.1159 7.439 11.8668 6.8164 11.8645L6.81639 11.8645ZM7.4998 18.7041C7.4998 18.8861 7.42781 19.0604 7.29966 19.189C7.1715 19.3176 6.99777 19.3898 6.81644 19.3898H2.35006C2.1687 19.3898 1.99498 19.3176 1.86684 19.189C1.7387 19.0604 1.6667 18.8861 1.6667 18.7041V14.2226C1.6667 14.0406 1.73868 13.8663 1.86684 13.7377C1.995 13.6091 2.16872 13.5369 2.35006 13.5369H6.81663H6.81644C6.9978 13.5369 7.17152 13.6091 7.29966 13.7377C7.4278 13.8663 7.4998 14.0406 7.4998 14.2226L7.4998 18.7041Z"
                fill="white"
              />
              <path
                d="M17.65 11.864H13.1836C12.5611 11.8663 11.9645 12.1154 11.5243 12.557C11.0842 12.9988 10.8359 13.5973 10.8336 14.222V18.7038V18.7036C10.8359 19.3283 11.0842 19.9269 11.5243 20.3686C11.9645 20.8102 12.561 21.0594 13.1836 21.0616H17.6502H17.65C18.2726 21.0594 18.8691 20.8102 19.3094 20.3686C19.7495 19.9269 19.9978 19.3283 20 18.7036V14.222C19.9978 13.5974 19.7495 12.9988 19.3094 12.557C18.8691 12.1154 18.2726 11.8663 17.65 11.864L17.65 11.864ZM18.3334 18.7036C18.3334 18.8856 18.2614 19.0599 18.1333 19.1885C18.0051 19.3171 17.8314 19.3893 17.6501 19.3893H13.1837C13.0023 19.3893 12.8286 19.3171 12.7005 19.1885C12.5723 19.0599 12.5003 18.8856 12.5003 18.7036V14.2221C12.5003 14.0401 12.5723 13.8658 12.7005 13.7372C12.8286 13.6086 13.0023 13.5364 13.1837 13.5364H17.6503H17.6501C17.8314 13.5364 18.0052 13.6086 18.1333 13.7372C18.2614 13.8658 18.3334 14.0401 18.3334 14.2221L18.3334 18.7036Z"
                fill="white"
              />
            </svg>
            <span className="nav-open-text">Dashboard</span>
          </li>

          {userInfo.isAdmin && (
            <li
              className={`nav-menu-item ${
                window.location.pathname == "/manage-semesters/" ||
                window.location.pathname == "/manage-semesters/archives/" ||
                `/${window.location.pathname.split("/")[1]}/` ==
                  "/edit-semester/" ||
                window.location.pathname == "/create-semester"
                  ? "nav-menu-item--active"
                  : ""
              }`}
              onClick={onNavigateToManageSemesters}
              title="Manage Semesters"
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3333 1.31428H18.6667V0.657134C18.6667 0.422293 18.5396 0.205357 18.3333 0.0880102C18.1271 -0.0293367 17.8729 -0.0293367 17.6667 0.0880102C17.4604 0.205357 17.3333 0.422301 17.3333 0.657134V1.31428H14.6667V0.657134C14.6667 0.422293 14.5396 0.205357 14.3333 0.0880102C14.1271 -0.0293367 13.8729 -0.0293367 13.6667 0.0880102C13.4604 0.205357 13.3333 0.422301 13.3333 0.657134V1.31428H10.6667V0.657134C10.6667 0.422293 10.5396 0.205357 10.3333 0.0880102C10.1271 -0.0293367 9.87291 -0.0293367 9.66667 0.0880102C9.46042 0.205357 9.33333 0.422301 9.33333 0.657134V1.31428H6.66667V0.657134C6.66667 0.422293 6.53959 0.205357 6.33333 0.0880102C6.12708 -0.0293367 5.87291 -0.0293367 5.66667 0.0880102C5.46042 0.205357 5.33333 0.422301 5.33333 0.657134V1.31428H2.66667V0.657134C2.66667 0.422293 2.53958 0.205357 2.33333 0.0880102C2.12708 -0.0293367 1.87291 -0.0293367 1.66667 0.0880102C1.46042 0.205357 1.33333 0.422301 1.33333 0.657134V1.31428H0.666667C0.489882 1.31428 0.320236 1.38351 0.195238 1.50673C0.07024 1.62994 0 1.79716 0 1.97142V17.7429C0 17.9171 0.07024 18.0843 0.195238 18.2076C0.320236 18.3308 0.489882 18.4 0.666667 18.4H19.3333C19.5101 18.4 19.6798 18.3308 19.8048 18.2076C19.9298 18.0843 20 17.9171 20 17.7429V1.97142C20 1.79716 19.9298 1.62994 19.8048 1.50673C19.6798 1.38351 19.5101 1.31428 19.3333 1.31428ZM1.33333 2.62856H18.6667V3.94285H1.33333V2.62856ZM18.6667 17.0857H1.33333V5.25714H18.6667V17.0857ZM3.33333 9.85714H6C6.17679 9.85714 6.34643 9.7879 6.47143 9.66469C6.59643 9.54148 6.66667 9.37425 6.66667 9.2V7.22857C6.66667 7.05431 6.59643 6.88708 6.47143 6.76387C6.34643 6.64066 6.17679 6.57142 6 6.57142H3.33333C3.15655 6.57142 2.9869 6.64066 2.8619 6.76387C2.73691 6.88708 2.66667 7.05431 2.66667 7.22857V9.2C2.66667 9.37425 2.73691 9.54148 2.8619 9.66469C2.9869 9.7879 3.15655 9.85714 3.33333 9.85714ZM4 7.88571H5.33333V8.54285H4V7.88571ZM8.66667 9.85714H11.3333C11.5101 9.85714 11.6798 9.7879 11.8048 9.66469C11.9298 9.54148 12 9.37425 12 9.2V7.22857C12 7.05431 11.9298 6.88708 11.8048 6.76387C11.6798 6.64066 11.5101 6.57142 11.3333 6.57142H8.66667C8.48988 6.57142 8.32024 6.64066 8.19524 6.76387C8.07024 6.88708 8 7.05431 8 7.22857V9.2C8 9.37425 8.07024 9.54148 8.19524 9.66469C8.32024 9.7879 8.48988 9.85714 8.66667 9.85714ZM9.33333 7.88571H10.6667V8.54285H9.33333V7.88571ZM14 9.85714H16.6667C16.8435 9.85714 17.0131 9.7879 17.1381 9.66469C17.2631 9.54148 17.3333 9.37425 17.3333 9.2V7.22857C17.3333 7.05431 17.2631 6.88708 17.1381 6.76387C17.0131 6.64066 16.8435 6.57142 16.6667 6.57142H14C13.8232 6.57142 13.6536 6.64066 13.5286 6.76387C13.4036 6.88708 13.3333 7.05431 13.3333 7.22857V9.2C13.3333 9.37425 13.4036 9.54148 13.5286 9.66469C13.6536 9.7879 13.8232 9.85714 14 9.85714ZM14.6667 7.88571H16V8.54285H14.6667V7.88571ZM2.66667 11.8286C2.66667 11.6543 2.73691 11.4871 2.8619 11.3639C2.9869 11.2407 3.15655 11.1714 3.33333 11.1714H6C6.23824 11.1714 6.45832 11.2967 6.57737 11.5C6.69642 11.7033 6.69642 11.9538 6.57737 12.1571C6.45832 12.3604 6.23824 12.4857 6 12.4857H3.33333C3.15655 12.4857 2.9869 12.4165 2.8619 12.2933C2.73691 12.17 2.66667 12.0028 2.66667 11.8286ZM8 11.8286C8 11.6543 8.07024 11.4871 8.19524 11.3639C8.32024 11.2407 8.48988 11.1714 8.66667 11.1714H11.3333C11.5716 11.1714 11.7917 11.2967 11.9107 11.5C12.0298 11.7033 12.0298 11.9538 11.9107 12.1571C11.7917 12.3604 11.5716 12.4857 11.3333 12.4857H8.66667C8.48988 12.4857 8.32024 12.4165 8.19524 12.2933C8.07024 12.17 8 12.0028 8 11.8286ZM13.3333 11.8286C13.3333 11.6543 13.4036 11.4871 13.5286 11.3639C13.6536 11.2407 13.8232 11.1714 14 11.1714H16.6667C16.9049 11.1714 17.125 11.2967 17.244 11.5C17.3631 11.7033 17.3631 11.9538 17.244 12.1571C17.125 12.3604 16.9049 12.4857 16.6667 12.4857H14C13.8232 12.4857 13.6536 12.4165 13.5286 12.2933C13.4036 12.17 13.3333 12.0028 13.3333 11.8286ZM2.66667 13.8C2.66667 13.6257 2.73691 13.4585 2.8619 13.3353C2.9869 13.2121 3.15655 13.1429 3.33333 13.1429H6C6.23824 13.1429 6.45832 13.2681 6.57737 13.4714C6.69642 13.6747 6.69642 13.9253 6.57737 14.1286C6.45832 14.3319 6.23824 14.4571 6 14.4571H3.33333C3.15655 14.4571 2.9869 14.3879 2.8619 14.2647C2.73691 14.1415 2.66667 13.9743 2.66667 13.8Z"
                  fill="white"
                />
              </svg>
              <span className="nav-open-text">Manage Semesters</span>
            </li>
          )}

          {userInfo.isAdmin ||
          userInfo.userType == 2 ||
          userInfo.userType == 3 ? (
            <li
              className={`nav-menu-item ${
                window.location.pathname == "/facultySubmission/" ||
                window.location.pathname == "/facultySubmission/overview" ||
                window.location.pathname == "/facultySubmission/weekly-view"
                  ? "nav-menu-item--active"
                  : ""
              }`}
              onClick={onNavigateToFacultySubmission}
              title="Faculty Submissions"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.22227 17.778H17.7777V2.22252H2.22227V17.778ZM17.7777 0C19.0056 0 20 0.994436 20 2.22227V17.7777C20 19.0056 19.0056 20 17.7777 20H2.22227C0.994436 20 0 19.0056 0 17.7777V2.22227C0 0.994436 0.994436 0 2.22227 0L17.7777 0ZM9.99982 16.6669C10.6142 16.6669 11.1109 16.1703 11.1109 15.5557V7.77781C11.1109 7.16451 10.6142 6.66676 9.99982 6.66676C9.38542 6.66676 8.88878 7.16455 8.88878 7.77781V15.5557C8.88878 16.1703 9.38542 16.6669 9.99982 16.6669ZM14.4445 16.6669C15.0589 16.6669 15.5555 16.1703 15.5555 15.5557V5.55565C15.5555 4.94236 15.0589 4.4446 14.4445 4.4446C13.83 4.4446 13.3333 4.94239 13.3333 5.55565V15.5557C13.3333 16.1703 13.83 16.6669 14.4445 16.6669ZM5.5555 16.6669C6.17004 16.6669 6.66669 16.1703 6.66669 15.5557V10.0003C6.66669 9.38703 6.17004 8.88928 5.5555 8.88928C4.94111 8.88928 4.44446 9.38707 4.44446 10.0003V15.5557C4.44446 16.1703 4.94111 16.6669 5.5555 16.6669Z"
                  fill="white"
                />
              </svg>
              <span className="nav-open-text">Faculty Submissions</span>
            </li>
          ) : (
            ""
          )}

          {!userInfo.isAdmin && (
            <li
              className={`nav-menu-item ${
                window.location.pathname == "/mySubmission/" ||
                window.location.pathname == "/mySubmission/archived" ||
                window.location.pathname == "/mySubmission"
                  ? "nav-menu-item--active"
                  : ""
              }`}
              onClick={onNavigateToMySubmission}
              title="My Submissions"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0475 1.71415H14.9998V1.19041C14.9998 0.523746 14.476 0 13.8094 0C13.1427 0 12.619 0.523746 12.619 1.19041L12.6188 1.71415H7.38094V1.19041C7.38094 0.523746 6.85719 0 6.19053 0C5.52387 0 5.00012 0.523746 5.00012 1.19041L4.99996 1.71415H0.952284C0.428538 1.71415 0 2.1904 0 2.69039V18.0711C0 18.6186 0.428538 19.0947 0.952284 19.0947H19.0476C19.5713 19.0947 19.9998 18.6184 19.9998 18.0947L20 2.69023C20 2.19023 19.5715 1.71415 19.0477 1.71415H19.0475ZM18.095 17.1903H1.90473V3.61914H4.99991V4.21434C4.99991 4.881 5.52366 5.40475 6.19032 5.40475C6.85698 5.40475 7.38072 4.881 7.38072 4.21434L7.38089 3.61914H12.6188V4.21434C12.6188 4.881 13.1425 5.40475 13.8092 5.40475C14.4758 5.40475 14.9996 4.881 14.9996 4.21434V3.61914H18.0948L18.095 17.1903Z"
                  fill="white"
                />
                <path
                  d="M15.0476 8.14258H9.00014C8.47639 8.14258 8.04785 8.57112 8.04785 9.09486C8.04785 9.61861 8.47639 10.0471 9.00014 10.0471H15.0713C15.5951 10.0471 16.0236 9.61861 16.0236 9.09486C16.0236 8.57112 15.5951 8.14258 15.0475 8.14258H15.0476Z"
                  fill="white"
                />
                <path
                  d="M15.0476 12.4282H9.00014C8.47639 12.4282 8.04785 12.8568 8.04785 13.3805C8.04785 13.9043 8.47639 14.3328 9.00014 14.3328H15.0713C15.5951 14.3328 16.0236 13.9043 16.0236 13.3805C16.0236 12.8568 15.5951 12.4282 15.0475 12.4282H15.0476Z"
                  fill="white"
                />
                <path
                  d="M6.23805 8.14258H4.92848C4.40473 8.14258 3.9762 8.57112 3.9762 9.09486C3.9762 9.61861 4.40473 10.0471 4.92848 10.0471H6.23805C6.7618 10.0471 7.19034 9.61861 7.19034 9.09486C7.19034 8.57112 6.78556 8.14258 6.23805 8.14258Z"
                  fill="white"
                />
                <path
                  d="M6.23805 12.4282H4.92848C4.40473 12.4282 3.9762 12.8568 3.9762 13.3805C3.9762 13.9043 4.40473 14.3328 4.92848 14.3328H6.23805C6.7618 14.3328 7.19034 13.9043 7.19034 13.3805C7.19034 12.8568 6.78556 12.4282 6.23805 12.4282Z"
                  fill="white"
                />
              </svg>
              <span className="nav-open-text">My Submissions</span>
            </li>
          )}
          {userInfo.isAdmin ||
          userInfo.userType == 2 ||
          userInfo.userType == 3 ? (
            <li
              className={`nav-menu-item ${
                window.location.pathname ==
                  "/manage-faculty/department-head/" ||
                window.location.pathname == "/manage-faculty/area-chair/" ||
                window.location.pathname == "/manage-faculty/faculty/" ||
                window.location.pathname.split("/")[3] == "assigned-faculty" ||
                window.location.pathname.split("/")[3] ==
                  "unassigned-faculty" ||
                window.location.pathname.split("/")[3] == "department-head" ||
                window.location.pathname.split("/")[3] == "area-chair"
                  ? "nav-menu-item--active"
                  : ""
              }`}
              onClick={onNavigateToManageFaculties}
              title="Manage Faculty"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4.90757V2.87053C10 1.75016 9.1 0.833496 8 0.833496H2C0.9 0.833496 0 1.75016 0 2.87053V17.1298C0 18.2502 0.9 19.1668 2 19.1668H18C19.1 19.1668 20 18.2502 20 17.1298V6.94461C20 5.82424 19.1 4.90757 18 4.90757H10ZM4 17.1298H2V15.0928H4V17.1298ZM4 13.0557H2V11.0187H4V13.0557ZM4 8.98164H2V6.94461H4V8.98164ZM4 4.90757H2V2.87053H4V4.90757ZM8 17.1298H6V15.0928H8V17.1298ZM8 13.0557H6V11.0187H8V13.0557ZM8 8.98164H6V6.94461H8V8.98164ZM8 4.90757H6V2.87053H8V4.90757ZM17 17.1298H10V15.0928H12V13.0557H10V11.0187H12V8.98164H10V6.94461H17C17.55 6.94461 18 7.40294 18 7.96313V16.1113C18 16.6715 17.55 17.1298 17 17.1298ZM16 8.98164H14V11.0187H16V8.98164ZM16 13.0557H14V15.0928H16V13.0557Z"
                  fill="white"
                />
              </svg>
              <span className="nav-open-text">Manage Faculty</span>
            </li>
          ) : (
            ""
          )}

          {userInfo.isAdmin ||
          userInfo.userType == 2 ||
          userInfo.userType == 3 ? (
            <li
              className={`nav-menu-item ${
                window.location.pathname == "/pending-accounts/"
                  ? "nav-menu-item--active"
                  : ""
              }`}
              onClick={onNavigateToPendingAccounts}
              title="Pending Accounts"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10.625C11.3583 10.625 12.5583 10.95 13.5333 11.375C14.4333 11.775 15 12.675 15 13.65V14.1667C15 14.625 14.625 15 14.1667 15H5.83333C5.375 15 5 14.625 5 14.1667V13.6583C5 12.675 5.56667 11.775 6.46667 11.3833C7.44167 10.95 8.64167 10.625 10 10.625ZM3.33333 10.8333C4.25 10.8333 5 10.0833 5 9.16667C5 8.25 4.25 7.5 3.33333 7.5C2.41667 7.5 1.66667 8.25 1.66667 9.16667C1.66667 10.0833 2.41667 10.8333 3.33333 10.8333ZM4.275 11.75C3.96667 11.7 3.65833 11.6667 3.33333 11.6667C2.50833 11.6667 1.725 11.8417 1.01667 12.15C0.4 12.4167 0 13.0167 0 13.6917V14.1667C0 14.625 0.375 15 0.833333 15H3.75V13.6583C3.75 12.9667 3.94167 12.3167 4.275 11.75ZM16.6667 10.8333C17.5833 10.8333 18.3333 10.0833 18.3333 9.16667C18.3333 8.25 17.5833 7.5 16.6667 7.5C15.75 7.5 15 8.25 15 9.16667C15 10.0833 15.75 10.8333 16.6667 10.8333ZM20 13.6917C20 13.0167 19.6 12.4167 18.9833 12.15C18.275 11.8417 17.4917 11.6667 16.6667 11.6667C16.3417 11.6667 16.0333 11.7 15.725 11.75C16.0583 12.3167 16.25 12.9667 16.25 13.6583V15H19.1667C19.625 15 20 14.625 20 14.1667V13.6917ZM10 5C11.3833 5 12.5 6.11667 12.5 7.5C12.5 8.88333 11.3833 10 10 10C8.61667 10 7.5 8.88333 7.5 7.5C7.5 6.11667 8.61667 5 10 5Z"
                  fill="white"
                />
              </svg>
              <span className="nav-open-text">Pending Accounts</span>
            </li>
          ) : (
            ""
          )}
        </ul>

        <div className="nav-footer">
          <div className="account-profile" title="Account">
            <Link
              className="account-profile-image-container"
              to={"/UserProfile/"}
            >
              <div
                style={{
                  backgroundImage: "url(" + profile_pic + ")",
                }}
              ></div>
            </Link>
            <div className="account-label nav-open-text">
              <span className="account-label-name">{profileInfo.name}</span>
              <span className="account-label-type">
                {profileInfo.user_type == 0 && "Administrator"}
                {!profileInfo.isAdmin &&
                  profileInfo.user_type == 1 &&
                  "Faculty"}
                {!profileInfo.isAdmin &&
                  profileInfo.user_type == 2 &&
                  "Area Chair"}
                {!profileInfo.isAdmin &&
                  profileInfo.user_type == 3 &&
                  "Department Head"}
              </span>
            </div>
          </div>

          <div className="nav-footer-menu-item" onClick={onLogoutHandler}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.60092 17.4074C7.12171 17.4074 7.5439 17.8404 7.5439 18.3745C7.5439 18.9086 7.12171 19.3416 6.60092 19.3416H3.77195C1.68876 19.3416 0 17.6097 0 15.4732V3.86831C0 1.7319 1.68876 0 3.77195 0H6.60092C7.12171 0 7.5439 0.432975 7.5439 0.967078C7.5439 1.50118 7.12171 1.93416 6.60092 1.93416H3.77195C2.73036 1.93416 1.88598 2.80011 1.88598 3.86831V15.4732C1.88598 16.5414 2.73036 17.4074 3.77195 17.4074H6.60092ZM10.22 4.87847C10.22 3.81027 11.0644 2.94432 12.106 2.94432C12.5254 2.94432 12.9328 3.08768 13.2639 3.35174L19.2718 8.14396C20.094 8.79978 20.2421 10.015 19.6026 10.8582C19.5065 10.9849 19.3954 11.0989 19.2718 11.1974L13.2639 15.9896C12.4417 16.6455 11.2568 16.4936 10.6173 15.6504C10.3598 15.3109 10.22 14.893 10.22 14.4629V12.5719H6.44807C4.88567 12.5719 3.6191 11.273 3.6191 9.67069C3.6191 8.06839 4.88567 6.76946 6.44807 6.76946H10.22V4.87847ZM12.106 14.4629L18.1139 9.67069L12.106 4.87847V7.73654C12.106 8.27064 11.6838 8.70362 11.163 8.70362H6.44807C5.92727 8.70362 5.50508 9.13659 5.50508 9.67069C5.50508 10.2048 5.92727 10.6378 6.44807 10.6378H11.163C11.6838 10.6378 12.106 11.0707 12.106 11.6048V14.4629Z"
                fill="white"
              />
            </svg>
            <span className="nav-open-text">Logout</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideNav;
