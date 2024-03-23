import React from 'react'
import { UserAuth } from '../../context/AuthContext'


function Calendar() {

  const { user, googleSignOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await googleSignOut();
    } 
    catch (errMessage) {
      alert(errMessage);
    }
  }

  return (
    <div>
      <div>Welcome to the to do calendar {user?.displayName}!</div>
      {user?.displayName ? <div onClick={handleSignOut}>logout!</div> : <a href='/'>Log In</a>}
    </div>
  )
}

export default Calendar