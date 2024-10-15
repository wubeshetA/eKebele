import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

export function userLogged() {
    const accessItem = localStorage.getItem(ACCESS_TOKEN);
    return accessItem !== null && accessItem !== '';
    console.log("User is logged in");
}


// function to logout user
export function logoutUser() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    console.log("User logged out successfully");
}

