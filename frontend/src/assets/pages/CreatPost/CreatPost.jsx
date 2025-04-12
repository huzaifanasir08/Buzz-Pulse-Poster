import React from 'react'
import './CreatPost.css'; // Import your CSS file for styles
import main_icon from '../../images/main_icon.png'; // Import your main icon image

const CreatPost = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 style={{fontSize:'2rem'}} className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">Subscription expire: 2025-04-07</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Renew
            </button>
            <i className="fas fa-bell text-gray-500"></i>
            <i className="fas fa-envelope text-gray-500"></i>
            <i className="fas fa-cog text-gray-500"></i>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">RI</span>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Post
            <br />
            Photo / Video
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Add Reels
            <br />
            Video
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Add Story
            <br />
            Photo / Video
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Add Album
            <br />
            Photo / Video
          </button>
        </div>
        {/* Content */}
        <div className="flex space-x-6">
          {/* Media Section */}
          <div className="bg-white p-4 rounded shadow w-1/3">
            <h2 className="text-lg font-semibold mb-4">Media</h2>
            <div className="border border-dashed border-gray-300 p-6 text-center">
              <img
                alt="Media Placeholder"
                className="mx-auto mb-4"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/OmXMorRo1j1XCpNE1CCZW3AEY_FeO5gzlh68p4mxl2s.jpg"
                width="100"
              />
              <p className="text-gray-500 mb-4">
                Your media volume is empty. Drag some files here.
              </p>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
                Select files
              </button>
            </div>
          </div>
          {/* New Post Section */}
          <div className="bg-white p-4 rounded shadow w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">New Post</h2>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
                Add Account
              </button>
            </div>
            <div className="border border-gray-300 p-4 mb-4">
              <h3 className="text-gray-500 mb-2">Basic Settings</h3>
              <div className="border border-dashed border-gray-300 p-6 text-center mb-4">
                <p className="text-gray-500">Drag media here to post</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 mb-2">CAPTION</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Write a caption"
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 mb-2">FIRST COMMENT</label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Write a comment"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex items-center mb-4">
                <input className="mr-2" id="invisible-space" type="checkbox" />
                <label className="text-gray-500" htmlFor="invisible-space">
                  Invisible space to separate text
                </label>
              </div>
              <div className="flex items-center">
                <input className="mr-2" id="schedule" type="checkbox" />
                <label className="text-gray-500" htmlFor="schedule">
                  Schedule
                </label>
              </div>
            </div>
          </div>
          {/* Instagram Preview Section */}
          <div className="bg-white p-4 rounded shadow w-1/3">
            <h2 className="text-lg font-semibold mb-4">Instagram</h2>
            <div className="border border-gray-300 p-6 text-center">
              <img
                alt="Instagram Placeholder"
                className="mx-auto mb-4"
                height="100"
                src="https://storage.googleapis.com/a1aa/image/Pm4CEVoil88ONI_jgNmOk0SwIlamxSjiBprhTYAXMKE.jpg"
                width="100"
              />
              <p className="text-gray-500">
                Instagram post preview will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatPost;

