import React, { useEffect, useState } from 'react'
import { Upload, Eye, EyeOff, Plus, Trash2, FileText, Briefcase, Award, Layers, Zap, ArrowRight, ArrowLeft, LogIn, Mail, User, Phone, MapPin } from 'lucide-react';


const PersonalDetails = ({ formData, setFormData, handleChange, togglePasswordVisibility, passwordVisible }) => {

    const [locations, setLocations] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Function to perform location search using API
    const searchLocation = async (searchQuery) => {
        if (searchQuery.length <= 2) {
            setLocations([]);
            return;
        }

        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1`;
            const response = await fetch(url);
            const data = await response.json();

            setLocations(data);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching location data:', error);
            setLocations([]);
        }
    };

    // Debounce search to reduce API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (formData.location.length > 2) {
                searchLocation(formData.location);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [formData.location])

    // Function to handle location selection
    const handleLocationSelect = (location) => {

        setShowResults(false);

        setFormData(prev => ({
            ...prev,
            location: location.display_name
        }));
    };

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const autocompleteElement = document.getElementById('location-autocomplete');
            if (autocompleteElement && !autocompleteElement.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (

        <div className="bg-white rounded-xl p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="flex items-center font-sans text-sm font-medium text-gray-700 mb-2">
                        <User className="mr-2 text-blue-500" size={18} />
                        Full Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 hover:border-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Mail className="mr-2 text-blue-500" size={18} />
                        Email <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 hover:border-blue-400"
                        required
                    />
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={passwordVisible.password ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                            className="w-full px-3 py-2.5 pr-10 border-2 border-gray-300 rounded-lg text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('password')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                  text-gray-500 hover:text-blue-500 transition-colors"
                        >
                            {passwordVisible.password ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={passwordVisible.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full px-3 py-2.5 pr-10 border-2 border-gray-300 rounded-lg text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                  text-gray-500 hover:text-blue-500 transition-colors"
                        >
                            {passwordVisible.confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Phone className="mr-2 text-blue-500" size={18} />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 hover:border-blue-400"
                    />
                </div>
                <div className="relative">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="mr-2 text-blue-500" size={18} />
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                        className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-300 hover:border-blue-400"
                    />
                    {showResults && locations.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                            {locations.map((location, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleLocationSelect(location)}
                                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                                >
                                    {location.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>

    )
}

export default PersonalDetails;
