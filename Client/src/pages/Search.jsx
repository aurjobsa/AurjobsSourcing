import React, { useState, useEffect } from "react";
import CompanyLogin from "../components/CompanyLogin";
import CompanyRegistration from "../components/CompanyRegistration";
import MiddleComponent from "../components/MiddleComponent";
import Navbar from "../components/Navbar";

const Search = () => {
  const [translateX, setTranslateX] = useState(0); // For controlling horizontal scroll
  const [isMobile, setIsMobile] = useState(false); // To detect mobile view
  const [currentView, setCurrentView] = useState("login"); // Tracks whether "login" or "register" is active

  useEffect(() => {
    // Detect if the screen is mobile
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigateToRegister = () => {
    setTranslateX(isMobile ? -50 : -50); // Mobile: Shift halfway, Desktop: Same
    setCurrentView("register"); // Update view to "register"
  };

  const handleNavigateToLogin = () => {
    setTranslateX(0); // Reset to the login view
    setCurrentView("login"); // Update view to "login"
  };

  return (
    <div className="overflow-hidden">
      <Navbar/>
      <div
        className={`flex h-screen transform duration-500 ease-in-out`}
        style={{
          width: isMobile ? "200%" : "100%", // Mobile: Login and Register, Desktop: Login, Middle, Register
          transform: `translateX(${translateX}%)`,
        }}
      >
        {/* Left: Company Login */}
        <div className={`h-full ${isMobile ? "w-1/2" : "w-1/2"} flex-shrink-0`}>
          <CompanyLogin navigateToRegister={handleNavigateToRegister} />
        </div>

        {/* Middle Component (Desktop Only) */}
        {!isMobile && (
          <div className="h-full w-1/2 flex-shrink-0">
            <MiddleComponent currentView={currentView} />
          </div>
        )}

        {/* Right: Company Registration */}
        <div className={`h-full ${isMobile ? "w-1/2" : "w-1/2"} flex-shrink-0`}>
          <CompanyRegistration navigateToLogin={handleNavigateToLogin} />
        </div>
      </div>
    </div>
  );
};

export default Search;
