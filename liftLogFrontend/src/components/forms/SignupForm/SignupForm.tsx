import React, { FC, useState } from "react";

import useMultistepForm from "../../../hooks/useMultistepForm";

import FirsLastNameForm from "./FirsLastNameForm";
import HeightWeightForm from "./HeightWeightForm";
import BodyTypeForm from "./BodyTypeForm";
import GoalsForm from "./GoalForm";
import EmailPasswordForm from "./EmailPasswordForm";

interface SingupFormData {
    firstName: string;
    lastName: string;
    heightFeet: number | "";
    heightInches: number | "";
    weight: number | "";
    bodyType: string;
    goal: string;
    email: string;
    password: string;
}

const SignupForm: FC = () => {
    const [formData, setFormData] = useState<SingupFormData>({
        firstName: "",
        lastName: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        bodyType: "",
        goal: "",
        email: "",
        password: ""
    });

    const calculateProgressBarWidth = () => {
        return ((currentStep + 1) / steps.length) * 100;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentStep !== steps.length - 1) return next();

        console.log("Sending to server...");
        alert("Account Created")
        console.log(formData);
        // TODO: SEND FORM INFO TO BACKEND LATER ON
    }

    const { steps, currentStep, form, next, back } = useMultistepForm(
        [
            <FirsLastNameForm {...formData} handleChange={handleChange} />,
            <HeightWeightForm {...formData} handleChange={handleChange} />,
            <BodyTypeForm {...formData} handleChange={handleChange} />,
            <GoalsForm {...formData} handleChange={handleChange} />,
            <EmailPasswordForm {...formData} handleChange={handleChange} />
        ]
    );

    return (
        <div className="relative flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">

            {/* MOBILE PROGRESS BAR */}
            <div className="sm:invisible absolute -top-12 w-full bg-gray-300 h-2.5">
                <div
                    className="sm:invisible bg-gradient-to-r from-[#00df9a] to-green-500 h-2.5"
                    style={{ transition: "width 1s", width: `${calculateProgressBarWidth()}%` }}></div>
            </div>

            {/* SIGN UP WELCOME */}
            <div className="flex flex-col justify-center items-center sm:m-10" >
                <p className="text-4x1 font-bold">Welcome to</p>
                <p className="text-3xl font-bold text-[#00df9a]">Lift Log</p>
            </div>

            {/* NON MOBILE PROGRESS BAR */}
            <div className="w-full bg-gray-300 rounded-t-lg h-2.5 hidden sm:block">
                <div
                    className="sm:block bg-gradient-to-r from-[#00df9a] to-green-500 h-2.5 rounded-t-lg hidden"
                    style={{ transition: "width 1s", width: `${calculateProgressBarWidth()}%` }}></div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full p-4 md:shadow-custom">

                {form}

                <div className="flex w-full mt-8">
                    {/* BACK BUTTONS */}
                    {currentStep !== 0 ? (
                        <button onClick={back} type="button" className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]">Back</button>
                    ) : (
                        <a href="/account/login" className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]">Back</a>
                    )}

                    <div className="bg-white w-4"></div>

                    {/* NEXT/SUBMIT BUTTONS */}
                    {currentStep !== steps.length - 1 ? (
                        <button type="submit" className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl">Next</button>
                    ) : (
                        <button type="submit" className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl">Submit</button>
                    )}
                </div>
            </form>

        </div >
    );
}

export default SignupForm;