import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useSection } from '../../Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const { setSection } = useSection();
  setSection('Profile');

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: ''
  });

  const [originalData, setOriginalData] = useState({});
  const [isChangePasswordChecked, setIsChangePasswordChecked] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = 'http://168.231.74.109:8080/admin/password_change/'

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('base_url/api/profile'); // 🔁 Update endpoint
        setProfileData(res.data);
        setOriginalData(res.data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    fetchProfile();
  }, []);

  // Check if form values have changed
  useEffect(() => {
    const changed =
      profileData.first_name !== originalData.first_name ||
      profileData.last_name !== originalData.last_name ||
      (isChangePasswordChecked && newPassword !== '');

    setIsChanged(changed);
  }, [profileData, originalData, newPassword, isChangePasswordChecked]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordCheckboxChange = () => {
    setIsChangePasswordChecked(!isChangePasswordChecked);
    setNewPassword('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Saving Details...");
    try {
      const payload = { ...profileData };

      await axios.put('base_url/api/profile/', payload); // 🔁 Update endpoint
      setOriginalData(profileData); // Reset original data
      setIsChangePasswordChecked(false);
      setNewPassword('');
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to update profile!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ToastContainer />
      <title>Profile</title>
      <div className="profile-form-container">
        <h2 className="form-title">Profile Settings</h2>
        <form className="profile-form" onSubmit={handleSave}>
          {['first_name', 'last_name'].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={profileData[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <div className="form-group">
            <label className="checkbox-label">
              <input
                style={{ width: '15px' }}
                type="checkbox"
                checked={isChangePasswordChecked}
                onChange={handlePasswordCheckboxChange}
              />
              Change Password
            </label>
          </div>

          {isChangePasswordChecked && (
            <div className="form-group">
              <label className='pas-lble' onClick={() => window.open(url, '_blank')}>Password Manager →</label>
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={!isChanged || loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </>
  );
}
