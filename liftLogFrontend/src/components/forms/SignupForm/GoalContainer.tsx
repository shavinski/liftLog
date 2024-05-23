import React, { FC, useState } from "react";

interface UserData {
    goal: string;
}

interface GoalContainerProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const GoalContainer: FC<GoalContainerProps> = ({ goal, handleChange }) => {

    return (
        <>
            <label
                className="mt-5 p-5 border-solid border-light-grey-500 border-4 rounded-lg has-[:checked]:bg-green-500 has-[:checked]:border-green-800"
                htmlFor="userGoal">
                {/* <div> */}
                <span className="text-lg">{goal}</span>
                <input
                    onChange={handleChange}
                    className=""
                    type="radio"
                    value={goal}
                    id={goal}
                    name="userGoal"
                    required />
                {/* </div> */}
            </label>
        </>
    )
}

export default GoalContainer;