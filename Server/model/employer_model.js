import supabase from "../config/supabase_config.js";
//find a employer by employeremail
export const findByEmployerEmail = async(company_email) => {
    try {
        const { data, error } = await supabase
            .from("employers")
            .select("*")
            .eq("employer_email", company_email, )
            .maybeSingle(); // Ensures only one row is returned

        if (error) throw error;

        console.log("jai mata di ", data); // This will now execute
        return data;
    } catch (error) {
        console.error("Error fetching employer:", error.message);
        return null; // Return null in case of error
    }
};

// create a  new employer
export const createEmployer = async(
    company_name,
    company_email,
    company_registered_name,
    cin,
    company_website,
    company_logo,
    company_size,
    industry,
    headquarters,
    description,
    company_linkedin,
    company_twitter,
    company_facebook,
    company_phone_number,
    company_password,
) => {
    try {
        const { data, error } = await supabase
            .from("employers")
            .insert([{
                employer_email: company_email,
                employer_password_hash: company_password, // Hashed password
                company_display_name: company_name,
                company_registered_name,
                cin,
                company_website,
                company_logo,
                company_size,
                industry,
                headquarters,
                description,
                company_linkedin,
                company_twitter,
                company_facebook,
                company_phone_number,
                status: "active",
            }])
            .select()
            .single(); // Ensure single row is returned

        if (error) throw error;


        console.log("employer created successfully:", data);
        return data; // Return inserted candidate data
    } catch (error) {
        console.error("Error inserting employer:", error.message);
        return null; // Return null in case of error
    }
};
export const employerDetails = async(employer_id) => {
    try {
        const [{ data: employerData, error: employerError }, { data: subscriptionData, error: subscriptionError }] =
        await Promise.all([
            supabase.from("employers").select("*").eq("employer_id", employer_id).single(),
            supabase.from("subscriptions").select("*").eq("employer_id", employer_id)
        ]);

        if (employerError) {
            console.error("Supabase Error (Employer):", employerError.message);
            return null;
        }

        return {
            ...employerData,
            subscriptions: subscriptionData || []
        };
    } catch (error) {
        console.error("Error fetching employer details:", error.message);
        return null;
    }
};