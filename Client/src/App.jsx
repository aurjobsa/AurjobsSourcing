import React from 'react'
import Home from './pages/Home'
import Particle from './components/Particle'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Search from './pages/Search'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Particle />
        <Navbar/> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate_register' element={<Register/>}/>
          <Route path='/candidate_login' element={<Register/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

