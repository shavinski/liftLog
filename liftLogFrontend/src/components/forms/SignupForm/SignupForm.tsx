import { FC, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./FinalStep";

export interface FormValidation {
    firstName?: string;
    lastName?: string;
    heightFeet?: number | "";
    heightInches?: number | "";
    weight?: number;
    email?: string;
    password?: string;
}


const SignupForm: FC = () => {
    const navigate = useNavigate();
    const [currentStep, setcurrentStep] = useState<number>(0);

    const goToNextForm = () => {
        setcurrentStep((prevState) => prevState + 1);
    }

    const goToPreviousForm = () => {
        setcurrentStep((prevState) => prevState - 1);
    }

    const handleSubmit = () => {
        alert("Submitted")

        console.log("Sending data beep boop")
        console.log(sessionStorage)

        sessionStorage.clear();
        navigate("/");
    }

    const steps: ReactElement[] = [
        <Step1 goToNextForm={goToNextForm} />,
        <Step2 goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm} />,
        <Step3 goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm} />,
        <Step4 goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm} />,
        <Step5 goToPreviousForm={goToPreviousForm} handleSubmit={handleSubmit} />
    ];

    const calculateProgressBarWidth = () => {
        return ((currentStep + 1) / steps.length) * 100;
    };

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

            {/* Renders form based on current step */}
            {steps[currentStep]}

        </div >
    );
}


export default SignupForm;