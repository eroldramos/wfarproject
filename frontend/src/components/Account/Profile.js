import React, { Fragment } from "react";
import "../Account/Profile.css";
import Pic from "../Account/img/profpic.jpg";
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getDetails();
  }

  getDetails() {
    fetch('/api/profile/')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data[0]
        });
      });
  }

  editButtonClicled(e) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'Cool', 
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
    if (this.state.data.user_type === 1) {
      return <p className="userinput" style={{ color: '#000000' }}> Faculty </p>
    } else if (this.state.data.user_type === 2) {
      return <p className="userinput" style={{ color: '#000000' }}> Area Chair </p>
    } else if (this.state.data.user_type === 3) {
      return <p className="userinput" style={{ color: '#000000' }}> Department Head </p>
    } else {
      return <p className="userinput" style={{ color: '#000000' }}> None </p>
    }
  }

  sexSwitch() {
    if (this.state.data.sex === 1) {
      return <p className="userinput" style={{ color: '#000000' }}> Male </p>
    } else if (this.state.data.sex === 2) {
      return <p className="userinput" style={{ color: '#000000' }}> Female </p>
    } else if (this.state.data.sex === 3) {
      return <p className="userinput" style={{ color: '#000000' }}> Others </p>
    }
  }

  civilStatusSwitch() {
    if (this.state.data.civil_status === 1) {
      return <p className="userinput" style={{ color: '#000000' }}> Single </p>
    } else if (this.state.data.civil_status === 2) {
      return <p className="userinput" style={{ color: '#000000' }}> Married </p>
    } else if (this.state.data.civil_status === 3) {
      return <p className="userinput" style={{ color: '#000000' }}> Widowed </p>
    }
  }

  profilePictureSwitch() {
    if (this.state.data.profile_picture == null || this.state.data.profile_picture == "") {
      return <img className="pic" src={Pic} alt="pic" />
    } else {
      return <img className="pic" src={this.state.data.profile_picture} alt="pic" />
    }
  }

  birthdayCalculator() {
    let date = new Date(this.state.data.birthdate);
    let month = date.toLocaleString('en-us', { month: 'long' });
    return <p className="userinput" style={{ color: '#000000' }}> {month + ' ' + date.getDate() + ', ' + date.getFullYear()}</p>
  }

  render() {
    return (
      <Fragment>
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
                      <td><p className="Pdata" style={{ color: '#C0C0C0' }}>Name </p></td>
                      <td><p className="userinput" style={{ color: '#000000' }}>{this.state.data.name} </p></td>
                    </tr>
                    <tr>
                      <td> <p className="Pdata" style={{ color: '#C0C0C0' }}>Position </p></td>
                      <td>{this.userTypeSwitch()}</td>
                    </tr>
                    <tr>
                      <td> <p className="Pdata" style={{ color: '#C0C0C0' }}>Employee Number     </p></td>
                      <td><p className="userinput" style={{ color: '#000000' }}> {this.state.data.emp_no}</p></td>
                    </tr>
                    <tr>
                      <td> <p className="Pdata" style={{ color: '#C0C0C0' }}>Sex </p></td>
                      <td> {this.sexSwitch()}</td>
                    </tr>
                    <tr>
                      <td><p className="Pdata" style={{ color: '#C0C0C0' }}>Date of Birth </p></td>
                      <td> {this.birthdayCalculator()}</td>
                    </tr>
                    <tr>
                      <td> <p className="Pdata" style={{ color: '#C0C0C0' }}>Civil Status </p></td>
                      <td> {this.civilStatusSwitch()}</td>
                    </tr>
                    <tr>
                      <td><p className="Pdata" style={{ color: '#C0C0C0' }}>Address </p></td>
                      <td><p className="userinput" style={{ color: '#000000' }}> {this.state.data.house_no + ' ' + this.state.data.street
                        + ' St., ' + this.state.data.subdivision
                        + ' ' + this.state.data.barangay
                        + ' ' + this.state.data.municipality
                        + ', ' + this.state.data.province} </p></td>
                    </tr>
                    <tr>
                      <td colSpan="2"> <h1> Contact Information </h1></td>
                    </tr>
                    <tr>
                      <td><p className="Pdata" style={{ color: '#C0C0C0' }}>Phone Number </p></td>
                      <td><p className="userinput" style={{ color: '#000000' }}>{this.state.data.contact_no} </p></td>
                    </tr>
                    <tr>
                      <td> <p className="Pdata" style={{ color: '#C0C0C0' }}>Email Address </p></td>
                      <td><p className="userinput" style={{ color: '#000000' }}> {this.state.data.email}</p></td>
                    </tr>
                    <tr>
                      <td colSpan="2">  <h1> Specialization </h1></td>
                    </tr>
                    <tr>
                      <td> <p className="Pdata" style={{ color: '#C0C0C0' }}>Program </p></td>
                      <td><p className="userinput" style={{ color: '#000000' }}> {this.state.data.specialization} </p></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}
