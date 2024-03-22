import React from 'react'
import './Main.css'

/*    image     */
import img_google from '../../assets/google.png';

function Main() {
  // const emailTest = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
  return (
    <div className='main-container'>
      <div className='sign-in-container'>
        <div className='sign-in-title'>Welcome Back!</div>
        <div className='sign-in-subtitle'>To keep Connected with us</div>
        <div className='sign-in-subtitle'>Please log in with your personal Info</div>
        <a href='/' className='sign-in-button'>Log In</a>
      </div>
      <div className='create-account-container'>
        <div className='create-account-title'>Create an Account</div>
        <div className='create-account-content-container'>
          <div className='create-account-subtitle'>Log in with your Google, Microsoft, or Apple Account</div>
          <div className='create-account-button-container'>
            <img src={img_google} alt='error' className='create-account-button-icon'/>
            <div className='create-account-button-text'>Log in with Google</div>
          </div>
          <div className='create-account-seperator-container'>
            <hr className='create-account-line'/>
            <div className='create-account-or-text'>Or</div>
            <hr className='create-account-line'/>
          </div>
          <div className='create-account-label'>Email</div>
          <input placeholder='yourEmail@email.com' className='create-account-input'/>
          <div className='create-account-label'>Password</div>
          <input placeholder='Enter your password' className='create-account-input'/>
          <a href='/' className='create-account-signin-button'>Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default Main