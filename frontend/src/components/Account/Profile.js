import React, { Fragment } from "react";
import "../Account/Profile.css";
import Pic from "../Account/img/profpic.jpg";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import InputField from "../UI/FormControl/InputField/InputField";

export default class Profile extends React.Component{



  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
    this.getDetails();
  }

  getDetails(){
    fetch('/api/profile/')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
       data: data[0]
      });
    });
  }

  editButtonClicled(e){
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'success',
      confirmButtonText: 'Cool',showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  };

  changePasswordButtonClicked(e){
    Swal.fire({
      title: 'Change Password',
      text: 'Do you want to continue',
      icon: 'warning',
      confirmButtonText: 'Cool'
    })
  };

  profilePictureClicked(e){
    Swal.fire({
      title: 'profile Pic change',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  };

  userTypeSwitch(){
    if(this.state.data.user_type == 1){
     return <h5 style={{color: '#C0C0C0'}}> Faculty </h5>
      } else if(this.state.data.user_type == 2){
       return  <h5 style={{color: '#C0C0C0'}}> Area Chair </h5>
      }else if(this.state.data.user_type == 3){
       return  <h5 style={{color: '#C0C0C0'}}> Department Head </h5>
      }
  }

  sexSwitch(){
    if(this.state.data.sex == 1){
     return <h5 style={{color: '#C0C0C0'}}> Male </h5>
      } else if(this.state.data.sex == 2){
       return  <h5 style={{color: '#C0C0C0'}}> Female </h5>
      }else if(this.state.data.sex == 3){
       return  <h5 style={{color: '#C0C0C0'}}> Others </h5>
      }
  }

  civilStatusSwitch(){
    if(this.state.data.sex == 1){
     return <h5 style={{color: '#C0C0C0'}}> Single </h5>
      } else if(this.state.data.sex == 2){
       return  <h5 style={{color: '#C0C0C0'}}> Married </h5>
      }else if(this.state.data.sex == 3){
       return  <h5 style={{color: '#C0C0C0'}}> Widowed </h5>
      }
  }

  render(){
    return (
      <Fragment>
        <h1 class = "HEADER">MY ACCOUNT</h1>
      <div className = 'container'>
        <div className ='EditButton'>
               <button class="Editbtn" onClick={this.editButtonClicled}>Edit Profile</button> 
        </div>

        <div className ='ChangeButton' >
                <button class="Changebtn" onClick={this.changePasswordButtonClicked}> Change Password</button>
        </div>

       <form method =""> 
          <div className='row'>
            <div className ='profilepic' onClick={this.profilePictureClicked}>
                <img className="pic" src ={this.state.data.profile_picture} alt="pi"/>
              </div>
              <div className ='col-md-6'>
                  <div className='Profile-head'>
                  <h1> Personal Data </h1>
                  <h5 style={{color: '#C0C0C0'}}>{this.state.data.name} </h5>
                  {this.userTypeSwitch()}
                  <h5 style={{color: '#C0C0C0'}}> {this.state.data.emp_no}</h5>
                  {this.sexSwitch()}
                  <h5 style={{color: '#C0C0C0'}}>{this.state.data.birthdate} </h5>
                  {this.civilStatusSwitch()}
                  <h5 style={{color: '#C0C0C0'}}> {this.state.data.province} </h5>
                  <h1> Contact Information </h1>
                  <h5 style={{color: '#C0C0C0'}}>{this.state.data.contact_no} </h5>
                  <h5 style={{color: '#C0C0C0'}}> {this.state.data.email}</h5>
                  <h1> Specialization </h1>
                  <h5 style={{color: '#C0C0C0'}}> {this.state.data.specialization} </h5>
                  </div>
             </div>
             </div>
                  
            
         </form>
        
      </div>
      </Fragment>
    
  )
  }

}