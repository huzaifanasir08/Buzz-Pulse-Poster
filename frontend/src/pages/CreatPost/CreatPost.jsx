// export default CreatPost;
import React, { useState, useRef, useEffect, useContext } from 'react'
import './CreatPost.css'; // Import your CSS file for styles
// import main_icon from '../../images/main_icon.png'; // Import your main icon image
import { X } from 'lucide-react';
// import photo from '../../assets/images/photo.png'; // Import your image icon
import axios from 'axios';
import { useSection } from '../../Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreatPost = () => {
  const [mediaList, setMediaList] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const [postMode, setPostMode] = useState("");
  const [allAccounts, setAllAccounts] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [safetyDelay, setSafetyDelay] = useState(1); // default 1h
  const [dailyTime, setDailyTime] = useState("07:00");  // default time
  const [post_type, setPostType] = useState("post");  // default time

  const { setSection } = useSection();
  setSection('Add Post')


  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      if (file.size > 8 * 1024 * 1024) {
        reject(`? ${file.name} - File too large (max 8MB)`);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        if (img.width < 320 || img.width > 1440) {
          reject(`? ${file.name} - Image width must be between 320px and 1440px`);
        } else if (ratio < 0.8 || ratio > 1.91) {
          reject(`? ${file.name} - Invalid image aspect ratio (${ratio.toFixed(2)})`);
        } else {
          resolve({ type: "image", file, url: URL.createObjectURL(file) });
        }
      };
      img.onerror = () => reject(`? ${file.name} - Failed to load image`);
      img.src = URL.createObjectURL(file);
    });
  };

  const validateVideo = (file) => {
  return new Promise((resolve, reject) => {
    // Instagram max video file size: up to 4GB (but let's limit to 2MB for performance)
    if (file.size > 200 * 1024 * 1024) {
      reject(`? ${file.name} - File too large (max 200MB)`);
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const width = video.videoWidth;
      const height = video.videoHeight;
      const ratio = width / height;
      const duration = video.duration;

      // Duration checks
      // Feed & reels: 3 to 90 sec, IGTV: up to 60 min, Stories: 1 to 60 sec (safe bounds: 3s - 3600s)
      if (duration < 3 || duration > 3600) {
        reject(`? ${file.name} - Invalid duration (${duration.toFixed(2)}s, must be 3s to 3600s)`);
        return;
      }

      // Aspect ratio: 4:5 (0.8) to 16:9 (1.78) is safe, but IG allows 0.56 to 1.91
      if (ratio < 0.8 || ratio > 1.91) {
        reject(`❌ ${file.name} - Invalid aspect ratio (${ratio.toFixed(4)}). Allowed range is 0.8 (4:5) to 1.91 (approx 16:9). Consider cropping or padding the video.`);
        return;
      }



      // Dimension sanity checks (Instagram recommends 1080p max, but allow less)
      if (width < 320 || height < 240) {
        reject(`? ${file.name} - Resolution too low (${width}x${height}, must be at least 320x240)`);
        return;
      }

      resolve({
        type: "video",
        file,
        url: URL.createObjectURL(file),
        duration,
        resolution: `${width}x${height}`,
        ratio: ratio.toFixed(2),
      });
    };

    video.onerror = () => reject(`? ${file.name} - Failed to load video metadata`);
    video.src = URL.createObjectURL(file);
  });
};



  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const newMedia = [];
    let errors = []
    for (const file of files) {
      try {
        const validated =
          file.type.startsWith("image/") ? await validateImage(file) :
            file.type.startsWith("video/") ? await validateVideo(file) :
              (() => { throw `? ${file.name} - Unsupported file type`; })();
        newMedia.push(validated);
      } catch (err) {
        errors.push(err)
      }
    }
    errors.forEach((error, index) => {
      setTimeout(() => {
        toast.error(error, {
          autoClose: 3000,
        });
      }, index * 500);
    });

    setMediaList((prev) => [...prev, ...newMedia]);
  };

  const removeMedia = (index) => {
    setMediaList((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  };

  const [buttonText, setButtonText] = useState('Choose files');

  const handleFileChanges = () => {
    setButtonText('Choose files');
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const ChangeToPost = () => {
    setPostType("post");
  }

  const ChangeToReels = () => {
    setPostType("reels");
  }
  const uploadMediaToBackend = async () => {
    let fileUrls = []
    if (!selectedAccount) {
      alert("Please select an account first!");
      return;
    }
    if (mediaList.length === 0) {
      alert("Please select at least one media file!");
      return;
    }
    if (caption.length > 2200) {
      alert("Caption is too long! (max 2200 characters)");
      return;
    }
    else if (caption.length < 1) {
      alert("Caption is too short!");
      return;
    }
    if (hashtags.length > 120) {
      alert("Hashtags are too long! (max 30 characters)");
      return;
    }
    else if (hashtags.length < 1) {
      alert("Hashtags are too short!");
      return;
    }
    if (postMode === "daily" && !dailyTime) {
      alert("Please select a daily post time!");
      return;
    }
    if (postMode === "") {
      alert("Please select a post mode (delay or daily)!");
      return;
    }



    // 1. First upload all media files
    const uploadingToast = toast.loading("Uploading Media...");
    for (let i = 0; i < mediaList.length; i++) {
      const formData = new FormData();
      formData.append(`file${i}`, mediaList[i].file);

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "base_url/api/upload_to_gcs/", true);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setUploadProgress((prev) => ({ ...prev, [i]: percent.toFixed(2) }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            setUploadProgress((prev) => ({ ...prev, [i]: 100 }));
            try {
              const response = JSON.parse(xhr.responseText);
              const fileUrl = response.file_url; // Extract file_url from response
              fileUrls.push(fileUrl)

              // You can now use the file_url (e.g., store it in state or display it)
              // console.log(`File URL: ${fileUrl}`);
              // For example, add it to a state array or an object
              // setFileUrls((prevUrls) => [...prevUrls, fileUrl]);

            } catch (err) {
              reject(`Error parsing response: ${err}`);
            }
            resolve();
          } else {
            reject(`Upload failed: ${xhr.responseText}`);
          }
        };

        xhr.onerror = () => reject("Network error");
        xhr.send(formData);
      }).catch((err) => {
        toast.error(`? Error uploading ${mediaList[i].file.name}:\n${err}`, {
          autoClose: 2000,
        });
      });
    }

    toast.update(uploadingToast, {
              render: "All media uploaded!",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });

    setMediaList([]);
    setUploadProgress({});

    // 2. Now send the POST settings (caption, selected account, post mode etc.)

    const payload = {
      media_urls: fileUrls, // Use the uploaded file URLs
      account_id: selectedAccount.id,
      account_username: selectedAccount.username,
      caption: caption,
      hashtags: hashtags,
      post_type: post_type,
      post_mode: postMode, // "delay" or "daily"
      ...(postMode === "delay" && { safety_delay_seconds: safetyDelay }),
      ...(postMode === "daily" && { daily_post_time: dailyTime }),
    };

    // console.log("Sending final post data:", payload);
    setCaption("");
    setHashtags("");
    setSafetyDelay(1); // Reset to default
    setDailyTime("07:00"); // Reset to default
    setQuery(''); // Reset search query
    setPostMode(""); // Reset post mode
    setAllAccounts([]); // Reset all accounts
    const toastId = toast.loading("Saving Posts...");
    try {
      const response = await fetch('base_url/api/savedata/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      toast.update(toastId, {
                render: "?? Posts scheduled successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
      });
      
    } catch (error) {
      console.error('Failed to save post settings:', error);
      toast.update(toastId, {
                render: "? Failed to schedule the posts.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
              });
    }
  };


  useEffect(() => {
    if (mediaList.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input!
    }
  }, [mediaList]);

  const fetchAllAccounts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('base_url/api/accountslist'); // No search query
      setAllAccounts(response.data.accounts);
      // console.log('Fetched accounts:', response.data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchAllAccounts();
  }, []);

  useEffect(() => {
    if (!Array.isArray(allAccounts)) return; // Safety check

    if (query.trim() === '') {
      setFilteredAccounts([]);
    } else {
      const filtered = allAccounts.filter(acc =>
        acc.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAccounts(filtered);
    }
  }, [query, allAccounts]);

  const handleSelect = (account) => {
    setSelectedAccount(account);
    setQuery(account.username);
    setFilteredAccounts([]);
  };



  return (

    <>
      <title>New Post</title>
      <ToastContainer />
      <meta name="referrer" content="no-referrer" />
      <link
        rel="shortcut icon"
        href="main_icon.png"
        type="image/x-icon"
      />

      <div className="skeleton" style={{ width: '100%' }} id="post">
        <form
          action="javascript:void(0)"
          data-post-id=""
          autoComplete="off"
        >
          <div className="container-1200">
            <div className="row">
              <div className="types clearfix">
                <label data-size="small" data-position="top" title="" onClick={ChangeToPost}>
                  <input
                    name="type"
                    defaultValue="timeline"
                    type="radio"
                    className="sf-hidden"
                    defaultChecked // <-- moved here
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
                      <div>Photos / Videos </div>
                    </div>
                  </div>
                </label>

                <label data-size="small" data-position="top" title="" className="active" onClick={ChangeToReels}>
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
                        <span className="hide-on-small-only">Add Reels</span>
                        <span className="hide-on-medium-and-up sf-hidden">
                          Reels
                        </span>
                      </div>
                      <div>Videos / Reels </div>
                    </div>
                  </div>
                </label>
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
                      <div style={{ height: 538, overflowY: 'auto', padding: '20px 0px 20px 20px' }} className='media-container'>
                        {mediaList.length === 0 ? (<img src='photo.png' alt="image" style={{ width: '20%', opacity: '.4' }} />) : ''}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6" style={{ overflowY: 'auto', paddingRight:'15px' }}>
                          {mediaList.map((media, index) => (
                            <div key={index} className="relative border p-2 rounded shadow">
                              {media.type === "image" ? (
                                <img src={media.url} alt="preview" className="w-full h-32 object-cover rounded" />
                              ) : (
                                <video src={media.url} className="w-full h-32 object-cover rounded" controls />
                              )}
                              <button
                                onClick={() => removeMedia(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 img-btn-cross"
                              >
                                <X size={16} />
                              </button>
                              <div className="mt-2 text-sm text-gray-700">
                                {uploadProgress[index] ? (
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div
                                      className="bg-blue-600 h-2.5 rounded-full"
                                      style={{ width: `${uploadProgress[index]}%` }}
                                    />
                                  </div>
                                ) : (
                                  "Not uploaded"
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <button
                            onClick={handleButtonClick}
                            style={{ padding: '5px 30px' }}
                            className="mb-4 upload-btn"
                          >
                            {buttonText}
                          </button>
                          <input
                            type="file"                         
                            accept={post_type === "post" ? "image/*,video/*" : "video/*"}
                            multiple
                            onChange={(e) => {
                              handleFileChange(e);
                              handleFileChanges(e);
                            }}
                            ref={fileInputRef}
                            style={{ display: 'none' }} // HIDE the real file input
                          />
                        </div>
                        {/* <input
                          style={{ padding: '5px 0 0 90px' }}
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          className="mb-4"
                        /> */}

                      </div>

                    </div>
                  </section>
                </div>
                <div className="col s12 m6 m-last l4">
                  <section className="section mob-mb-20">
                    <div className="section-header clearfix">
                      <h2 className="section-title">Post Details</h2>

                    </div>
                    <div
                      className="section-content-cp controls"
                      style={{ minHeight: 429, textAlign: 'left' }}
                    >
                      <div className="form-result" />
                      <p className="account-error mb-10 none sf-hidden" />
                      <div className="basic-settings active">

                        <div className="tabs mb-10">

                          <ul className="field-tips-cp">
                            <li>Caption ?</li>
                          </ul>

                          <div className="tabcontents">
                            <div className="active pos-r" data-tab={1}>
                              <textarea
                                className="caption input"
                                name="caption"
                                id="caption"
                                maxLength={2200}
                                placeholder="Write a caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}

                              />
                            </div>
                            <div className="pos-r sf-hidden" data-tab={2}></div>
                          </div>
                        </div>
                        <div className="tabs mb-10">

                          <ul className="field-tips-cp">
                            <li>Hashtags ?</li>
                          </ul>

                          <div className="tabcontents">
                            <div className="active pos-r" data-tab={1}>
                              <textarea
                                className="caption input"
                                name="hashtags"
                                id="hashtags"
                                maxLength={2200}
                                placeholder="#example #hashtag"
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}

                              />
                            </div>
                            <div className="pos-r sf-hidden" data-tab={2}></div>
                          </div>
                        </div>
                      </div>

                      <div className="bulk-posting js-loading-bulk-posting active">
                        <div className="selectize-control mb-10 multi plugin-remove_button plugin-drag_drop plugin-preserve_search">
                          <div className="account-selector" style={{ position: 'relative', width: '300px' }}>
                            <ul className="field-tips-cp">
                              <li>Select account for this posting</li>
                            </ul>

                            <div style={{ position: 'relative', display: 'flex' }}>
                              <input
                                type="text"
                                value={query}
                                placeholder={loading ? "Loading accounts..." : "Select accounts..."}
                                onChange={(e) => {
                                  setQuery(e.target.value);
                                  setSelectedAccount(null); // clear selected when typing
                                }}
                                style={{ width: '100%', padding: '10px', border: '1px solid #7a7a7a', color: '#7a7a7a' }}
                                disabled={loading}

                              />
                              <button onClick={fetchAllAccounts} className='ref-btn'>Refresh</button>


                              {loading && (
                                <div style={{
                                  position: 'absolute',
                                  top: '50%',
                                  right: '10px',
                                  transform: 'translateY(-50%)',
                                }}>
                                  <div className="spinner" />
                                </div>
                              )}
                            </div>

                            {filteredAccounts.length > 0 && !selectedAccount && (
                              <ul className="suggestions-dropdown" style={{
                                border: '1px solid #ccc',
                                borderTop: 'none',
                                width: '100%',
                                position: 'absolute',
                                backgroundColor: 'white',
                                zIndex: 10,
                                listStyle: 'none',
                                padding: 0,
                                margin: 0
                              }}>
                                {filteredAccounts.map((account) => (
                                  <li
                                    key={account.id}
                                    onClick={() => handleSelect(account)}
                                    style={{ padding: '8px', cursor: 'pointer' }}
                                  >
                                    {account.username}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {selectedAccount && (
                              <div className="selected-account" style={{ marginTop: '10px' }}>
                                Selected: <strong>{selectedAccount.username}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          {/* Checkboxes */}
                          <div className="mb-5">
                            <ul className="field-tips-cp">
                              <li>Select one of these ?</li>
                            </ul>
                            <label className="mr-4" style={{ opacity: '.7' }}>
                              <input style={{ color: '#949494' }}
                                type="checkbox"
                                checked={postMode === "delay"}
                                onChange={() => setPostMode("delay")}
                              />{" "}
                              Post with specific time delay
                            </label>
                            <label className="ml-4" style={{ opacity: '.7' }}>
                              <input style={{ color: '#949494' }}
                                type="checkbox"
                                checked={postMode === "daily"}
                                onChange={() => setPostMode("daily")}
                              />{" "}
                              Post on specific time daily
                            </label>
                          </div>

                          {/* Option 1: Delay Selection */}
                          {postMode === "delay" && (
                            <div>
                              <ul className="field-tips-cp">
                                <div className="mt-5">
                                  <li>Safety delay between similar posts</li>
                                </div>
                              </ul>
                              <select className="input mb-20" name="safety-delay"
                                value={safetyDelay}
                                onChange={(e) => setSafetyDelay(Number(e.target.value))}>
                                <option value={1} selected="">
                                  1 hour
                                </option>
                                <option value={2}>2 hours</option>
                                <option value={3}>3 hours</option>
                                <option value={4}>4 hours</option>
                                <option value={5}>5 hours</option>
                                <option value={6}>6 hours</option>
                                <option value={7}>7 hours</option>
                                <option value={8}>8 hours</option>
                                <option value={9}>9 hours</option>
                                <option value={10}>10 hours</option>
                                <option value={11}>11 hours</option>
                                <option value={12}>12 hours</option>
                                <option value={13}>13 hours</option>
                                <option value={14}>14 hours</option>
                                <option value={15}>15 hours</option>
                                <option value={16}>16 hours</option>
                                <option value={17}>17 hours</option>
                                <option value={18}>18 hours</option>
                                <option value={19}>19 hours</option>
                                <option value={20}>20 hours</option>
                                <option value={21}>21 hours</option>
                                <option value={22}>22 hours</option>
                                <option value={23}>23 hours</option>
                                <option value={24}>1 day</option>
                                <option value={25}>25 hours</option>
                                <option value={26}>26 hours</option>
                                <option value={27}>27 hours</option>
                                <option value={28}>28 hours</option>
                                <option value={29}>29 hours</option>
                                <option value={30}>30 hours</option>
                                <option value={31}>31 hours</option>
                                <option value={32}>32 hours</option>
                                <option value={33}>33 hours</option>
                                <option value={34}>34 hours</option>
                                <option value={35}>35 hours</option>
                                <option value={36}>36 hours</option>
                              </select>
                            </div>
                          )}

                          {/* Option 2: Specific Time Picker */}
                          {postMode === "daily" && (
                            <div className="mt-5">
                              <ul className="field-tips-cp">
                                <div className="mt-5">
                                  <li>Select time to post daily</li>
                                </div>
                              </ul>
                              <input
                                type="time"
                                name="daily-post-time"
                                className="input mb-20"
                                defaultValue="07:00"
                                value={dailyTime}
                                onChange={(e) => setDailyTime(e.target.value)}
                              // You can add onChange to capture selected time if needed
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="post-submit">
                      <button
                        type="button"
                        className="fluid large button"
                        onClick={uploadMediaToBackend}
                      >
                        Post now
                      </button>
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
