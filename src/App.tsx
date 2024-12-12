import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './CollegeRecipeFinder/pages/Home';
import Login from './CollegeRecipeFinder/pages/Login';
import Profile from './CollegeRecipeFinder/pages/Profile';
import Register from './CollegeRecipeFinder/pages/Register';
import Search from './CollegeRecipeFinder/pages/Search';
import Details from './CollegeRecipeFinder/pages/Details';
import { Provider } from 'react-redux';
import store from './CollegeRecipeFinder/store';
import { useState } from 'react';
import { couldStartTrivia } from 'typescript';
import RecipeDetails from './CollegeRecipeFinder/pages/RecipeDetails';

export default function App() {
    const [recipes, setRecipes] = useState<any[]>([]);
  return (
    <HashRouter>
        <Provider store={store}>
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home recipes = {recipes} setRecipes={setRecipes} />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/Details" element={<Details />} />
                <Route path="/Recipe/:recipeId" element={<RecipeDetails />} />
            </Routes>
        </div>
        </Provider>
    </HashRouter>
);
  }
 
