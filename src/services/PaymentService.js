import axiosInstance from "../utils/RequestHelper";

export const getConnectedAccounts = async () => {
    try {

        const res = await axiosInstance.get(`/api/stripe/get-account-details`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Account getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting accounts"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getConnectionUrl = async () => {
    try {

        const res = await axiosInstance.get(`/api/stripe/get-connect-url`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Account getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting accounts"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getCheckoutSession = async (eventId, qty) => {
    try {

        const res = await axiosInstance.get(`/api/stripe/create-checkout-session?eventId=${eventId}&qty=${qty}`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Account getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting accounts"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getQrLink = async (sessionId) => {
    try {

        const res = await axiosInstance.get(`api/stripe/check-payment?sessionId=${sessionId}`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Error"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getPurchasedEvents = async () => {
    try {

        const res = await axiosInstance.get(`api/stripe/purchased-events`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Error"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getTicketIndo = async (ticketId) => {
    try {

        const res = await axiosInstance.get(`api/stripe/ticket-info?ticketId=${ticketId}`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Error"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}