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



export const updateEmployerDetails = async(employerId, employerData) => {
    try {
        const employer = employerData.employer || employerData;
        if (!employer) throw new Error("Employer data is missing.");

        const { subscriptions, ...employerCoreData } = employer;
        console.log("✅ Extracted Employer Data:", subscriptions);

        const istTimestamp = new Date().toISOString();

        // 🔄 Update employer core details
        const { data: updatedEmployer, error: employerError } = await supabase
            .from("employers")
            .upsert({
                ...employerCoreData,
                updated_at: istTimestamp,
            })
            .eq("employer_id", employerId)
            .select();

        if (employerError) throw employerError;

        console.log("✅ Employer updated successfully:", updatedEmployer);

        let updatedSubscriptions = [];

        if (subscriptions && Array.isArray(subscriptions)) {
            for (const subscription of subscriptions) {
                const subscriptionId = subscription.subscription_id || crypto.randomUUID();
                const { portal_name } = subscription;

                // 🔍 Check if the subscription exists based on subscription_id
                const { data: existingSubscription, error: checkError } = await supabase
                    .from("subscriptions")
                    .select("*")
                    .eq("subscription_id", subscriptionId)
                    .single();

                if (checkError && checkError.code !== "PGRST116") {
                    throw checkError;
                }

                if (existingSubscription) {
                    // Merge portal names without duplicates
                    const updatedPortalNames = [
                        ...new Set([
                            ...(existingSubscription.portal_name || []),
                            ...(portal_name || []),
                        ]),
                    ];

                    // 🔄 Update the subscription
                    const { data, error: subscriptionError } = await supabase
                        .from("subscriptions")
                        .update({
                            portal_name: updatedPortalNames,
                            plan_name: subscription.plan_name || existingSubscription.plan_name,
                            start_date: subscription.start_date || existingSubscription.start_date,
                            end_date: subscription.end_date || existingSubscription.end_date,
                            job_credits: subscription.job_credits || existingSubscription.job_credits,
                            updated_at: istTimestamp,
                        })
                        .eq("subscription_id", existingSubscription.subscription_id)
                        .select();

                    if (subscriptionError) throw subscriptionError;

                    updatedSubscriptions.push(data[0]);
                    console.log("✅ Subscription updated successfully:", data);
                } else {
                    // ➕ Insert a new subscription
                    const { data, error: subscriptionError } = await supabase
                        .from("subscriptions")
                        .insert({
                            employer_id: employerId,
                            subscription_id: subscriptionId,
                            portal_name: portal_name || ["default_portal"],
                            plan_name: subscription.plan_name || "Basic Plan",
                            start_date: subscription.start_date || new Date().toISOString(),
                            end_date: subscription.end_date ||
                                new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                            job_credits: subscription.job_credits || 0,
                            updated_at: istTimestamp,
                        })
                        .select();

                    if (subscriptionError) throw subscriptionError;

                    updatedSubscriptions.push(data[0]);
                    console.log("✅ Subscription inserted successfully:", data);
                }
            }
        }

        return {
            success: true,
            message: "Employer and related data updated successfully",
            employer: {
                ...updatedEmployer[0],
                subscriptions: updatedSubscriptions,
            },
        };
    } catch (error) {
        console.error("❌ Error updating employer data:", error);
        return { success: false, error: error.message || "Internal Server Error" };
    }
};