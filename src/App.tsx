import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/index';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './users/Profile';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/CollegeRecipeFinder/Home" />} />
          <Route path="/CollegeRecipeFinder/Home" element={<Home />} />
          <Route path="/CollegeRecipeFinder/Login" element={<Login />} />
          <Route path="/CollegeRecipeFinder/Register" element={<Register />} />
          <Route path="/CollegeRecipeFinder/Profile" element={<Profile />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
