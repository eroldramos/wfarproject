import React, { Fragment } from "react";
import "../Account/Profile.css";
import Pic from "../Account/img/profpic.jpg";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Profile = () => {
  return (
    <Fragment>
      <h1 className="HEADER">MY ACCOUNT</h1>
      <div className="container">
        <div className="EditButton">
          <button className="Editbtn" onClick={null}>
            Edit Profile
          </button>
        </div>

        <div className="ChangeButton">
          <button className="Changebtn" onClick={null}>
            Change Password
          </button>
        </div>

        <form method="">
          <div className="row">
            <div className="profilepic" onClick={null}>
              <img className="pic" src={Pic} alt="pic" />
            </div>
            <div className="col-md-6">
              <div className="Profile-head">
                <table className="adjustMarginsOfTable">
                  <tr>
                    <td colSpan="2">
                      <h1> Personal Data </h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Name
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Position
                      </p>
                    </td>
                    <td>{null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Employee Number
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Sex
                      </p>
                    </td>
                    <td> {null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Date of Birth
                      </p>
                    </td>
                    <td> {null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Civil Status
                      </p>
                    </td>
                    <td> {null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Address
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h1> Contact Information </h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Phone Number
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Email Address
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h1> Specialization </h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Program
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Profile;
