// App.jsx
import { Routes, Route } from 'react-router-dom'; // No need for BrowserRouter here
import './App.css';
import InstaAccount from './assets/pages/InstaAccounts/InstaAccounts.jsx';
import CreatPost from './assets/pages/CreatPost/CreatPost.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import AddAccount from './assets/pages/AddAccount/AddAccount.jsx';

function App() {
  return (
    <div className='main-app'>
      <SideBar />
      <div className="pages">
      <Routes>
        <Route path="/" element={<CreatPost />} />
        <Route path="/accounts" element={<InstaAccount />} />
        <Route path="/add_account" element={<AddAccount />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
