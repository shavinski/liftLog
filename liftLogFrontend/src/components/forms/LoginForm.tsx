import React, { useState } from "react";

interface LoginFormData {
    email: string;
    password: string;
}

function LoginForm() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sending to server...");
        console.log(formData);
        // TODO: SEND FORM INFO TO BACKEND LATER ON
    }

    return (
        <div className="flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">
            <p className="text-lg font-bold p-5">Account Login</p>

            <form className="flex flex-col w-full p-12 md:shadow-custom" onSubmit={handleSubmit}>

                {/* EMAIL INPUT */}
                <div>
                    <label
                        className="absolute bg-white ml-4 text-md p-1"
                        htmlFor="email">
                        Email Address
                    </label>
                    <input
                        value={formData.email} onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="email"
                        name="email"
                        id="email" />
                </div>

                {/* PASSWORD INPUT */}
                <div className="mt-6">
                    <label
                        className="absolute bg-white ml-4 p-1 text-md"
                        htmlFor="password">
                        Password
                    </label>
                    <input
                        value={formData.password} onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="password"
                        name="password"
                        id="password" />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="mt-8 p-3 rounded-md bg-[#00df9a] hover:bg-[#10B981] text-white font-bold text-xl">
                    Log In
                </button>
            </form>

            <small className="text-center m-5">Not a member? <a className="text-blue-700" href="/account/create">Sign up here!</a></small>
        </div>
    );
}

export default LoginForm;