import React, { Fragment } from "react";
import "../Account/Profile.css";
import Pic from "../Account/img/profpic.jpg";
<<<<<<< HEAD
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default class Profile extends React.Component {

=======
import Swal from "sweetalert2/dist/sweetalert2.js";
import InputField from "../UI/FormControl/InputField/InputField";

export default class Profile extends React.Component {
>>>>>>> 773d7d1215d5de9a952390641602fb06a3a5581e
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getDetails();
  }

  getDetails() {
<<<<<<< HEAD
    fetch('/api/profile/')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data[0]
=======
    fetch("/api/profile/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data[0],
>>>>>>> 773d7d1215d5de9a952390641602fb06a3a5581e
        });
      });
  }

  editButtonClicled(e) {
    Swal.fire({
<<<<<<< HEAD
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'Cool', showConfirmButton: false,
=======
      title: "Error!",
      text: "Do you want to continue",
      icon: "success",
      confirmButtonText: "Cool",
      showConfirmButton: false,
>>>>>>> 773d7d1215d5de9a952390641602fb06a3a5581e
      timer: 3000,
      timerProgressBar: true,
    });
  }

  changePasswordButtonClicked(e) {
    Swal.fire({
      title: "Change Password",
      text: "Do you want to continue",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  }

  profilePictureClicked(e) {
    Swal.fire({
      title: "profile Pic change",
      text: "Do you want to continue",
      icon: "error",
      confirmButtonText: "Cool",
    });
  }

  userTypeSwitch() {
<<<<<<< HEAD
    if (this.state.data.user_type === 1) {
      return <h4 style={{ color: '#000000' }}> Faculty </h4>
    } else if (this.state.data.user_type === 2) {
      return <h4 style={{ color: '#000000' }}> Area Chair </h4>
    } else if (this.state.data.user_type === 3) {
      return <h4 style={{ color: '#000000' }}> Department Head </h4>
    } else {
      return <h4 style={{ color: '#000000' }}> None </h4>
    }
  }

  sexSwitch() {
    if (this.state.data.sex === 1) {
      return <h4 style={{ color: '#000000' }}> Male </h4>
    } else if (this.state.data.sex === 2) {
      return <h4 style={{ color: '#000000' }}> Female </h4>
    } else if (this.state.data.sex === 3) {
      return <h4 style={{ color: '#000000' }}> Others </h4>
    }
  }

  civilStatusSwitch() {
    if (this.state.data.civil_status === 1) {
      return <h4 style={{ color: '#000000' }}> Single </h4>
    } else if (this.state.data.civil_status === 2) {
      return <h4 style={{ color: '#000000' }}> Married </h4>
    } else if (this.state.data.civil_status === 3) {
      return <h4 style={{ color: '#000000' }}> Widowed </h4>
    }
  }

  profilePictureSwitch() {
    if (this.state.data.profile_picture == null || this.state.data.profile_picture == "") {
      return <img className="pic" src={Pic} alt="pic" />
    } else {
      return <img className="pic" src={this.state.data.profile_picture} alt="pic" />
=======
    if (this.state.data.user_type == 1) {
      return <h5 style={{ color: "#C0C0C0" }}> Faculty </h5>;
    } else if (this.state.data.user_type == 2) {
      return <h5 style={{ color: "#C0C0C0" }}> Area Chair </h5>;
    } else if (this.state.data.user_type == 3) {
      return <h5 style={{ color: "#C0C0C0" }}> Department Head </h5>;
    }
  }

  sexSwitch() {
    if (this.state.data.sex == 1) {
      return <h5 style={{ color: "#C0C0C0" }}> Male </h5>;
    } else if (this.state.data.sex == 2) {
      return <h5 style={{ color: "#C0C0C0" }}> Female </h5>;
    } else if (this.state.data.sex == 3) {
      return <h5 style={{ color: "#C0C0C0" }}> Others </h5>;
    }
  }

  civilStatusSwitch() {
    if (this.state.data.civil_status == 1) {
      return <h5 style={{ color: "#C0C0C0" }}> Single </h5>;
    } else if (this.state.data.civil_status == 2) {
      return <h5 style={{ color: "#C0C0C0" }}> Married </h5>;
    } else if (this.state.data.civil_status == 3) {
      return <h5 style={{ color: "#C0C0C0" }}> Widowed </h5>;
>>>>>>> 773d7d1215d5de9a952390641602fb06a3a5581e
    }
  }

  birthdayCalculator() {
    let date = new Date(this.state.data.birthdate);
<<<<<<< HEAD
    let month = date.toLocaleString('en-us', { month: 'long' });
    return <h4 style={{ color: '#000000' }}> {month + ' ' + date.getDate() + ', ' + date.getFullYear()}</h4>
=======
    let month = date.toLocaleString("en-us", { month: "long" });
    return (
      <h5 style={{ color: "#C0C0C0" }}>
        {" "}
        {month + " " + date.getDate() + ", " + date.getFullYear()}
      </h5>
    );
>>>>>>> 773d7d1215d5de9a952390641602fb06a3a5581e
  }

  render() {
    return (
      <Fragment>
<<<<<<< HEAD
        <h1 className="HEADER">MY ACCOUNT</h1>
        <div className='container'>
          <div className='EditButton'>
            <button className="Editbtn" onClick={this.editButtonClicled}>Edit Profile</button>
          </div>

          <div className='ChangeButton' >
            <button className="Changebtn" onClick={this.changePasswordButtonClicked}> Change Password</button>
          </div>

          <form method="">
            <div className='row'>
              <div className='profilepic' onClick={this.profilePictureClicked}>
                {this.profilePictureSwitch()}
              </div>
              <div className='col-md-6'>
                <div className='Profile-head'>
                  <table className="adjustMarginsOfTable">
                    <tr>
                      <td colSpan="2"><h1> Personal Data </h1></td>
                    </tr>
                    <tr>
                      <td><h5 style={{ color: '#C0C0C0' }}>Name </h5></td>
                      <td><h4 style={{ color: '#000000' }}>{this.state.data.name} </h4></td>
                    </tr>
                    <tr>
                      <td> <h5 style={{ color: '#C0C0C0' }}>Position </h5></td>
                      <td>{this.userTypeSwitch()}</td>
                    </tr>
                    <tr>
                      <td> <h5 style={{ color: '#C0C0C0' }}>Employee Number     </h5></td>
                      <td><h4 style={{ color: '#000000' }}> {this.state.data.emp_no}</h4></td>
                    </tr>
                    <tr>
                      <td> <h5 style={{ color: '#C0C0C0' }}>Sex </h5></td>
                      <td> {this.sexSwitch()}</td>
                    </tr>
                    <tr>
                      <td><h5 style={{ color: '#C0C0C0' }}>Date of Birth </h5></td>
                      <td> {this.birthdayCalculator()}</td>
                    </tr>
                    <tr>
                      <td> <h5 style={{ color: '#C0C0C0' }}>Civil Status </h5></td>
                      <td> {this.civilStatusSwitch()}</td>
                    </tr>
                    <tr>
                      <td><h5 style={{ color: '#C0C0C0' }}>Address </h5></td>
                      <td><h4 style={{ color: '#000000' }}> {this.state.data.house_no + ' ' + this.state.data.street
                        + ' St., ' + this.state.data.subdivision
                        + ' ' + this.state.data.barangay
                        + ' ' + this.state.data.municipality
                        + ', ' + this.state.data.province} </h4></td>
                    </tr>
                    <tr>
                      <td colSpan="2"> <h1> Contact Information </h1></td>
                    </tr>
                    <tr>
                      <td><h5 style={{ color: '#C0C0C0' }}>Phone Number </h5></td>
                      <td><h4 style={{ color: '#000000' }}>{this.state.data.contact_no} </h4></td>
                    </tr>
                    <tr>
                      <td> <h5 style={{ color: '#C0C0C0' }}>Email Address </h5></td>
                      <td><h4 style={{ color: '#000000' }}> {this.state.data.email}</h4></td>
                    </tr>
                    <tr>
                      <td colSpan="2">  <h1> Specialization </h1></td>
                    </tr>
                    <tr>
                      <td> <h5 style={{ color: '#C0C0C0' }}>Program </h5></td>
                      <td><h4 style={{ color: '#000000' }}> {this.state.data.specialization} </h4></td>
                    </tr>
                  </table>
=======
        <h1 class="HEADER">MY ACCOUNT</h1>
        <div className="container">
          <div className="EditButton">
            <button class="Editbtn" onClick={this.editButtonClicled}>
              Edit Profile
            </button>
          </div>

          <div className="ChangeButton">
            <button
              class="Changebtn"
              onClick={this.changePasswordButtonClicked}
            >
              {" "}
              Change Password
            </button>
          </div>

          <form method="">
            <div className="row">
              <div className="profilepic" onClick={this.profilePictureClicked}>
                <img
                  className="pic"
                  src={this.state.data.profile_picture}
                  alt="pi"
                />
              </div>
              <div className="col-md-6">
                <div className="Profile-head">
                  <h1> Personal Data </h1>
                  <h5 style={{ color: "#C0C0C0" }}>{this.state.data.name} </h5>
                  {this.userTypeSwitch()}
                  <h5 style={{ color: "#C0C0C0" }}>
                    {" "}
                    {this.state.data.emp_no}
                  </h5>
                  {this.sexSwitch()}
                  {this.birthdayCalculator()}
                  {this.civilStatusSwitch()}
                  <h5 style={{ color: "#C0C0C0" }}>
                    {" "}
                    {this.state.data.house_no +
                      " " +
                      this.state.data.street +
                      " St., " +
                      this.state.data.subdivision +
                      " " +
                      this.state.data.barangay +
                      " " +
                      this.state.data.municipality +
                      ", " +
                      this.state.data.province}{" "}
                  </h5>
                  <h1> Contact Information </h1>
                  <h5 style={{ color: "#C0C0C0" }}>
                    {this.state.data.contact_no}{" "}
                  </h5>
                  <h5 style={{ color: "#C0C0C0" }}> {this.state.data.email}</h5>
                  <h1> Specialization </h1>
                  <h5 style={{ color: "#C0C0C0" }}>
                    {" "}
                    {this.state.data.specialization}{" "}
                  </h5>
>>>>>>> 773d7d1215d5de9a952390641602fb06a3a5581e
                </div>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
<<<<<<< HEAD
    )
  }
}
=======
    );
  }
}
>>>>>>> 773d7d1215d5de9a952390641602fb06a3a5581e
