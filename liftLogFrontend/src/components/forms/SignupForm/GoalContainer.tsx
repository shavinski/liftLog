import React, { FC } from "react";

interface GoalContainerProps {
    goal: string;
}

const GoalContainer: FC<GoalContainerProps> = ({ goal }) => {
    return (
        <>
            <h1>{goal}</h1>
        </>
    )
}

export default GoalContainer;