import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

import api from './api/api';
export function userLogged() {
    const accessItem = localStorage.getItem(ACCESS_TOKEN);
    return accessItem !== null && accessItem !== '';
}


export function logoutUser() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem('ekebele_user');

    console.log("User logged out successfully");
}

export async function getLoggedUser() {
    const userItem = localStorage.getItem('ekebele_user');
    if (userItem !== null) {
        return JSON.parse(userItem);
    } else {
        try {
            const user = await api.get('/auth/users/me/');
            console.log(user);
            localStorage.setItem('ekebele_user', JSON.stringify(user));
            return user;
        } catch (error) {
            console.error("Failed to fetch user data", error);
            throw error;
        }
    }
}




