import React, { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import authEndpoints from "../../constants/urls";
import axios from "axios";

interface LoginFormData {
    username: string;
    password: string;
}

interface ErrorState {
    usernameErr: string;
    passwordErr: string;
    authError: string;
    unexpected: string;
}

export interface LoginFormProps {
    login: (formData: LoginFormData) => Promise<void>;
}

const LoginForm: FC<LoginFormProps> = ({ login }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
    });


    const [errors, setErrors] = useState<ErrorState>({
        usernameErr: "",
        passwordErr: "",
        authError: "",
        unexpected: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;

                if (status === 400) {
                    // Handles Zod validation error, when inputs are blank
                    const zodValidationErrors = error.response.data.messages;
                    const usernameErr = zodValidationErrors.find((err: any) => err.message.includes("username"))?.message || "";
                    const passwordErr = zodValidationErrors.find((err: any) => err.message.includes("password"))?.message || "";
                    console.error("Validation Errors:", zodValidationErrors);

                    setErrors((prev) => ({
                        ...prev,
                        usernameErr,
                        passwordErr,
                        authError: "",
                        unexpected: ""
                    }))

                } else if (status === 401) {
                    // Handles our custom Authentication error on backend
                    const authError = error.response.data.errors[0].message;
                    console.error("Authentication Error:", authError);

                    setErrors((prev) => ({
                        ...prev,
                        usernameErr: "",
                        passwordErr: "",
                        authError,
                        unexpected: ""
                    }));
                } else {
                    // Other errors that I was not expecting which is an axios error
                    console.error("Unexpected Error:", error.response.data || "An error occurred.");
                    setErrors((prev) => ({
                        ...prev,
                        usernameErr: "",
                        passwordErr: "",
                        authError: "",
                        unexpected: "Something unexpected happened."
                    }));
                }
            } else {
                // Handles any unhandled non-axios errors
                console.error("Network Error or Unexpected Error:", error);
                setErrors((prev) => ({
                    ...prev,
                    usernameErr: "",
                    passwordErr: "",
                    authError: "",
                    unexpected: "Something unexpected happened."
                }));
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">
            <p className="text-lg font-bold p-5">Account Login</p>

            <form className="flex flex-col w-full p-4 md:shadow-custom" onSubmit={handleSubmit}>

                {/* USERNAME INPUT */}
                <div className="relative">
                    <label
                        className="absolute bg-white text-md left-3 p-1"
                        htmlFor="username">
                        Username
                    </label>
                    <input
                        value={formData.username} onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="username"
                        name="username"
                        id="username" />
                    {errors.usernameErr && <span className="text-red-500 ml-2 text-sm">{errors.usernameErr}</span>}

                </div>

                {/* PASSWORD INPUT */}
                <div className="relative mt-6">
                    <label
                        className="absolute bg-white text-md left-3 p-1"
                        htmlFor="password">
                        Password
                    </label>
                    <input
                        value={formData.password} onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="password"
                        name="password"
                        id="password" />
                    {errors.passwordErr && <span className="text-red-500 ml-2 text-sm">{errors.passwordErr}</span>}
                    {errors.authError && <span className="text-red-500 ml-2 text-sm">{errors.authError}</span>}
                    {errors.unexpected && <span className="text-red-500 ml-2 text-sm">{errors.unexpected}</span>}

                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="mt-8 p-3 rounded-md bg-[#00df9a] hover:bg-[#10B981] text-white font-bold text-xl">
                    Log In
                </button>
            </form>

            <small className="text-center m-5">
                Not a member? <Link to={`/auth/${authEndpoints.part1Path}`} className="text-blue-700"> Sign up here!</Link>
            </small>
        </div>
    );
}

export default LoginForm;