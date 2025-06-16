import React, { useState, useContext } from 'react'
import './AddAccount.css'; // Import your CSS file for styles
import { useSection } from '../../Context.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddAccount() {
  const [formData, setFormData] = useState({
    username: '',
    access_token: '',
    proxy: '',
    account_id: ''
  });
  const proxyUrl = "Example: {username}:{password}@{proxy_host}:{proxy_port}";
  const url = 'https://developers.facebook.com/apps/1383650692818732/instagram-business/API-Setup/';

   const { setSection } = useSection();
   setSection('Add Account')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Adding Account...");
    try {
      const res = await fetch('https://srv810632.hstgr.cloud/api/createaccount/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }); 

      if (res.ok) {
        toast.update(toastId, {
          render: "Account Added Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setFormData({ username: '', access_token: '', proxy: '', account_id: '' });
      } else {
        const errData = await res.json();
        toast.update(toastId, {
          render: "Something Went Wrong!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        // alert('Error: ' + JSON.stringify(errData));
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Something Went Wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error(error);
      // alert('An error occurred.');
    }
  };




  return (
    <>
    <title>Add Account</title>
      <div className="skeleton proxy-manager-pro in-form-sk" id="pmp-account">
      <ToastContainer />
        <div className="section-header back-button-wh none pt-10 sf-hidden"></div>
        
        <div className="container-1200 add-acc">
          <div className="row clearfix in-row">
            <div className="col s12 m8 l4 mb-20 in-form">
              <section className="section">
           
                <div className="js-login">
                  <button
                    style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
                    onClick={() => window.open(url, '_blank')}
                  >
                    Get Access Token & Id
                  </button>
                </div>
                <div className="js-2fa js-challenge js-browser-extension none sf-hidden"></div>
                <div className="js-edit-mode-fields none sf-hidden"></div>
              </section>
            </div>
          </div>
          <form
          className="js-ajax-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="row clearfix ">
            <div className="col s12 m8 l4 mb-20 in-form">
              <section className="section">
                <div className="section-content">
                  <div
                    className="form-result"
                    data-fetch-msg="Detecting username..."
                  ></div>
                  <div className="js-login" style={{ textAlign: 'left' }}>
                    <div className="mb-20">
                      <label className="form-label">Username</label>
                      <input
                        className="input username-box"
                        name="username"
                        type="text"
                        defaultValue=""
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        maxLength={80}
                        required
                      />
                    </div>
                    <div className="mb-20">
                      <label className="form-label">Account ID</label>
                      <input
                        className="input username-box"
                        name="account_id"
                        type="text"
                        defaultValue=""
                        value={formData.account_id}
                        onChange={handleChange}
                        placeholder="Enter account id"
                        maxLength={80}
                        required
                      />
                    </div>
                    <div className="mb-20">
                      <label className="form-label">Access Token</label>
                      <input
                        className="input password-box"
                        name="access_token"
                        type="text"
                        value={formData.access_token}
                        onChange={handleChange}
                        placeholder="Enter Access Token"
                        required
                      />
                    </div>

                    <div className="clearfix pmpa-web none sf-hidden"></div>

                    <div className="clearfix pmpa-proxy">
                      <div className="mb-20">
                        <label className="form-label">Proxy</label>
                        <input
                          className="input"
                          name="proxy"
                          type="text"
                          value={formData.proxy}
                          onChange={handleChange}
                          defaultValue=""
                          placeholder="Proxy for this account"
                          required
                        />
                        <ul className="field-tips">
                          <li>
                            Proxy should match following pattern without http:// or https://:
                            <br />
                            {proxyUrl}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="js-browser-extension none sf-hidden"></div>
                  <div className="js-2fa none sf-hidden"></div>
                  <div className="js-challenge none sf-hidden"></div>
                </div>
                <div className="js-login">
                  <input
                    className="fluid button button--footer js-login"
                    type="submit"
                    defaultValue="Add account"
                  />
                </div>
                <div className="js-2fa js-challenge js-browser-extension none sf-hidden"></div>
                <div className="js-edit-mode-fields none sf-hidden"></div>
              </section>
            </div>
          </div>
        </form>
        </div>
      </div>
      <div id="toasts" />
      <div id="toasts" />
      <style
        id="HW_styles_cont"
        className="sf-hidden"
        dangerouslySetInnerHTML={{
          __html:
            ".HW_badge_cont{visibility:hidden;pointer-events:none;display:block;cursor:pointer;width:32px;height:32px}.HW_bottom{bottom:-16px}.HW_frame_cont{pointer-events:none;border-radius:4px;box-shadow:0 0 1px rgba(99,114,130,0.32),0 8px 16px rgba(27,39,51,0.08);background:#fff;border:none;position:fixed;top:-900em;z-index:2147483647;width:340px;height:0;opacity:0;will-change:height,margin-top,opacity;margin-top:-10px;transition:margin-top 0.15s ease-out,opacity 0.1s ease-out;overflow:hidden}.HW_frame{background:#fff;border:none;width:100%;overflow:hidden;border-radius:4px;position:relative;z-index:2147483647}"
        }}
      />
      <div
        id="HW_frame_cont"
        className="HW_frame_cont HW_bottom"
        data-account="xGabrJ"
      >

      </div>
      <veepn-guard-alert>
        <template shadowrootmode="open" />
      </veepn-guard-alert>
      <veepn-lock-screen>
        <template shadowrootmode="open" />
      </veepn-lock-screen>
    </>

  )
}
