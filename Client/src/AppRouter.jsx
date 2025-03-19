
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CandidateLogin from "./components/CandidateLogin"
import CandidateSignUp from "./components/CandidateSignUp"
import CompanyRegistration from  "./components/CompanyRegistration"
import CompanyLogin from "./components/CompanyLogin"
import SearchPage from './pages/SearchPage'
import SearchResultPage from './pages/SearchResultPage'
import Navbar from "./components/Navbar";


const AppRouter = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/candidate_register' element={<CandidateSignUp/>}/>
        <Route path='/candidate_login' element={<CandidateLogin/>}/>
        <Route path='/company_register' element={<CompanyRegistration/>}/>
        <Route path='/company_login' element={<CompanyLogin/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/search_result' element={<SearchResultPage/>}/>


      </Routes>
    </>
  )
}

export default AppRouter
