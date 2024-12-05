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

    // Reusuable method so I will not need to write multiple try/catches with same logic throughout this class 
    static async request(endpoint: string, data = {}, method: string = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${LiftLogApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (error: any) {
            console.error("API Error:", error.response);

            // Will handle messages sent from backend
            // If there is no respone, then server is down and we will send a "Something wrong" message indicating server issue 
            let messages = [];
            if (error.response) {
                messages = error.response.data.messages;
            } else {
                messages = ["Something went wrong, please try again later."];
            }

            throw Array.isArray(messages) ? messages : [messages];
        }
    }


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
        const res = await this.request(`auth/${authEndpoints.signupPath}`, formData, "post");
        return res.token;
    }

    // create a login method
    static async login(formData: loginData) {
        const res = await this.request(`auth/${authEndpoints.loginPath}`, formData, "post")
        return res.token;
    }

    // Log out method
    static logout() {
        this.token = "";
    }

}