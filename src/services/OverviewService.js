import axiosInstance from "../utils/RequestHelper";

export const getOverview = async () => {
    try {

        const res = await axiosInstance.get(`/api/overview`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Failed to fetch overview data"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting overview data"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getClubStat = async () => {
    try {

        const res = await axiosInstance.get(`/api/overview/club-stat`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Failed to fetch overview data"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting overview data"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}