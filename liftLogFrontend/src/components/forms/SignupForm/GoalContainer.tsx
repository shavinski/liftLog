import React, { FC, useState } from "react";

interface GoalContainerProps {
    goal: string;
}

const GoalContainer: FC<GoalContainerProps> = ({ goal }) => {
    const [activeGoal, setActiveGoal] = useState<string>("");

    const changeActiveGoal = (e: React.MouseEvent<HTMLLabelElement>) => {
        const target = e.target as HTMLButtonElement;
        const goalValue = target.value;

        setActiveGoal(goalValue);
    };

    return (
        <>
            {/* <button
                type="button"
                className={`mt-5 p-5 border-solid border-4 rounded-lg ${activeGoal === goal ? 'border-green-500' : 'border-light-grey-500'}`}
                onClick={changeActiveGoal}
                value={goal}>
                {goal}
            </button> */}

            <label onClick={changeActiveGoal} htmlFor={goal}>
                <div className={`mt-5 p-5 border-solid border-4 rounded-lg ${activeGoal === goal ? 'border-green-500' : 'border-light-grey-500'}`}>
                    <span className="text-lg">{goal}</span>
                    <input className="hidden" type="radio" id={goal} name="goal" value={goal} />
                </div>
            </label>
        </>
    )
}

export default GoalContainer;