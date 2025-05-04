import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import CountryDetails from './pages/CountryDetails';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
      <Router>
        <NavBar></NavBar>
        <div className='container mx-auto px-4 px-6'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/country/:code" element={<CountryDetails/>}/>
          </Routes>
        </div>
      </Router>
  )
};

export default App;