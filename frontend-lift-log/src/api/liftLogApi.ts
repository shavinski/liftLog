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
        } catch (error: any) {
            console.debug("API Error:\n", error.response.data)
            throw error.response.data
        }
    }

    // create a login method 
    static async login(formData: loginData) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/${authEndpoints.loginPath}`, formData);
            return res.data.token;
        } catch (error: any) {
            let messages = []
            if (error.response) {
                messages = error.response.data.messages;
            } else {
                messages = ["Something went wrong, please try again later."]
            }

            console.warn("API Error:\n", error);
            throw Array.isArray(messages) ? messages : [messages];
        }
    }

    // Log out method
    static logout() {
        this.token = "";
    }

}