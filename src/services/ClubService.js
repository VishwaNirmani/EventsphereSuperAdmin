import axiosInstance from "../utils/RequestHelper";

export const getActiveClubs = async (page) => {
    try{

        const res = await axiosInstance.get(`/api/club/active-clubs?size=5&page=${page}`);
        
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

export const getPendingApprovalClubs = async (page) => {
    try{

        const res = await axiosInstance.get(`/api/club/pending-request?size=5&page=${page}`);
        
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

export const getBlockedClubs = async (page) => {
    try{

        const res = await axiosInstance.get(`/api/club/blocked?size=5&page=${page}`);
        
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

export const filterClubs = async (status, name, page) => {
    try{

        const res = await axiosInstance.get(`/api/club/filter-clubs?size=5&page=${page}&name=${name}&status=${status}`);
        
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

export const changeStatus = async (clubId, status) => {
    try{

        const res = await axiosInstance.get(`/api/club/change-status?clubId=${clubId}&status=${status}`);
        
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

export const getClubStat = async (clubId) => {
    try{

        const res = await axiosInstance.get(`/api/club/club-statistics?clubId=${clubId}`);
        
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

export const rejectMember = async (userId) => {

    try{
        const res = await axiosInstance.post("api/club/reject-member?userId="+userId);
        if(res.status == 200){
            return {
                success: true,
                data: res.data
            }
        }
        
        return {
            success: false,
            message: "Failed to get members"
        }
    }catch(err){
        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error fetching members"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }

}

export const addMemberViaEmail = async (email, role) => {

    try{
        const res = await axiosInstance.post("api/club/add-member-via-email?email="+email+"&role="+role);
        if(res.status == 200){
            return {
                success: true,
                data: res.data
            }
        }
        
        return {
            success: false,
            message: "Failed to add member"
        }
    }catch(err){
        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error adding members"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }

}

export const updateMemberRole = async (memberId, role) => {

    try{
        const res = await axiosInstance.get("api/club/change-member-role?memberId="+memberId+"&role="+role);
        if(res.status == 200){
            return {
                success: true,
                data: res.data
            }
        }
        
        return {
            success: false,
            message: "Failed to add member"
        }
    }catch(err){
        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error adding members"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }

}

export const getClubMembers = async (status) => {

    try{

        const res = await axiosInstance.get("api/club/club-members?status="+status);
        if(res.status == 200){
            return {
                success: true,
                data: res.data
            }
        }
        
        return {
            success: false,
            message: "Failed to get members"
        }
    }catch(err){
        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error fetching members"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }

}