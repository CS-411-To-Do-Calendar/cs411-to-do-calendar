import React from 'react'
import './Navbar.css'

// Firebase!
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Spinner
import Spinner from '../spinner/spinner';

// Icons
import { RxCalendar } from "react-icons/rx";
import { MdChecklistRtl } from "react-icons/md";
import { LuSettings } from "react-icons/lu";


function Navbar() {
    const navigate = useNavigate();
    const { user, googleSignOut } = UserAuth();

    const handleSignOut = async () => {
        try {
          await googleSignOut();
        } catch (error) {
          console.error('Sign out error', error);
        }
      };

  return (
    <div className='account-menu-container'>
        <div className='account-menu-user-greet-container'>
            <Spinner/>
            <div className='account-menu-user-greet-text'>Hello {user?.displayName},</div>
        </div>
        <div className='account-menu-space-between'>
            <div className='account-menu-control-container'>
                <div className='account-menu-control-child-container' onClick={() => navigate('/account')}>
                    <RxCalendar className='account-menu-control-child-icon'/>
                    <div>Calendar</div>
                </div>
                <div className='account-menu-control-child-container' onClick={() => navigate('/todo')}>
                    <MdChecklistRtl className='account-menu-control-child-icon'/>
                    <div>To do List</div>
                </div>
            </div>
            <div className='account-menu-control-child-container' onClick={() => navigate('/todo')}>
                <LuSettings className='account-menu-control-child-icon'/>
                {user?.displayName ? (
                <div className="" onClick={handleSignOut}>Logout!</div>
                ) : (
                    <a href='/'>Log In</a>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar