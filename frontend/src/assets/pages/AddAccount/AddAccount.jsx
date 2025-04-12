import React from 'react'
import './AddAccount.css'; // Import your CSS file for styles

export default function AddAccount() {
  return (
    <>
      <div className="skeleton proxy-manager-pro" id="pmp-account">
        {/* <div className="section-header back-button-wh none pt-10 sf-hidden">
        </div> */}
        <form className="js-ajax-form" action="https://app.fanzella.com/accounts/new" method="POST" autoComplete="off">
          <div className="container-1200">
            <div className="row clearfix">
              <div className="col s12 m8 l4 mb-20">
                <section className="section">
                  <div className="section-content">
                    <div className="form-result" data-fetch-msg="Detecting username..."></div>

                    <div className="js-login">
                      <div className="mb-20">
                        <input className="input username-box" name="username" type="text" autoComplete="new-password" placeholder="Enter username" maxLength="80" />
                      </div>
                      <div className="mb-20">
                        <input className="input password-box" name="password" type="password" autoComplete="new-password" placeholder="Enter password" />
                      </div>

                      <div className="clearfix pmpa-proxy">
                        <div className="mb-20">
                          {/* <label className="form-label">Proxy (Optional)</label> */}
                          <input className="input" name="proxy" type="text" placeholder="Proxy for this account" />
                          <ul className="field-tips" style={{ textAlign: 'left' }}>
                            <li>Proxy should match following pattern: http://ip:port OR http://username:password@ip:port</li>
                          </ul>
                        </div>
                      </div>

                    </div>

                    <div className="js-browser-extension none sf-hidden"></div>
                    <div className="js-2fa none sf-hidden"></div>
                    <div className="js-challenge none sf-hidden"></div>
                  </div>

                  <div className="js-login">
                    <input className="fluid button button--footer js-login" type="submit" value="Add account" />
                  </div>

                  <div className="js-2fa js-challenge js-browser-extension none sf-hidden"></div>
                  <div className="js-edit-mode-fields none sf-hidden"></div>
                </section>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
