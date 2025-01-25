import React, { useState, useEffect } from "react";
import loginImage from "../assets/Login.png";
import registerImage from "../assets/Signup2.png";

const MiddleComponent = ({ currentView }) => {
  const [currentImage, setCurrentImage] = useState(loginImage); // Current image being displayed
  const [isAnimating, setIsAnimating] = useState(false); // Controls animation state

  useEffect(() => {
    // Trigger animation and swap the image
    setIsAnimating(true); // Start the exit animation for the current image

    const animationTimeout = setTimeout(() => {
      // After animation duration, update the image and reset animation
      setCurrentImage(currentView === "login" ? loginImage : registerImage);
      setIsAnimating(false); // Allow the new image to slide in
    }, 300); // Reduced duration to 300ms

    return () => clearTimeout(animationTimeout);
  }, [currentView]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
      <img
        src={currentImage}
        alt={currentView === "login" ? "Candidate Login" : "Candidate Registration"}
        className={`absolute max-w-full h-auto transition-transform duration-300 ease-in-out transform ${
          isAnimating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      />
    </div>
  );
};

export default MiddleComponent;