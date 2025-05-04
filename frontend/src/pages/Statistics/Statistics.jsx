import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import './Statistics.css'
import axios from "axios";
import { useSection } from "../../Context";



export default function Statistics() {

  const [data, setData] = useState([]);
  const { setSection } = useSection();
     setSection('Statistics')

  useEffect(() => {
    axios.get("https://srv809058.hstgr.cloud/statistics").then(res => {
      setData(res.data.map(item => ({
        ...item,
        date: item.date, // ISO date
      })));
    });
  }, []);
  


  return (
      <>
  <title>Statistics</title>

  {/* <link rel="canonical" href="https://app.fanzella.com/statistics" /> */}



  <div className="skeleton-bar-char" id="statistics">
    <div className="container-1200">
      <div className="row clearfix">
        {/* <form action="https://app.fanzella.com/statistics" method="GET">
          <div className="account-selector clearfix">
            <span className="label">Select Account</span>
            <select className="input input--small" name="account">
              <option value={152120} selected="">
                syed_developr{" "}
              </option>
            </select>
          </div>
          <input
            className="none sf-hidden"
            type="submit"
            defaultValue="Submit"
          />
        </form> */}
        <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total Scheduled" />
          <Bar dataKey="post_count" fill="#82ca9d" name="Posts" />
          <Bar dataKey="reel_count" fill="#ffc658" name="Reels" />
          <Bar dataKey="has_tried" fill="#d88484" name="Tried" />
          <Bar dataKey="has_posted" fill="#84d8c4" name="Posted" />
          <Bar dataKey="failed" fill="#ff6b6b" name="Failed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
      </div>
    </div>
  </div>
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
      style={{}}
    />
  </div>
  <veepn-lock-screen>
    <template shadowrootmode="open" />
  </veepn-lock-screen>
  <veepn-guard-alert>
    <template shadowrootmode="open" />
    <style
      className="sf-hidden"
      dangerouslySetInnerHTML={{
        __html:
          '@font-face{font-family:FigtreeVF;src:url(chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/fonts/FigtreeVF.woff2) format("woff2 supports variations"),url(chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/fonts/FigtreeVF.woff2) format("woff2-variations");font-weight:100 1000;font-display:swap}'
      }}
    />
  </veepn-guard-alert>
  <style
    className="single-file-highlights-stylesheet"
    dangerouslySetInnerHTML={{
      __html:
        ".single-file-highlight-yellow, .single-file-highlight-yellow-mode ::selection { background-color: #ffff7c !important; color: black !important; } .single-file-highlight-pink, .single-file-highlight-pink-mode ::selection { background-color: #ffbbb6 !important; color: black !important; } .single-file-highlight-blue, .single-file-highlight-blue-mode ::selection { background-color: #95d0ff !important; color: black !important; } .single-file-highlight-green, .single-file-highlight-green-mode ::selection { background-color: #93ef8d !important; color: black !important; } span.single-file-highlight-yellow, span.single-file-highlight-pink, span.single-file-highlight-blue, span.single-file-highlight-green { display: inline !important; } .single-file-highlight-hidden { background-color: inherit !important; color: inherit !important; } .single-file-mask { all: initial; display: contents !important; } .single-file-mask.single-file-page-mask { opacity: .99 !important; } single-file-note { all: initial !important; display: contents !important; } .single-file-cut-hover, .single-file-cut-outer-hover, .single-file-cut-selected, .single-file-cut-outer-selected { transition: outline-width 125ms !important; outline-offset: -4px !important; outline-width: 4px !important; } .single-file-cut-hover, .single-file-cut-outer-hover { outline-style: dotted !important; } .single-file-cut-selected, .single-file-cut-outer-selected { outline-style: dashed !important; } .single-file-cut-hover, .single-file-cut-selected { outline-color: red !important; } .single-file-cut-outer-hover, .single-file-cut-outer-selected { outline-color: green !important; } .single-file-cut-mode, .single-file-cut-mode * { pointer-events: auto !important; touch-action: none !important; } .single-file-cut-hover, .single-file-cut-outer-hover, .single-file-remove-highlights-mode .single-file-highlight:hover { cursor: crosshair !important; } .single-file-removed { display: none !important; float: none !important; position: static !important; visibility: collapse !important; } a[href], img { -webkit-touch-callout: none; }"
    }}
  />
</>

  )
}
