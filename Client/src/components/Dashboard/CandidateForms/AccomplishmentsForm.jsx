import React, { useState } from 'react';
import { X } from 'lucide-react';

const AccomplishmentsForm = ({ accomplishments:initialData, onEdit }) => {
    const [accomplishments, setAccomplishments] = useState(initialData);
    const [newAccomplishment, setNewAccomplishment] = useState('');

    const addAccomplishment = () => {
        if (newAccomplishment.trim()) {
            setAccomplishments([...accomplishments, newAccomplishment.trim()]);
            setNewAccomplishment('');
        }
    };

    const removeAccomplishment = (index) => {
        setAccomplishments(accomplishments.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onEdit('accomplishments', accomplishments);
        }} className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newAccomplishment}
                    onChange={(e) => setNewAccomplishment(e.target.value)}
                    placeholder="Add a new accomplishment"
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="button"
                    onClick={addAccomplishment}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {accomplishments.map((accomplishment, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>{accomplishment}</span>
                        <button
                            type="button"
                            onClick={() => removeAccomplishment(index)}
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

export default AccomplishmentsForm;
