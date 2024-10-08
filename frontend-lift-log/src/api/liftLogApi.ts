import axios from "axios";
import authEndpoints from "../constants/urls";

const BASE_URL = `http://localhost:3001`

export type signUpData = {
    firstName: string;
    lastName: string;
    heightFeet: number;
    heightInches: number;
    weight: number;
    bodyType: string;
    goal: string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
};
export type loginData = {
    username: string,
    password: string
}

export class LiftLogApi {

    static token = "";

    // Get user method for setting current user on webpage
    static async getSingleUserData(username: string) {
        try {
            const user = await axios.get(`${BASE_URL}/users/${username}`);
            return user.data;
        } catch (errors) {
            throw errors;
        }
    }

    // create a sign up method
    static async signup(formData: signUpData) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/${authEndpoints.signupPath}`, formData);
            return res.data.token;
        } catch (error) {
            // TODO: Make this into a helper function 
            const isAxiosError = axios.isAxiosError(error);
            const messages = isAxiosError ? error?.response?.data.messages : "An unexpected error occured";
            throw messages;
        }
    }

    // create a login method 
    static async login(formData: loginData) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/${authEndpoints.loginPath}`, formData);
            return res.data.token;
        } catch (error) {
            const isAxiosError = axios.isAxiosError(error);
            const messages = isAxiosError ? error?.response?.data.messages : "An unexpected error occured";
            throw messages;
        }
    }

    // Log out method
    static logout() {
        this.token = "";
    }

}