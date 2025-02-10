import React, { useState } from 'react';
import { X } from 'lucide-react';

const ExtraCurricularForm = ({ extraCurricular:initailData, onEdit }) => {
    const [activities, setActivities] = useState(initailData || []);
    const [newActivity, setNewActivity] = useState('');

    const addActivity = () => {
        if (newActivity.trim()) {
            setActivities([...activities, newActivity.trim()]);
            setNewActivity('');
        }
    };

    const removeActivity = (index) => {
        setActivities(activities.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit('extraCurricular', activities);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="Add a new activity"
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="button"
                    onClick={addActivity}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {activities.map((activity, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>{activity}</span>
                        <button
                            type="button"
                            onClick={() => removeActivity(index)}
                            className="text-gray-500 hover:text-red-500"
                        >
                            <X size={14} />
                        </button>
                    </li>
                ))}
            </ul>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Save Changes
            </button>
        </form>
    );
};

export default ExtraCurricularForm;
