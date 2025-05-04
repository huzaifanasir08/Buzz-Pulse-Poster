import React, { useState, useContext } from 'react'
import './AddAccount.css'; // Import your CSS file for styles
import { useSection } from '../../Context.jsx';


export default function AddAccount() {
  const [formData, setFormData] = useState({
    username: '',
    access_token: '',
    proxy: '',
    account_id: ''
  });
  const proxyUrl = "Example: {username}:{password}@{proxy_host}:{proxy_port}";
  const url = 'https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1385265725991934&redirect_uri=https://scheduleinstagramposts.com/auth.html&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights';

   const { setSection } = useSection();
   setSection('Add Account')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/createaccount/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Account added successfully!');
        setFormData({ username: '', access_token: '', proxy: '', account_id: '' });
      } else {
        const errData = await res.json();
        alert('Error: ' + JSON.stringify(errData));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };




  return (
    <>
      <div className="skeleton proxy-manager-pro in-form-sk" id="pmp-account">
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
        <iframe
          id="HW_frame"
          className="HW_frame"
          referrerPolicy="strict-origin"
          sandbox="allow-popups allow-top-navigation-by-user-activation"
          tabIndex={-1}
          aria-hidden="true"
          srcDoc='<!DOCTYPE html> <html><meta charset=utf-8>
<style media=screen>*{box-sizing:border-box}*,body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}html,body{height:100vh}html{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;text-size-adjust:100%}body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;background:#fff;padding:0;margin:0;font-size:13px;overflow:hidden}h3{padding:0}.outercont .cont{overflow:hidden;position:relative;height:100vh;width:100vw}.outercont .innercont{transform:translate(0);position:relative;overflow:hidden;will-change:left;transition:left .3s;width:200vw;height:100%;left:0}.outercont .innercont .logList{overflow-y:auto}.outercont .innercont #index,.outercont .innercont #details{width:100vw;position:absolute}.outercont .innercont #index{left:0}.outercont .innercont #details{left:100vw}.outercont .innercont #index{height:100vh;display:flex;flex-direction:column}.outercont .innercont #index .logList{overflow-x:hidden;overscroll-behavior:contain}.outercont .innercont #index .title{margin:0 3px}.outercont .innercont h3.title{text-align:center;font-weight:600;font-size:14px}.outercont .innercont .topBar{position:relative}.outercont .innercont .topBar{border-bottom:solid 1px;padding:15px 30px}.outercont .innercont .footer{color:#a8a8a8;font-size:12px;text-align:center;border-top:solid 1px;height:35px;line-height:35px;border-radius:0 0 4px 4px}.outercont .innercont .footer a{color:#a8a8a8}.ltr{direction:ltr}</style>
<meta name=referrer content=no-referrer><meta http-equiv=content-security-policy content="default-src &apos;none&apos;; font-src &apos;self&apos; data:; img-src &apos;self&apos; data:; style-src &apos;unsafe-inline&apos;; media-src &apos;self&apos; data:; script-src &apos;unsafe-inline&apos; data:; object-src &apos;self&apos; data:; frame-src &apos;self&apos; data:;"></head>
 <body class="ltr light-mode right bottom" style=background-color:rgb(255,255,255)>
 <div class=outercont>
 <div class=cont>
 <div class=innercont style=color:rgb(34,44,54)>
 <div id=index>
 <div class=topBar style=border-color:rgb(241,241,241);background-color:rgb(255,255,255)>
 <h3 class=title>Latest changes</h3>
 </div>
 <div class=logList>
 
 </div> 
 <div class=footer style=border-color:rgb(241,241,241);background-color:rgb(252,252,252)>
 <a target=_blank rel="noopener noreferrer" href="https://headwayapp.co/alphanouveau-changelog?utm_medium=widget">Alphanouveau changelog</a>
 powered by <a target=_blank href="https://headwayapp.co/?utm_medium=widget&amp;utm_source=alphanouveau" rel="noopener noreferrer">Headway</a>
 </div>
</div> 
<div id=details>
 
</div> 
 </div> 
 </div> 
 </div> 
'
        />
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
