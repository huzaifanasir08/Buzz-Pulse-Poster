import React from 'react'
import './SideBar.css';
import { NavLink } from 'react-router-dom'
import '../../pages/CreatPost/CreatPost.css'


const SideBar = () => {
  return (
    <> 
          <div id="topbar">
        <div className="clearfix">
          <a
            href="javascript:void(0)"
            className="topbar-mobile-menu-icon mdi mdi-menu sf-hidden"
          />
          <h1 className="topbar-title">Dashboard</h1>
          <div className="topbar-actions clearfix">
            <div className="item">
              <a className="link" href="https://app.fanzella.com/post">
                <span className="sli sli-plus icon" />
              </a>
            </div>
            <div className="item" href="#">
              <a className="link toggleHeadway">
                <span className="sli sli-bell icon headway-bell">
                  <span id="HW_badge_cont" className="HW_badge_cont">
                    <span id="HW_badge" className="HW_badge sf-hidden" />
                  </span>
                </span>
              </a>
            </div>
            {/* <div className="item" href="#">
              <a className="link" href="https://t.me/fanzellachat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width={24}
                  height={24}
                  viewBox="0 0 240 240"
                >
                  <defs>
                    <linearGradient
                      id="linear-gradient"
                      x1={120}
                      y1={240}
                      x2={120}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset={0} stopColor="#1d93d2" />
                      <stop offset={1} stopColor="#38b0e3" />
                    </linearGradient>
                  </defs>
                  <title>Join us on Telegram</title>
                  <circle cx={120} cy={120} r={120} fill="url(#linear-gradient)" />
                  <path
                    d="M81.229,128.772l14.237,39.406s1.78,3.687,3.686,3.687,30.255-29.492,30.255-29.492l31.525-60.89L81.737,118.6Z"
                    fill="#c8daea"
                  />
                  <path
                    d="M100.106,138.878l-2.733,29.046s-1.144,8.9,7.754,0,17.415-15.763,17.415-15.763"
                    fill="#a9c6d8"
                  />
                  <path
                    d="M81.486,130.178,52.2,120.636s-3.5-1.42-2.373-4.64c.232-.664.7-1.229,2.1-2.2,6.489-4.523,120.106-45.36,120.106-45.36s3.208-1.081,5.1-.362a2.766,2.766,0,0,1,1.885,2.055,9.357,9.357,0,0,1,.254,2.585c-.009.752-.1,1.449-.169,2.542-.692,11.165-21.4,94.493-21.4,94.493s-1.239,4.876-5.678,5.043A8.13,8.13,0,0,1,146.1,172.5c-8.711-7.493-38.819-27.727-45.472-32.177a1.27,1.27,0,0,1-.546-.9c-.093-.469.417-1.05.417-1.05s52.426-46.6,53.821-51.492c.108-.379-.3-.566-.848-.4-3.482,1.281-63.844,39.4-70.506,43.607A3.21,3.21,0,0,1,81.486,130.178Z"
                    fill="#fff"
                  />
                </svg>
              </a>
            </div> */}
            {/* <div className="item dark-side-switcher-icon">
              <span className="mdi mdi-weather-night icon dark-side-switcher" />
            </div>
            <div className="item dark-side-switcher">
              <div className="form-switcher-ios form-switcher-ios-md-phone form-switcher-ios-sm-phone dark-side-switcher">
                <input
                  type="checkbox"
                  name="dark-side-switcher"
                  id="dark-side-switcher"
                  data-user-id={9545}
                  data-url="https://app.fanzella.com/profile"
                  defaultValue={1}
                  className="sf-hidden"
                />
                <label
                  className="switcher dark-side-switcher"
                  htmlFor="dark-side-switcher"
                />
              </div>
            </div> */}
            <div className="item">
              <div className="topbar-profile clearfix">
                <span className="greeting">Hi, User! </span>
                <div className="pull-left clearfix context-menu-wrapper">
                  <a href="javascript:void(0)" className="circle">
                    <span>U</span>
                  </a>
 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
       <nav>
    <div className="nav-logo-wrapper">
    <NavLink  to="/">
        <img
          src="main_icon.png"
          alt="BuzzPulsePoster"
        />
      </NavLink>
    </div>
    <div className="nav-menu">
      <div>
        <ul>
          <li className="active">
            <NavLink  to="/">
              <span className="sli sli-plus menu-icon" />
              <span className="label sf-hidden">Add Post</span>
              <span
                className="tooltip tippy js-tooltip-ready"
                data-position="right"
                data-delay={100}
                data-arrow="true"
                data-distance={-1}
                data-tooltipped=""
                aria-describedby="tippy-tooltip-1"
                data-original-title="Add Post"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/accounts">
              <span className="sli sli-social-instagram menu-icon" />
              <span className="label sf-hidden">Accounts</span>
              <span
                className="tooltip tippy js-tooltip-ready"
                data-position="right"
                data-delay={100}
                data-arrow="true"
                data-distance={-1}
                data-tooltipped=""
                aria-describedby="tippy-tooltip-5"
                data-original-title="Accounts"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/add_account">
              <span className="sli sli-social-instagram menu-icon" />
              <span className="label sf-hidden">Accounts</span>
              <span
                className="tooltip tippy js-tooltip-ready"
                data-position="right"
                data-delay={100}
                data-arrow="true"
                data-distance={-1}
                data-tooltipped=""
                aria-describedby="tippy-tooltip-5"
                data-original-title="Accounts"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics">
              <span className="sli sli-chart menu-icon" />
              <span className="label sf-hidden">Statistics</span>
              <span
                className="tooltip tippy js-tooltip-ready"
                data-position="right"
                data-delay={100}
                data-arrow="true"
                data-distance={-1}
                data-tooltipped=""
                aria-describedby="tippy-tooltip-6"
                data-original-title="Statistics"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav></>

  )
}

export default SideBar
