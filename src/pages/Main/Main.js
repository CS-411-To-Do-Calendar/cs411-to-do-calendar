import React from 'react'
import './Main.css'

/*    image     */
import img_google from '../../assets/google.png';

/*    User Auth     */
import { UserAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { getUserOauthToken } from '../../firestore/firebaseUser';

function Main() {
  // eslint-disable-next-line no-control-regex
  // const emailTest = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
  // const [emailAddress, setEmailAddress] = useState("");
  // const [isEmailValid, setIsEmailValid] = useState(true);
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  // Google Signin
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    }
    catch (errMessage) {
      alert(errMessage);
    }
  };

  // const handleChangeEmail = (e) => {
  //   const email = e.target.value;
  //   setEmailAddress(email);
  //   setIsEmailValid(emailTest.test(email));
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   checkPasswords(e.target.value, confirmPassword);
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value);
  //   checkPasswords(password, e.target.value);
  // };

  // const checkPasswords = (pass1, pass2) => {
  //   setIsPasswordMatch(pass1 === pass2);
  // };

  // const handleSignUp = (e) => {
  //   e.preventDefault(); // Prevent default anchor action

  //   // Check if email is valid
  //   const emailIsValid = emailTest.test(emailAddress);
  //   setIsEmailValid(emailIsValid);

  //   // Check if passwords match
  //   const passwordsMatch = password === confirmPassword;
  //   setIsPasswordMatch(passwordsMatch);

  //   if (emailIsValid && passwordsMatch) {
  //     // Perform CRUD operations and upload to Firebase DB
  //     alert("Success!");
  //   }
  // };

  return (
    // Main container
    <div className='main-container'>
      {/* Left side (sign in container) */}
      <div className='sign-in-container'>
        <div className='sign-in-title'>Welcome Back!</div>
        <div className='sign-in-subtitle'>To keep Connected with us</div>
        <div className='sign-in-subtitle'>Please log in with your personal Info</div>
        <div className='sign-in-button' onClick={handleGoogleSignIn}>Log In</div>
      </div>
      {/* Right side (Create Account container) */}
      <div className='create-account-container'>
        <div className='create-account-title'>Create an Account</div>
        {/* User Content Area*/}
        <div className='create-account-content-container'>
          <div className='create-account-subtitle'>Log in with your Google Account!</div>
          <div className='create-account-button-container' onClick={handleGoogleSignIn}>
            <img src={img_google} alt='error' className='create-account-button-icon'/>
            <div className='create-account-button-text'>Sign Up With Google</div>
          </div>
          {/* <div className='create-account-seperator-container'>
            <hr className='create-account-line'/>
            <div className='create-account-or-text'>Or</div>
            <hr className='create-account-line'/>
          </div>
          <div className='create-account-label'>
            <div className='create-account-label-text'>Email</div>
            <div className='create-account-label-needed'>*</div>
          </div>
          {!isEmailValid && (
            <div className='create-account-error'>
              Invalid Email Error: format must be yourEmailAddress@platform.type
            </div>
          )}
          <input
            placeholder='yourEmail@email.com'
            type='text'
            className='create-account-input'
            value={emailAddress}
            onChange={handleChangeEmail}
          />
          <div className='create-account-label'>
            <div className='create-account-label-text'>Password</div>
            <div className='create-account-label-needed'>*</div>
          </div>
          {!isPasswordMatch && (
            <div className='create-account-error'>
              Password must be matching
            </div>
          )}
          <input
            placeholder='Enter your password'
            type='password'
            className='create-account-input'
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            placeholder='Confirm your password'
            type='password'
            className='create-account-input'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <a href='/' onClick={handleSignUp} className='create-account-signin-button'>Sign Up</a> */}
        </div>
      </div>
    </div>
  )
}

export default Main