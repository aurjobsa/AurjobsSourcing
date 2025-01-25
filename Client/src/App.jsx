import React from 'react'
import Home from './pages/Home'
import Particle from './components/Particle'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Search from './pages/Search'

const App = () => {
  return (
    <div className='font-sans'>
      <BrowserRouter>
        {/* <Particle /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate_register' element={<Register/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
