import axiosInstance from "../utils/RequestHelper";

const getUserInfo = async () => {
    try {

        const response = await axiosInstance.get("/api/user");

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            message: "failed to load data"
        };
    }

}

export const updateUserDetails = async (data) => {

    try {

        console.log("data", data);
        const response = await axiosInstance.post("/api/user/update-user", data);

        if (!response) {
            return {
                success: false,
                message: "Failed to send data"
            };
        }

        return {
            success: true,
            message: "Successfully updated user details!"
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to send data"
        };
    }

}

export default getUserInfo;