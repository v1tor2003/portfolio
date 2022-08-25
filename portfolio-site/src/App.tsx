import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './components/Home/Home'
import { About } from './components/About/About'
import { Projects } from './components/Projects/Projects'
import { Contact } from './components/Contact/Contact'
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { SharedLayout } from './components/SharedLayout/SharedLayout';

export const App:React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/projects' element={<Projects />}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </React.Fragment>
  );
}
