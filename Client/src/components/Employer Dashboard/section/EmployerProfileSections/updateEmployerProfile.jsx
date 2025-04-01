import axios from "axios";
import { BASEURL } from "../../../../utility/config";

// In ./EmployerProfileSections/updateEmployerProfile.js
export const updateEmployerAPI = async (employerId, data) => {
    try {
        const response = await axios.post(`${BASEURL}/employers/Employer_Update_Profile/${employerId}`,data ,{
            withCredentials:true,
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        
        return await response.data;
    } catch (error) {
        console.error('API error:', error);
        return { success: false, error: error.message };
    }
};