import axiosInstance from "../utils/RequestHelper";

export const getClubs = async (isOwnclubs) => {
    try{

        const res = await axiosInstance.get( isOwnclubs ? "/api/club/owned-clubs" : "/api/club/enrolled-clubs");
        
        return {
            success: true,
            data: res.data
        };
    }catch(err){
        return {
            success: false,
            message: "Failed to retrieve data"
        }
    }
}

export const createClub = async (formData) => {
    try{
        
        const res = await axiosInstance.post("/api/club", formData);
        if(res.status == 200){
            return {
                success: true,
                message: "Club created"
            }
        }

        return {
            success: false,
            message: "Club creation failed"
        }
    }catch(err){

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error creating club"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}