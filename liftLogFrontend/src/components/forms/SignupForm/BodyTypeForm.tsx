import React, { FC } from "react";

interface UserData {
    bodyType: string,
}

interface BodyTypeProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const BodyTypeForm: FC<BodyTypeProps> = ({ bodyType, handleChange }) => {
    return (
        <>
            <h1>Test</h1>
        </>
    )
}

export default BodyTypeForm;