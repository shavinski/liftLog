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
            <label htmlFor={goal}>
                <div className="mt-5 p-5 border-solid border-4 rounded-lg">
                    <span className="text-lg">{goal}</span>
                    <input
                        onChange={handleChange}
                        className="hidden"
                        type="radio" id={goal}
                        name="goal"
                        value={goal} />
                </div>
            </label>
        </>
    )
}

export default GoalContainer;