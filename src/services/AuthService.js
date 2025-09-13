import axiosInstance from "../utils/RequestHelper"
import { storeClubToken, storeToken } from "../utils/TokenService";

export const login = async (username, password) => {

    try {
        const response = await axiosInstance.post("/api/auth/login-super-admin", {
            email: username,
            password: password
        });

        if (response.status === 200 && response.data.accessToken && response.data.refreshToken) {
            storeToken(response.data.accessToken, response.data.refreshToken);
            return {
                success: true,
                message: "Successfully logged in"
            };
        }

        return {
            success: false,
            message: "Invalid response from server"
        };
    } catch (error) {

        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data.message || "Login failed"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const register = async (firstname,lastname,email,password, keycode) => {

    try {
        const response = await axiosInstance.post("/api/user/create-super-admin", {
            firstName:firstname,
            lastName:lastname,
            username:email,
            password: password,
            code: keycode        
        });

        if (response.status === 201) {
            return {
                success: true,
                message: ""
            }
        }

        return {
            success: false,
            message: "Invalid response from server"
        };
    } catch (error) {

        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data.message || "Registration failed"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const verifyUser = async (email, code) => {

    try{

        const response = await axiosInstance.post(`/api/user/verify-user?email=${email}&code=${code}`);
        if(response.status == 200){
            return {
                success: true,
                message: "User verified"
            }
        }


        return {
            success: false,
            message: "Invalid response from server"
        };
    }catch(error){
        
        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data.message || "Verification failed"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };

    }

}

export const resendCode = async (email) => {
    
    try{

        const response = await axiosInstance.get(`/api/user/resend-verification?email=${email}`);
        if(response.status == 200){
            return {
                success: true,
                message: "Verification code re-sent"
            }
        }


        return {
            success: false,
            message: "Invalid response from server"
        };
    }catch(error){
        
        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data.message || "Verification sending failed"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };

    }
}

export const getGoogleOAuthUrl = async () => {

    try{

        const response = await axiosInstance.get("api/auth/google-oauth-url");
        
        return {
            success: true,
            data: response.data
        };
    }catch(error){
        if (error.response && error.response.data) {
            return {
                success: false,
                data: error.response.data.message || "Verification sending failed"
            };
        }

        return {
            success: false,
            data: "An unexpected error occurred"
        };

    }
}

export const getClubToken = async (clubId) => {

    try {
        const response = await axiosInstance.get("/api/auth/authorize-club?clubId="+clubId);

        if (response.status === 200 && response.data) {
            storeClubToken(response.data);
            return {
                success: true,
                message: "Successfully authenticated"
            };
        }

        return {
            success: false,
            message: "Invalid response from server"
        };
    } catch (error) {

        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data.message || "Authentication failed"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}