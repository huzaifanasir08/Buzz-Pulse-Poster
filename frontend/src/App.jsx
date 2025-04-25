// App.jsx
import { Routes, Route } from 'react-router-dom'; // No need for BrowserRouter here
import './App.css';
import InstaAccount from './pages/InstaAccounts/InstaAccounts.jsx';
import CreatPost from './pages/CreatPost/CreatPost.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import AddAccount from './pages/AddAccount/AddAccount.jsx';
import Statistics from './pages/Statistics/Statistics.jsx';

function App() {
  return (
    <div className='main-app'>
      <SideBar />
      <div className="pages">
      <Routes>
        <Route path="/" element={<CreatPost />} />
        <Route path="/accounts" element={<InstaAccount />} />
        <Route path="/add_account" element={<AddAccount />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
