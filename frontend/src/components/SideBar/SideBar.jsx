import React from 'react'
import main_icon from '../../assets/images/main_icon.png';
import './SideBar.css';
import instagram from '../../assets/images/instagram.png';
import add_post from '../../assets/images/add_post.png';
import { NavLink } from 'react-router-dom'


const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
      <img
             alt="Logo"
             className="mb-4"
             height="40"
             src={main_icon}
             width="40"
           />
        <NavLink to='/' className="sidebar-option">
          <img src={add_post} alt="" />
          <p>New Post</p>
        </NavLink>
        <NavLink to= '/accounts'className="sidebar-option">
          <img src={instagram} alt="" />
          <p>Saved Account</p>
        </NavLink>
        <NavLink to= '/add_account'className="sidebar-option">
          <img src={instagram} alt="" />
          <p>Add Account</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
