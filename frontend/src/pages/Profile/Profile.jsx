import React, { useState, useContext } from 'react'
import './Profile.css'; // Import your CSS file for styles
import { useSection } from '../../Context';


export default function Profile() {

  const { setSection } = useSection();
     setSection('Profile')


  return (
    <>
      <div className="skeleton proxy-manager-pro in-form-sk" id="pmp-account">
        <div className="section-header back-button-wh none pt-10 sf-hidden"></div>
        
      </div>
      <div id="toasts" />
      <div id="toasts" />
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
