import React, { useEffect, useState } from 'react'
import './SideBar.css';
import { NavLink } from 'react-router-dom'
import '../../pages/CreatPost/CreatPost.css'
import axios from '../../axiosConfig';
import { useSection } from '../../Context.jsx';
import { useAuth } from '../../AuthContext';


const SideBar = () => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { section } = useSection();
  const { logout } = useAuth();
  const [userName, setUserName] = useState()
  const url = 'http://168.231.74.109:8080/admin/core/mediapost/'



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://srv810632.hstgr.cloud/api/userinfo');
        setUserData(response.data);
  
        const fullName = `${response.data.first_name} ${response.data.last_name}`;
        const trimmedName = fullName.length > 10 ? fullName.slice(0, 10) + '.' : fullName;
        setUserName(trimmedName);
  
        // console.log('Fetched user info:', response.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <>
      <div id="topbar">
        <div className="clearfix">
          <a
            href="javascript:void(0)"
            className="topbar-mobile-menu-icon mdi mdi-menu sf-hidden"
          />
          <h1 className="topbar-title">{section}</h1>
          <div className="topbar-actions clearfix">
            
            <div className="item" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <button className='btn-lg' onClick={logout} style={{ marginLeft: '10px' }}>
  Logout
</button>
            </div>
            

            <div className="item">
              <div className="topbar-profile clearfix">
                <NavLink to={'/profile'} className="greeting" style={{ fontWeight: 'bold' }}>
                  {loading ? 'Loading...' : userName}

                </NavLink>
                <div className="pull-left clearfix context-menu-wrapper">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUgbJFcx16VK49Mg4nytGQzLvK85fVRRGwQ&s" style={{ width: '15%' }} className="circle p-pic" >

                  </img>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav>
        <div className="nav-logo-wrapper">
          <NavLink to="/">
            <img
              src="main_icon.png"
              alt="BuzzPulsePoster"
            />
          </NavLink>
        </div>
        <div className="nav-menu">
          <div>
            <ul>
              <li className={`${section == 'Add Post' ? 'active' : ''}`}>
                <NavLink to="/">
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
              <li className={`${section == 'Add Account' ? 'active' : ''}`}>
                <NavLink to="/add_account">
                  <span className="sli sli-social-instagram menu-icon" />
                  <span className="label sf-hidden">Add Account</span>
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
              <li className={`${section == 'Statistics' ? 'active' : ''}`}>
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
              <li className={`${section == 'Profile' ? 'active' : ''}`}>
                <NavLink to="/profile">
                  {section == 'Profile' ?
                    <span
                      className="special-menu-icon"
                      style={{
                        backgroundColor: '#A077FF',
                        color: 'rgb(43 105 233)',
                        background: '#fff',
                        fontSize: '25px',
                        width: 'auto',
                        padding: '6px 4px 5px 3px',
                      }}
                    >
                      <span className="mdi mdi-account-network"></span>
                    </span>
                    :
                    <span
                      className="special-menu-icon pf"
                      style={{
                        backgroundColor: '#A077FF',
                        color: '#3c3c3c',
                        background: '#fff',
                        fontSize: '25px',
                        width: 'auto',
                        padding: '6px 4px 5px 3px',
                      }}
                    >
                      <span className="mdi mdi-account-network"></span>
                    </span>
                  }
                </NavLink>
              </li>
              <li onClick={() => window.open(url, '_blank')} className={`${section == 'Cleaner' ? 'active' : ''}`}>
                <NavLink >
                  <span
                    className="mdi mdi-delete-variant menu-icon"
                    style={{ fontSize: '22px' }}
                  ></span>

                  <span className="label">Cleaner</span>

                  <span
                    className="tooltip tippy js-tooltip-ready"
                    data-position="right"
                    data-delay="100"
                    data-arrow="true"
                    data-distance="-1"
                    data-tooltipped=""
                    aria-describedby="tippy-tooltip-33"
                    data-original-title="Cleaner"
                  ></span>
                </NavLink>
              </li>

              {/* <li className={`${section == 'Privacy Policy' ? 'active' : ''}`}>
                <NavLink to="/privacy_policy">
                  <span
                    className="icon mdi mdi-lock-open-outline menu-icon"
                    style={{ fontSize: '22px' }}
                  ></span>

                  <span className="label">Privacy Policy</span>

                  <span
                    className="tooltip tippy js-tooltip-ready"
                    data-position="right"
                    data-delay="100"
                    data-arrow="true"
                    data-distance="-1"
                    data-tooltipped=""
                    aria-describedby="tippy-tooltip-33"
                    data-original-title="Cleaner"
                  ></span>
                </NavLink>
              </li> */}

            </ul>
          </div>
        </div>
      </nav></>

  )
}

export default SideBar
