import React, { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormData {
    username: string;
    password: string;
}

interface ErrorData {
    username?: string,
    password?: string,
    invalid?: string,
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

    const [errors, setErrors] = useState<any>({
        username: "",
        email: "",
        password: ""
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate("/");
        } catch (errors) {
            const newErrors: ErrorData = {};
            const formErrors = errors;
            for (const error of formErrors) {
                if (error.message.includes("Please enter a username")) newErrors.username = error.message;
                if (error.message.includes("Please enter a password")) newErrors.password = error.message;
                if (error.message.includes("Invalid username or password")) newErrors.invalid = error.message;
            }
            console.log("error here in login:", errors)
            setErrors(newErrors)
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
                    {errors.username && <span className="text-red-500 ml-2 text-sm">{errors.username}</span>}

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
                    {errors.password && <span className="text-red-500 ml-2 text-sm">{errors.password}</span>}

                </div>

                {errors.invalid && <span className="text-red-500 ml-2 text-sm">{errors.invalid}</span>}

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="mt-8 p-3 rounded-md bg-[#00df9a] hover:bg-[#10B981] text-white font-bold text-xl">
                    Log In
                </button>
            </form>

            <small className="text-center m-5">
                Not a member? <Link to="/users/create/account" className="text-blue-700"> Sign up here!</Link>
            </small>
        </div>
    );
}

export default LoginForm;