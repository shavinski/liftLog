import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { useFormProgessBar } from "./SignupForm";

interface FormData {
    username: string,
    email: string,
    password: string,
}

interface ErrorData {
    username?: string,
    email?: string,
    password?: string,
}

const FinalStep: FC = () => {
    const navigate = useNavigate();
    // const { prevStep } = useFormProgessBar();

    const [formData, setFormData] = useState<FormData>({
        username: sessionStorage.getItem('username') ?? "",
        email: sessionStorage.getItem('email') ?? "",
        password: sessionStorage.getItem('password') ?? "",
    });

    const [errors, setErrors] = useState<ErrorData>({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = () => {
        alert("Submitted")

        console.log("Sending data beep boop")

        const formData = {
            firstName: sessionStorage.getItem('firstName'),
            lastName: sessionStorage.getItem('lastName'),
            heightFeet: sessionStorage.getItem('heightFeet'),
            heightInches: sessionStorage.getItem('heightInches'),
            weight: sessionStorage.getItem('weight'),
            bodyType: sessionStorage.getItem('body'),
            goal: sessionStorage.getItem('goal'),
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('email'),
            password: sessionStorage.getItem('password'),
        };

        console.log(formData);

        axios.post('http://localhost:3000/create/account', formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.message);
            });


        navigate("/");
        sessionStorage.clear();
    }

    const handleBack = () => {
        // prevStep();
        navigate("/user/account/create/part-4-goal")
    }

    const validateForm = (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors: ErrorData = {}
        if (!formData.username) newErrors.username = "❌ Please input a username"
        if (!emailRegex.test(formData.email)) newErrors.email = "❌ Please input a valid email";
        if (!formData.password) newErrors.password = "❌ Please input a password"

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        sessionStorage.setItem("username", formData.username);
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("password", formData.password);

        console.log(sessionStorage.getItem('username'), sessionStorage.getItem('email'), sessionStorage.getItem('password'))

        handleSubmit();
    }

    return (

        <form
            onSubmit={validateForm}
            className="flex flex-col w-full p-4 md:shadow-custom"
            data-testid="first-last-name-form">
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">User Login Information</h1>

            {/* USERNAME INPUT */}
            <div className="relative">
                <label
                    className="absolute bg-white text-md p-1 left-3"
                    htmlFor="username">
                    Username
                </label>
                <input
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                    type="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    required />
            </div>
            {errors.username && <span>{errors.username}</span>}

            {/* EMAIL INPUT */}
            <div className="relative mt-6">
                <label
                    className="absolute bg-white text-md p-1 left-3"
                    htmlFor="email">
                    Email
                </label>
                <input
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required />
            </div>
            {errors.email && <span>{errors.email}</span>}

            {/* PASSWORD INPUT */}
            <div className="relative mt-6">
                <label
                    className="absolute bg-white p-1 text-md left-3"
                    htmlFor="password">
                    Password
                </label>
                <input
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required />
            </div>
            {errors.password && <span>{errors.password}</span>}
            <div className="flex gap-5 mt-8">
                <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]"
                >Back</button>

                <button
                    type="submit"
                    className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl"
                >Next</button>
            </div>
        </form>
    )
}

export default FinalStep;