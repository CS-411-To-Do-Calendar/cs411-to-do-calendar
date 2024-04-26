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


function Navbar() {
    const navigate = useNavigate();
    const { user } = UserAuth();

  return (
    <div className='account-menu-container'>
        <div className='account-menu-user-greet-container'>
            <Spinner/>
            <div className='account-menu-user-greet-text'>Hello {user?.displayName},</div>
        </div>
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
    </div>
  )
}

export default Navbar