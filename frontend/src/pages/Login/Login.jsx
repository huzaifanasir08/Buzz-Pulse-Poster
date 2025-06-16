import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const toastId = toast.loading("Logging in...");

    try {
      const response = await axios.post(' https://srv810632.hstgr.cloud/api/login/', credentials);
      login(response.data.token);
      toast.update(toastId, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate('/');
    } catch (err) {
      toast.update(toastId, {
        render: "Invalid username or password",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setError('Invalid username or password');
    }
  };

  return (
    <>
    <title>Login</title>
    <div className="login-wrapper">
      
      <ToastContainer />
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue to BuzzPulsePoster</p>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            value={credentials.username}
            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="Username"
            required
          />
          <input
            className="login-input"
            type="password"
            value={credentials.password}
            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Password"
            required
          />
          <button className="login-button" type="submit">Login</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
