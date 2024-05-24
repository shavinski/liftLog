import React, { FC } from "react";

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
                className="cursor-pointer has-[:checked]:animate-pulse has-[:checked]:ring-green-200 has-[:checked]:text-green-900 has-[:checked]:bg-green-50 flex justify-between items-center gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-green-100 border-2 mt-1 "
                htmlFor={goal}>
                <span className="text-lg">{goal}</span>
                <input
                    onChange={handleChange}
                    className="cursor-pointer box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-[#00df9a] checked:ring-[#00df9a]"
                    type="radio"
                    value={goal}
                    id={goal}
                    name="goal"
                    required />
            </label>

        </>
    )
}

export default GoalContainer;