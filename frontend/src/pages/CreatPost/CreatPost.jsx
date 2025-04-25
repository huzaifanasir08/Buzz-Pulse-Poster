import React, { useState } from 'react'
import './CreatPost.css'; // Import your CSS file for styles
// import main_icon from '../../images/main_icon.png'; // Import your main icon image
import { X } from 'lucide-react';


const CreatPost = () => {

  const [logs, setLogs] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  const triggerLogs = (messages) => {
    setLogs(messages);
    setShowLogs(true);
    setTimeout(() => setShowLogs(false), 2000); // Hide after 10 seconds
  };

  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        if (ratio >= 0.8 && ratio <= 1.91) {
          resolve({ type: "image", file, url: URL.createObjectURL(file) });
        } else {
          reject(`❌ ${file.name} - Invalid image aspect ratio (${ratio.toFixed(2)})`);
        }
      };
      img.onerror = () => reject(`❌ ${file.name} - Failed to load image`);
      img.src = URL.createObjectURL(file);
    });
  };

  const validateVideo = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        const ratio = video.videoWidth / video.videoHeight;
        const duration = video.duration;
        if (duration < 3 || duration > 60) {
          reject(`❌ ${file.name} - Video duration ${duration.toFixed(2)}s is invalid`);
        } else if (ratio < 0.8 || ratio > 1.91) {
          reject(`❌ ${file.name} - Invalid video aspect ratio (${ratio.toFixed(2)})`);
        } else {
          resolve({ type: "video", file, url: URL.createObjectURL(file) });
        }
      };
      video.onerror = () => reject(`❌ ${file.name} - Failed to load video`);
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    let errorMessages = [];

    for (const file of files) {
      try {
        let result;
        if (file.type.startsWith("image/")) {
          result = await validateImage(file);
        } else if (file.type.startsWith("video/")) {
          result = await validateVideo(file);
        } else {
          throw `❌ ${file.name} - Unsupported file type`;
        }
        setMediaList((prev) => [...prev, result]);
      } catch (err) {
        errorMessages.push(err);
      }
    }

    if (errorMessages.length > 0) {
      triggerLogs(errorMessages);
    }
  };

  const removeMedia = (index) => {
    setMediaList((prev) => prev.filter((_, i) => i !== index));
  };


  return (

    <>
      <title>New Post</title>
      <meta name="referrer" content="no-referrer" />
      <link
        rel="shortcut icon"
        href="main_icon.png"
        type="image/x-icon"
      />

      <div className="skeleton" style={{width:'100%'}} id="post">
        <form
          action="javascript:void(0)"
          data-url="https://app.fanzella.com/post"
          data-post-id=""
          autoComplete="off"
        >
          <div className="container-1200">
            <div className="row">
              <div className="types clearfix">
                <label data-size="small" data-position="top" title="" className='active'>
                  <input
                    name="type"
                    defaultValue="timeline"
                    type="radio"
                    defaultChecked=""
                    className="sf-hidden"
                  />
                  <div style={{ borderRadius: "5px 0 0 5px" }}>
                    <span className="sli sli-camera icon" />
                    <div className="type">
                      <div className="name">
                        <span className="hide-on-small-only">Add Post</span>
                        <span className="hide-on-medium-and-up sf-hidden">
                          Post
                        </span>
                      </div>
                      <div>Photos </div>
                    </div>
                  </div>
                </label>
                <label data-size="small" data-position="top" title="">
                  <input
                    name="type"
                    type="radio"
                    defaultValue="reels"
                    className="sf-hidden"
                  />
                  <div>
                    <span className="instagram-pro icon-instagram-reels icon" />
                    <div className="type">
                      <div className="name">
                        <span className="hide-on-small-only">Add Videos / Reels</span>
                        <span className="hide-on-medium-and-up sf-hidden">
                          Reels
                        </span>
                      </div>
                      <div>Video </div>
                    </div>
                  </div>
                </label>
                {/* <label data-size="small" data-position="top" title="">
                  <input
                    name="type"
                    type="radio"
                    defaultValue="story"
                    className="sf-hidden"
                  />
                  <div>
                    <span className="sli sli-plus icon" />
                    <div className="type">
                      <div className="name">
                        <span className="hide-on-small-only">Add Story</span>
                        <span className="hide-on-medium-and-up sf-hidden">
                          Story
                        </span>
                      </div>
                      <div>Photo / Video </div>
                    </div>
                  </div>
                </label>
                <label data-size="small" data-position="top" title="">
                  <input
                    name="type"
                    type="radio"
                    defaultValue="album"
                    className="sf-hidden"
                  />
                  <div style={{ borderRadius: "0 5px 5px 0" }}>
                    <span className="sli sli-layers icon" />
                    <div className="type">
                      <div className="name">
                        <span className="hide-on-small-only">Add Album</span>
                        <span className="hide-on-medium-and-up sf-hidden">
                          Album
                        </span>
                      </div>
                      <div>Photo / Video </div>
                    </div>
                  </div>
                </label> */}
              </div>
              <div className="clearfix posting-container">
                <div className="col s12 m6 l4">
                  <div className="hide-on-medium-and-up mobile-uploader sf-hidden"></div>
                  <section className="section mob-mb-20">
                    <div className="section-header clearfix">
                      <h2 className="section-title">Media</h2>

                    </div>
                    <div className="section-header filemanager-more-actions none clearfix sf-hidden"></div>
                    <div className="progress-filemanager">
                      <div
                        className="progress-bar-filemanager"
                        role="progressbar"
                        aria-valuenow={0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div>
                      <div
                        id="filemanager"
                        data-maxselect={10}
                        data-selected-file-ids="[]"
                        data-user-id={9545}
                        style={{ height: 538, overflowY: 'auto' }}
                        className="ofm"
                      >
                        <div className="ofm-nofiles">
                          <div className="ofm-msgbox">

                            {mediaList.length < 1 ?
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                <img className='ofm-msgbox-img'
                                  src="data:image/png;base64,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"
                                  alt=""
                                />
                                <p>
                                  Your media volume is empty. <br /> Drag some files
                                  here.
                                </p>
                                <input style={{ width: '15vw', marginTop: '10px' }}
                                  type="file"
                                  accept="image/*,video/*"
                                  multiple
                                  onChange={handleFileChange}
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full
file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
hover:file:bg-blue-100 transition"
                                />
                               
                              </div>
                              :
                              <div>
                                {/* ----------------------- File upload Section  ------------------------*/}

                                  <h1>{mediaList.length} files</h1>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                                  {mediaList.map((media, index) => (
                                    <div
                                      key={index}
                                      className="relative border border-gray-300 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                                    >
                                      {media.type === "image" ? (
                                        <img src={media.url} alt="preview" className="w-full h-40 object-cover" />
                                      ) : (
                                        <video src={media.url} className="w-full h-40 object-cover" controls />
                                      )}
                                      <button
                                        onClick={() => removeMedia(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                      >
                                        <X size={18} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
 <input style={{ width: '15vw', marginTop: '10px' }}
                                  type="file"
                                  accept="image/*,video/*"
                                  multiple
                                  onChange={handleFileChange}
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full
file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
hover:file:bg-blue-100 transition"
                                />
                                {showLogs && (
                                  <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg transition-all">
                                    <h3 className="font-bold mb-2">Validation Errors</h3>
                                    <ul className="list-disc pl-6">
                                      {logs.map((l, i) => (
                                        <li key={i}>{l}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>

                            }

                          </div>
                        </div>

                      </div>
                    </div>
                  </section>
                </div>
                <div className="col s12 m6 m-last l4">
                  <section className="section mob-mb-20">
                    <div className="section-header clearfix">
                      <h2 className="section-title">New Post</h2>

                    </div>
                    <div
                      className="section-content controls"
                      style={{ minHeight: 429 }}
                    >
                      <div className="form-result" />
                      <p className="account-error mb-10 none sf-hidden" />
                      <div className="basic-settings active">

                        <div className="tabs mb-10">
                          <div className="tabheads post-data clearfix">
                            <a
                              className="active"
                              href="javascript:void(0)"
                              style={{
                                width: "50%",
                                borderRadius: "5px 0 0 5px",
                                MozBorderRadius: "5px 0 0 5px",
                                WebkitBorderRadius: "5px 0 0 5px"
                              }}
                              data-tab={1}
                            >
                              Caption
                            </a>
                          </div>
                          <div className="tabcontents">
                            <div className="active pos-r" data-tab={1}>
                              <textarea
                                className="caption input"
                                name="caption"
                                id="caption"
                                maxLength={2200}
                                placeholder="Write a caption"
                                defaultValue={""}
                              />
                              <a
                                className="sli sli-grid caption-picker js-open-popup"
                                href="https://app.fanzella.com/captions"
                                data-popup="#captions-overlay"
                              />
                            </div>
                            <div className="pos-r sf-hidden" data-tab={2}></div>
                          </div>
                        </div>
                        <div className="mb-20">
                          <ul className="field-tips">
                            <li>Invisible space to separate text: ⠀</li>
                          </ul>
                        </div>
                        <div className="search-results none sf-hidden" />
                      </div>

                      <div className="bulk-posting js-loading-bulk-posting active">
                        <input
                          id="bulk-posting"
                          name="bulk-posting"
                          className="mb-10 selectized"
                          type="text"
                          placeholder="Select accounts..."
                          defaultValue=""
                          tabIndex={-1}
                          style={{ display: "none" }}
                        />
                        <div className="selectize-control mb-10 multi plugin-remove_button plugin-drag_drop plugin-preserve_search">
                          <div className="selectize-input items not-full ui-sortable">
                            <input
                              type="text"
                              autoComplete="off"
                              tabIndex=""
                              id="bulk-posting-selectized"
                              placeholder="Select accounts..."
                              style={{ width: "111.688px" }}
                              defaultValue=""
                            />
                          </div>
                          <div
                            className="selectize-dropdown multi mb-10 plugin-remove_button plugin-drag_drop plugin-preserve_search"
                            style={{
                              display: "none",
                              width: "325.95px",
                              top: "64.8px",
                              left: 0
                            }}
                          />
                        </div>
                        <ul className="field-tips">
                          <div className="mt-5">
                            <li>Safety delay between similar posts ...</li>
                          </div>
                        </ul>
                        <select className="input mb-20" name="safety-delay">
                          <option value={180} selected="">
                            3 minutes
                          </option>
                          <option value={240}>4 minutes</option>
                          <option value={300}>5 minutes</option>
                          <option value={360}>6 minutes</option>
                          <option value={420}>7 minutes</option>
                          <option value={480}>8 minutes</option>
                          <option value={540}>9 minutes</option>
                          <option value={600}>10 minutes</option>
                          <option value={660}>11 minutes</option>
                          <option value={720}>12 minutes</option>
                          <option value={780}>13 minutes</option>
                          <option value={840}>14 minutes</option>
                          <option value={900}>15 minutes</option>
                          <option value={960}>16 minutes</option>
                          <option value={1020}>17 minutes</option>
                          <option value={1080}>18 minutes</option>
                          <option value={1140}>19 minutes</option>
                          <option value={1200}>20 minutes</option>
                          <option value={1260}>21 minutes</option>
                          <option value={1320}>22 minutes</option>
                          <option value={1380}>23 minutes</option>
                          <option value={1440}>24 minutes</option>
                          <option value={1500}>25 minutes</option>
                          <option value={1560}>26 minutes</option>
                          <option value={1620}>27 minutes</option>
                          <option value={1680}>28 minutes</option>
                          <option value={1740}>29 minutes</option>
                          <option value={1800}>30 minutes</option>
                          <option value={1860}>31 minutes</option>
                          <option value={1920}>32 minutes</option>
                          <option value={1980}>33 minutes</option>
                          <option value={2040}>34 minutes</option>
                          <option value={2100}>35 minutes</option>
                          <option value={2160}>36 minutes</option>
                          <option value={2220}>37 minutes</option>
                          <option value={2280}>38 minutes</option>
                          <option value={2340}>39 minutes</option>
                          <option value={2400}>40 minutes</option>
                          <option value={2460}>41 minutes</option>
                          <option value={2520}>42 minutes</option>
                          <option value={2580}>43 minutes</option>
                          <option value={2640}>44 minutes</option>
                          <option value={2700}>45 minutes</option>
                          <option value={2760}>46 minutes</option>
                          <option value={2820}>47 minutes</option>
                          <option value={2880}>48 minutes</option>
                          <option value={2940}>49 minutes</option>
                          <option value={3000}>50 minutes</option>
                          <option value={3060}>51 minutes</option>
                          <option value={3120}>52 minutes</option>
                          <option value={3180}>53 minutes</option>
                          <option value={3240}>54 minutes</option>
                          <option value={3300}>55 minutes</option>
                          <option value={3360}>56 minutes</option>
                          <option value={3420}>57 minutes</option>
                          <option value={3480}>58 minutes</option>
                          <option value={3540}>59 minutes</option>
                          <option value={3600}>1 hour</option>
                          <option value={7200}>2 hours</option>
                          <option value={10800}>3 hours</option>
                          <option value={14400}>4 hours</option>
                          <option value={18000}>5 hours</option>
                          <option value={21600}>6 hours</option>
                          <option value={25200}>7 hours</option>
                          <option value={28800}>8 hours</option>
                          <option value={32400}>9 hours</option>
                          <option value={36000}>10 hours</option>
                          <option value={39600}>11 hours</option>
                          <option value={43200}>12 hours</option>
                          <option value={46800}>13 hours</option>
                          <option value={50400}>14 hours</option>
                          <option value={54000}>15 hours</option>
                          <option value={57600}>16 hours</option>
                          <option value={61200}>17 hours</option>
                          <option value={64800}>18 hours</option>
                          <option value={68400}>19 hours</option>
                          <option value={72000}>20 hours</option>
                          <option value={75600}>21 hours</option>
                          <option value={79200}>22 hours</option>
                          <option value={82800}>23 hours</option>
                        </select>
                      </div>
                    </div>
                    <div className="post-submit">
                      <input
                        className="fluid large button"
                        data-value-now="Post now"
                        data-value-schedule="Schedule the post"
                        data-value-success="Post added to queue"
                        type="submit"
                        defaultValue="Post now"
                      />
                    </div>
                  </section>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
      <veepn-guard-alert>
        <template shadowrootmode="open" />
      </veepn-guard-alert>
      <veepn-lock-screen>
        <template shadowrootmode="open" />
      </veepn-lock-screen>
    </>

  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  gridItem: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #ccc",
  },
  media: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  removeBtn: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "4px 8px",
    cursor: "pointer",
  },
  logBox: {
    background: "#f4f4f4",
    padding: "1rem",
    borderRadius: "8px",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
  },
};


export default CreatPost;

