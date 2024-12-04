import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/index';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './users/Profile';
import RecipeDetail from './pages/Recipe';

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
          <Route path="/CollegeRecipeFinder/Recipes/:id/:title" element={<RecipeDetail />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
