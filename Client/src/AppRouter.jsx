
import React from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CandidateLogin from "./components/CandidateLogin"
import CandidateSignUp from "./components/CandidateSignUp"
import CompanyRegistration from  "./components/CompanyRegistration"
import Dashboard from "./components/Employer Dashboard/Dashboard"
import CompanyLogin from "./components/CompanyLogin"
import SearchPage from './pages/SearchPage'
import Register from './pages/Register'

import SearchResultPage from './pages/SearchResultPage'
import Navbar from "./components/Navbar";
import { ToastContainer} from 'react-toastify';
import CandidateProfile from './components/CandidateProfile'
import JobDetails from './components/Employer Dashboard/section/JobDetails'
import ApplicantProfile from './components/Employer Dashboard/section/ApplicantProfile'
import AIScreeningResult from './components/Employer Dashboard/section/AIScreeningResult'


const AppRouter = () => {

  const location = useLocation();

  // Define routes where Navbar should not appear
  const routesWithoutNavbar = [
    // '/candidate_login',
    // '/candidate_register',
    // '/company_login',
    // '/company_register',
    '/ai_screening_result'
  ];

  // Check if current path should have navbar
  const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);

  return (
    <>
    <ToastContainer/>
    {/* <Navbar/> */}
    {shouldShowNavbar && <Navbar />}
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
        <Route path='/ai_screening_result' element={<AIScreeningResult/>}/>
        {/* <Route path='/check' element= {<Register/>}/> */}

      </Routes>
    </>
  )
}

export default AppRouter
