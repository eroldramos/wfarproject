import React, { Fragment } from "react";
import "../Account/Profile.css";
import Pic from "../Account/img/profpic.jpg";

 function Profile () {

  return (
      <Fragment>
        <h1 class = "HEADER"> MY ACCOUNT</h1>
      <div className = 'container'>
      <div className ='EditButton'>
               <button class="Editbtn" >Edit Profile</button> 
        </div>
        <div className ='ChangeButton'>
                <button class="Changebtn" >Change Password</button>
        </div>

      <form method =""> 
          <div className='row'>
            <div className ='profilepic'>
                <img className="pic" src ={Pic} alt="pi" />
              </div>
              <div className ='col-md-6'>
                  <div className='Profile-head'>
                  <h1> Personal Data </h1>
                  <h5 style={{color: '#C0C0C0'}}> Name </h5>
                  <h5 style={{color: '#C0C0C0'}}> Position </h5>
                  <h5 style={{color: '#C0C0C0'}}> Employee Number</h5>
                  <h5 style={{color: '#C0C0C0'}}> Sex </h5>
                  <h5 style={{color: '#C0C0C0'}}> Date of Birth </h5>
                  <h5 style={{color: '#C0C0C0'}}> Civil Status </h5>
                  <h5 style={{color: '#C0C0C0'}}> Adress </h5>
                  <h1> Contact Information </h1>
                  <h5 style={{color: '#C0C0C0'}}> Phone Number </h5>
                  <h5 style={{color: '#C0C0C0'}}> Email Adress </h5>
                  <h1> Specialization </h1>
                  <h5 style={{color: '#C0C0C0'}}> Program </h5>
                  </div>
             </div>
             </div>
                  
            
        </form>
        
    </div>
      </Fragment>
    
  )
}
export default Profile;