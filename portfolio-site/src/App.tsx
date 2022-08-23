import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import {Home} from './pages/Home'
import {About} from './pages/About'
import {Projects} from './pages/Projects'
import {Contact} from './pages/Contact'
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/projects' element={<Projects />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
