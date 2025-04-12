import React from 'react';
// import './App.css'; // This is where you'll add your CSS styles (if you separate them)
import './InstaAccounts.css'; // Import your CSS file for styles
import { NavLink } from 'react-router-dom';

const MainContent = () => {
  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 style={{fontSize:'2rem'}} className="text-2xl font-semibold">Saved Accounts</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Subscription expire: 2025-04-07</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Renew</button>
          <i className="fas fa-bell text-xl"></i>
          <i className="fas fa-cog text-xl"></i>
          <i className="fas fa-user-circle text-xl"></i>
          <span className="text-gray-500">Hi, Raphael</span>
        </div>
      </div>
      <div className="mb-4">
        <input className="w-full p-2 border rounded" placeholder="Search accounts..." type="text" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["FILTER", "Custom Proxy (0)", "System Proxy (0)", "Hide accelerators (0)", "Only accelerators (0)", "Reactions Pro (0)", "Repost Pro (0)", "Welcome DM (0)", "Re-login required (0)", "Hide re-login required (0)", "Verified (0)", "Hide verified (0)", "Potential Spam (0)", "Hide potential spam (0)", "Removed content (0)", "No removed content (0)", "Can be recommended (0)", "Cannot be recommended (0)", "Lowered in feed (0)", "Not lowered in feed (0)", "Monetization enabled (0)", "Monetization disabled (0)", "Some features restricted (0)", "No features restricted (0)", "Collaboration disabled (0)", "Collaboration enabled (0)", "Appeal sent (0)", "Hide appeal sent (0)", "Recovered after appeal (0)", "Hide recovered after appeal (0)"].map(tag => (
          <span className="bg-gray-200 px-3 py-1 rounded-full" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-500">You haven't added any Instagram account yet. Click the button below to add your first account:</p>
        <NavLink to={'/add_account'} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">New Account</NavLink>
      </div>


      {/* ####################################################################### */}
      <div className="flex justify-between items-center mb-4">
        <h1 style={{fontSize:'2rem'}} className="text-2xl font-semibold">Saved Accounts</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Subscription expire: 2025-04-07</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Renew</button>
          <i className="fas fa-bell text-xl"></i>
          <i className="fas fa-cog text-xl"></i>
          <i className="fas fa-user-circle text-xl"></i>
          <span className="text-gray-500">Hi, Raphael</span>
        </div>
      </div>
      <div className="mb-4">
        <input className="w-full p-2 border rounded" placeholder="Add new" type="text" />
      </div>
      <div className="mb-4">
        <input className="w-full p-2 border rounded" placeholder="Search accounts..." type="text" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["FILTER", "Custom Proxy (0)", "System Proxy (0)", "Hide accelerators (0)", "Only accelerators (0)", "Reactions Pro (0)", "Repost Pro (0)", "Welcome DM (0)", "Re-login required (0)", "Hide re-login required (0)", "Verified (0)", "Hide verified (0)", "Potential Spam (0)", "Hide potential spam (0)", "Removed content (0)", "No removed content (0)", "Can be recommended (0)", "Cannot be recommended (0)", "Lowered in feed (0)", "Not lowered in feed (0)", "Monetization enabled (0)", "Monetization disabled (0)", "Some features restricted (0)", "No features restricted (0)", "Collaboration disabled (0)", "Collaboration enabled (0)", "Appeal sent (0)", "Hide appeal sent (0)", "Recovered after appeal (0)", "Hide recovered after appeal (0)"].map(tag => (
          <span className="bg-gray-200 px-3 py-1 rounded-full" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-500">You haven't added any Instagram account yet. Click the button below to add your first account:</p>
        <NavLink to={'/add_account'} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">New Account</NavLink>
      </div><div className="flex justify-between items-center mb-4">
        <h1 style={{fontSize:'2rem'}} className="text-2xl font-semibold">Saved Accounts</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Subscription expire: 2025-04-07</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Renew</button>
          <i className="fas fa-bell text-xl"></i>
          <i className="fas fa-cog text-xl"></i>
          <i className="fas fa-user-circle text-xl"></i>
          <span className="text-gray-500">Hi, Raphael</span>
        </div>
      </div>
      <div className="mb-4">
        <input className="w-full p-2 border rounded" placeholder="Add new" type="text" />
      </div>
      <div className="mb-4">
        <input className="w-full p-2 border rounded" placeholder="Search accounts..." type="text" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["FILTER", "Custom Proxy (0)", "System Proxy (0)", "Hide accelerators (0)", "Only accelerators (0)", "Reactions Pro (0)", "Repost Pro (0)", "Welcome DM (0)", "Re-login required (0)", "Hide re-login required (0)", "Verified (0)", "Hide verified (0)", "Potential Spam (0)", "Hide potential spam (0)", "Removed content (0)", "No removed content (0)", "Can be recommended (0)", "Cannot be recommended (0)", "Lowered in feed (0)", "Not lowered in feed (0)", "Monetization enabled (0)", "Monetization disabled (0)", "Some features restricted (0)", "No features restricted (0)", "Collaboration disabled (0)", "Collaboration enabled (0)", "Appeal sent (0)", "Hide appeal sent (0)", "Recovered after appeal (0)", "Hide recovered after appeal (0)"].map(tag => (
          <span className="bg-gray-200 px-3 py-1 rounded-full" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-500">You haven't added any Instagram account yet. Click the button below to add your first account:</p>
        <NavLink to={'/add_account'} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">New Account</NavLink>
      </div>
    </div>

  );
};

const App = () => {
  return (
    <div className="flex">
      <MainContent />
    </div>
  );
};

export default App;
