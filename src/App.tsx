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
import { useState } from 'react';
import { couldStartTrivia } from 'typescript';

export default function App() {
    const [recipes, setRecipes] = useState<any[]>([]);
  return (
    <HashRouter>
        <Provider store={store}>
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/Details" element={<Details />} />
                <Route path='/Dashboard' element={<Dashboard 
                recipes = {recipes} 
                setRecipes = {setRecipes} />} />
            </Routes>
        </div>
        </Provider>
    </HashRouter>
);
  }
 
