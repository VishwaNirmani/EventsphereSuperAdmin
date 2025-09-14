import axiosInstance from "../utils/RequestHelper";

export const createEvent = async (formData) => {
    try {

        const res = await axiosInstance.post("/api/events", formData);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                message: "Event created"
            }
        }

        return {
            success: false,
            message: "Event creation failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error creating event"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const updateEvent = async (formData) => {
    try {

        const res = await axiosInstance.post("/api/events/update-event", formData);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                message: "Event updated"
            }
        }

        return {
            success: false,
            message: "Event updating failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error updating event"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getOwnedEvents = async (dateStatus, title) => {
    try {

        const res = await axiosInstance.get("/api/events/owned-events?dateStatus="+dateStatus+"&title="+title);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Event getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting events"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const filterEvents = async (title, address, type, pageSize, page) => {
    try {

        const res = await axiosInstance.post("/api/events/filter", {
            title: title,
            address: address,
            type: type,
            pageSize: pageSize,
            page: page
        });
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Event getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting events"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const filterEventsByClub = async (clubId, pageSize, page) => {
    try {

        const res = await axiosInstance.get(`/api/events/filter-by-club?clubId=${clubId}&pageSize=${pageSize}&page=${page}`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Event getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting events"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getEventById = async (eventId) => {
    try {

        const res = await axiosInstance.get(`/api/events/get-event-details?id=${eventId}`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Event getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting events"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getEventsStat = async () => {
    try {

        const res = await axiosInstance.get("/api/events/event-stat");
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Event Stat getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting events stat"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const markAttendance = async (eventId, userId, ticketId, seats) => {
    try {

        const res = await axiosInstance.get(`/api/events/mark-attendance?eventId=${eventId}&userId=${userId}&seats=${seats}&ticketId=${ticketId}`);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Error getting data"
        }
    } catch (err) {

        if (err.response) {
            return {
                success: false,
                message: err.response || "Error getting events stat"
            };
        }

        return {
            success: false,
            message: "Already marked attendance"
        };
    }
}

export const getEventsPurchaseStat = async (eventId) => {
    try {

        const res = await axiosInstance.get("/api/events/event-purchase-stat?eventId="+eventId);
        if (res.status == 200 || res.status == 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Event Stat getting failed"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Error getting events stat"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const deleteEvent = async (eventId) => {
    try {

        const res = await axiosInstance.get("/api/events/delete-event?eventId="+eventId);
        if (res.status === 200 || res.status === 201) {
            return {
                success: true,
                message: "Event deleted"
            }
        }

        return {
            success: false,
            message: "Failed to delete event"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Failed to delete event"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}

export const getAllEventStat = async () => {
    try {

        const res = await axiosInstance.get("/api/events/all-event-stat");
        if (res.status === 200 || res.status === 201) {
            return {
                success: true,
                data: res.data
            }
        }

        return {
            success: false,
            message: "Failed to fetch data"
        }
    } catch (err) {

        if (err.response && err.response.data) {
            return {
                success: false,
                message: err.response.data.message || "Failed to fetch data"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}