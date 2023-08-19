import { Badge } from '@mui/material'
import React from 'react'
import {Language, NotificationsOutlined, Settings} from '@mui/icons-material';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="navbarWrapper">
            <div className="navbar-left">
                <span className="logo">FEST Admin</span>
            </div>
            <div className="navbar-right">
                <Badge className="navbar-icon" badgeContent={4} color="error">
                  <NotificationsOutlined />
                </Badge>
                <Badge className="navbar-icon" badgeContent={4} color="error">
                  <Language />
                </Badge>
                <Settings className="navbar-icon" />
                <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="avatar" className="navbar-avatar" />
            </div>
        </div>
    </nav>
  )
}

export default Navbar