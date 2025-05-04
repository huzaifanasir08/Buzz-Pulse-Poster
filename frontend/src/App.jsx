import { Routes, Route } from 'react-router-dom';
import './App.css';
import CreatPost from './pages/CreatPost/CreatPost.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import AddAccount from './pages/AddAccount/AddAccount.jsx';
import Statistics from './pages/Statistics/Statistics.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Cleaner from './pages/Cleaner/Cleaner.jsx';
import Login from './pages/Login/Login.jsx';
import { ContextProvider } from './Context.jsx';
import { AuthProvider } from './AuthContext.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <ContextProvider>
        <SideBar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><CreatPost /></PrivateRoute>} />
            <Route path="/add_account" element={<PrivateRoute><AddAccount /></PrivateRoute>} />
            <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/cleaner" element={<PrivateRoute><Cleaner /></PrivateRoute>} />
          </Routes>
        </div>
      </ContextProvider>
    </AuthProvider>
  );
}

export default App;
