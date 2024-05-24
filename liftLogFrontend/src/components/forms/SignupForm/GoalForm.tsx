import React, { FC } from "react";
import GoalContainer from "./GoalContainer";

interface UserData {
    goal: string;
}

interface GoalFormProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const GOAL_OPTIONS = [
    "Lose weight",
    "Maintain current weight",
    "Gain weight",
    "Gain muscle",
    "Become more active"
]

const GoalForm: FC<GoalFormProps> = ({ handleChange }) => {
    return (
        <>
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">Personal Goals</h1>

            {GOAL_OPTIONS.map((goal, i) => {
                return <GoalContainer goal={goal} handleChange={handleChange} key={i} />;
            })}
        </>
    )
}

export default GoalForm;