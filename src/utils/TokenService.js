import { jwtDecode } from "jwt-decode";

export const getStoredToken = () => {
    var accessToken = localStorage.getItem("accessToken");
    var refreshToken = localStorage.getItem("refreshToken");

    if(!accessToken || !refreshToken){
        return null;
    }

    return {
        accessToken,
        refreshToken
    }
}

export const storeToken = (accessToken, refreshToken) => {

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const decodedValues = () => {
    
    if(!getStoredToken()){
        return null;
    }
    
    const decodedValues = jwtDecode(getStoredToken().accessToken);
    return {
        email: decodedValues.email,
        id: decodedValues.id,
        profilePic: decodedValues.profilePic,
        firstName: decodedValues.firstName,
        lastName: decodedValues.lastName
    }
}

export const decodedClubToken = () => {

    const clubToken = localStorage.getItem("clubToken");
    if(!clubToken){
        return null;
    }

    const decodedValues = jwtDecode(clubToken);
    return{
        email: decodedValues.email,
        id: decodedValues.id,
        firstName: decodedValues.firstName,
        lastName: decodedValues.lastName,
        role: decodedValues.role,
        logo: decodedValues.logo,
        clubName: decodedValues.clubName,
        clubHeading: decodedValues.clubHeading,
        owner: decodedValues.owner,
        clubId: decodedValues.clubId
    }
}

export const storeClubToken = (token) => {
    if(localStorage.getItem("clubToken") !== null){
        localStorage.removeItem("clubToken");
    }
    localStorage.setItem("clubToken", token);
}