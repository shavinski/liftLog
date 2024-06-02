import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GoalContainer from "./Step4Container";

interface FormData {
    goal: string,
}
interface ErrorData {
    goal?: string,
}

const GOAL_OPTIONS = [
    "Lose weight",
    "Maintain current weight",
    "Gain weight",
    "Gain muscle",
    "Become more active"
];

const Step4: FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        goal: sessionStorage.getItem('goal') ?? "",
    })

    const [errors, setErrors] = useState<ErrorData>({
        goal: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const validateForm = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: ErrorData = {}
        if (!formData.goal) newErrors.goal = "❌ Please choose one goal"

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        sessionStorage.setItem("goal", formData.goal);

        console.log(sessionStorage.getItem('goal'))

        navigate("/account/create/account-information");
        // goToNextForm();
    }

    return (
        <div className="relative flex flex-col justify-center items-center md:max-w-lg md:mx-auto md:mt-12">

            <form
                onSubmit={validateForm}
                className="flex flex-col w-full p-4 md:shadow-custom"
                data-testid="goal-form">

                <h1 className="font-bold text-left mt-3 mb-3 text-lg">Personal Goals</h1>
                <small className="mb-1">Please select one.</small>

                {GOAL_OPTIONS.map((goal, i) => {
                    return <GoalContainer currentValue={formData.goal} goal={goal} handleChange={handleChange} key={i} />;
                })}

                {errors.goal && <span>{errors.goal}</span>}

                <div className="flex gap-5 mt-8">
                    <Link
                        to="/account/create/body-type"
                        className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]"
                    >Back</Link>

                    <button
                        type="submit"
                        className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl"
                    >Next</button>

                </div>
            </form>
        </div>
    )
}

export default Step4;