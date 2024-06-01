import React, { FC, ReactElement, useEffect, useState } from "react";


import FirstLastNameForm from "./FirstLastNameForm";
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
    body: string;
    goal: string;
    username: string;
    email: string;
    password: string;
}

export interface FormValidation {
    firstName?: string;
    lastName?: string;
    heightFeet?: number | "";
    heightInches?: number | "";
    weight?: number;
    email?: string;
    password?: string;
}

const NewSignupForm: FC = () => {
    const [formData, setFormData] = useState<SingupFormData>({
        firstName: "",
        lastName: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        body: "",
        goal: "",
        username: "",
        email: "",
        password: ""
    });
    const [currentStep, setcurrentStep] = useState<number>(0);
    const steps: ReactElement[] = [FirstLastNameForm, HeightWeightForm, BodyTypeForm, GoalsForm, EmailPasswordForm]

    const goToNextForm = () => {
        setcurrentStep((prevState) => prevState + 1);
    }

    const goToPreviousForm = () => {
        setcurrentStep((prevState) => prevState - 1);
    }

    const calculateProgressBarWidth = () => {
        return ((currentStep + 1) / steps.length) * 100;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

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

            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full p-4 md:shadow-custom"
                data-testid="signup-form">

                {currentStep == 0 && <FirstLastNameForm goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm} />}
                {currentStep == 1 && <HeightWeightForm goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm}/>}
                {currentStep == 2 && <BodyTypeForm goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm}/>}
                {currentStep == 3 && <GoalsForm goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm}/>}
                {currentStep == 3 && <EmailPasswordForm goToNextForm={goToNextForm} goToPreviousForm={goToPreviousForm}/>}



            </form>

        </div >
    );
}

export default NewSignupForm;