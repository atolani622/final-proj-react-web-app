import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './CollegeRecipeFinder/pages/Home';
import Login from './CollegeRecipeFinder/pages/Login';
import Profile from './CollegeRecipeFinder/pages/Profile';
import Register from './CollegeRecipeFinder/pages/Register';
import Search from './CollegeRecipeFinder/pages/Search';
import Details from './CollegeRecipeFinder/pages/Details';
import Dashboard from './CollegeRecipeFinder/pages/Dashboard';
import { Provider } from 'react-redux';
import store from './CollegeRecipeFinder/store';

export default function App() {
  return (
    <HashRouter>
        <Provider store={store}>
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/details" element={<Details />} />
                <Route path='/dasboard' element={<Dashboard />} />
            </Routes>
        </div>
        </Provider>
    </HashRouter>
);
  }
 
