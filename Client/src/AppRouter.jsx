
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CandidateLogin from "./components/CandidateLogin"
import CandidateSignUp from "./components/CandidateSignUp"
import CompanyRegistration from  "./components/CompanyRegistration"
import Dashboard from "./components/Employer Dashboard/Dashboard"
import CompanyLogin from "./components/CompanyLogin"
import SearchPage from './pages/SearchPage'
import SearchResultPage from './pages/SearchResultPage'
import Navbar from "./components/Navbar";
import { ToastContainer} from 'react-toastify';
import CandidateProfile from './components/CandidateProfile'
import JobDetails from './components/Employer Dashboard/section/JobDetails'
import ApplicantProfile from './components/Employer Dashboard/section/ApplicantProfile'


const AppRouter = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/candidate_register' element={<CandidateSignUp/>}/>
        <Route path='/candidate_login' element={<CandidateLogin/>}/>
        <Route path='/company_register' element={<CompanyRegistration/>}/>
        <Route path='/company_login' element={<CompanyLogin/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/search_result' element={<SearchResultPage/>}/>
        <Route path='/employer_dashboard' element={<Dashboard/>} /> 
        <Route path='/candidate_profile/:id' element={<CandidateProfile/>} />
        <Route path="/employer_dashboard/jobs/:jobId" element={<JobDetails />} />
        <Route path='/applicant_profile/:id' element={<ApplicantProfile/>}/>

      </Routes>
    </>
  )
}

export default AppRouter
