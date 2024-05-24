import React, { FC } from "react";
import { FormValidation } from "./SignupForm";

interface UserData {
    email: string,
    password: string,
    errors: FormValidation,
}

interface EmailPasswordProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const EmailPasswordForm: FC<EmailPasswordProps> = ({ email, password, handleChange, errors }) => {
    return (
        <>
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">User Login Information</h1>

            {/* EMAIL INPUT */}
            <div className="relative">
                <label
                    className="absolute bg-white text-md p-1 left-3"
                    htmlFor="email">
                    Email
                </label>
                <input
                    value={email}
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
                    value={password}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                    type="password"
                    name="password"
                    id="password"
                    required />
            </div>

            {errors.password && <span>{errors.password}</span>}
        </>
    )
}

export default EmailPasswordForm;