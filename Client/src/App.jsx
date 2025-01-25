import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Search from './pages/Search';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='font-sans'>
      <BrowserRouter>
        <Navbar /> {/* Keep Navbar globally */}
        {/* <Particle /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
