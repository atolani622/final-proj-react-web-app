import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CollegeRecipeFinder from './CollegeRecipeFinder';

export default function App() {
  return (
   <HashRouter>
    <div>
     <Routes>
      <Route path="/" element={<Navigate to="Kanbas"/>}/>
      <Route path="/CollegeRecipeFinder/*" element={<CollegeRecipeFinder />} />
     </Routes>
    </div>
   </HashRouter>
 );}
 
