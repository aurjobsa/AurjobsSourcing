import React, { useState } from 'react';

const PersonalInfoForm = ({ personalInfo:userData, onEdit }) => {
    const [formData, setFormData] = useState(userData|| {
        name: '',
        email: '',
        mobile: '',
        location: ''
    });

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit('personalInfo', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your name"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Mobile</label>
                <input
                    type="text"
                    value={formData.mobile}
                    onChange={handleChange('mobile')}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your mobile number"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={handleChange('location')}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your location"
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Save Changes
            </button>
        </form>
    );
};

export default PersonalInfoForm;