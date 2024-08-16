import axios from "axios";

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

export class LiftLogApi {

    static token = "";

    // Get user method for setting current user on webpage
    static async getSingleUserData(username: string) {
        const user = await axios.get(`/users/${username}`);
        return user.data;
    }

    // create a sign up method
    static async signup(formData:signUpData) {
        console.log(formData)
        try {
            const res = await axios.post(`${BASE_URL}/users/create/signup`, formData);
            return res.data.token;
        } catch (error) {
            console.log(error);
        }
    }

    // create a login method 

}