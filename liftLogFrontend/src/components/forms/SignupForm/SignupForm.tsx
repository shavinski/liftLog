import React, { useState } from "react";
import useMultistepForm from "../../../hooks/useMultistepForm";
import FirsLastNameForm from "./FirsLastNameForm";
import HeightWeightForm from "./HeightWeightForm";

interface SingupFormData {
    firstName: string;
    lastName: string;
    height: number | "";
    weight: number | "",
}

function SignupForm() {

    const [formData, setFormData] = useState<SingupFormData>({
        firstName: "",
        lastName: "",
        height: "",
        weight: "",
    });

    const calculateProgressBarWidth = () => {
        console.log(((currentStep + 1) / steps.length) * 100);
        console.log(currentStep)

        return `${((currentStep + 1) / steps.length) * 100}%`;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        next();
        console.log("Sending to server...");
        console.log(formData);
        // TODO: SEND FORM INFO TO BACKEND LATER ON
    }

    const { steps, currentStep, step, next, back } = useMultistepForm(
        [
            <FirsLastNameForm {...formData} handleChange={handleChange} />,
            <HeightWeightForm {...formData} />
        ]
    );

    return (
        <div className="flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">
            {/* MOBILE PROGRESS BAR */}
            <div className="w-full bg-gray-300 rounded-t-lg h-2.5 hidden sm:block">
                <div className="bg-[#00df9a] h-2.5 rounded-t-lg hidden sm:block" style={{ width: calculateProgressBarWidth() }}></div>
            </div>

            <div className="flex flex-col justify-center items-center" >
                <p className="text-4x1 font-bold pt-4">Welcome to</p>
                <p className="text-3xl font-bold text-[#00df9a] pb-2">Lift Log</p>
            </div>

            {/* NON MOBILE PROGRESS BAR */}
            <div className="sm:invisible absolute top-24 w-full bg-gray-300 h-2.5">
                <div className="sm:invisible absolute top-12 bg-[#00df9a] h-2.5 -mt-12" style={{ width: calculateProgressBarWidth() }}></div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full p-12 md:shadow-custom">

                {step}

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

        </div>
    );
}

export default SignupForm;