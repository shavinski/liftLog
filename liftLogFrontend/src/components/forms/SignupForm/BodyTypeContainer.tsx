import React, { FC } from "react";

interface UserData {
    currentValue: string,
    body: string;
    imagePath: string;
    info: string;
}

interface BodyTypeContainerProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const BodyTypeContainer: FC<BodyTypeContainerProps> = ({ currentValue, body, imagePath, info, handleChange }) => {
    // const checked = body === sessionStorage.getItem("body");

    return (
        <>
            <label
                className="cursor-pointer has-[:checked]:animate-pulse has-[:checked]:ring-green-200 has-[:checked]:text-green-900 has-[:checked]:bg-green-50 flex justify-between items-center rounded-lg p-1 gap-3 ring-1 ring-transparent hover:bg-green-100 border-2 mt-1 "
                htmlFor={body}>
                <img src={imagePath} loading="lazy" className="w-28" />
                <span className="text-lg w-40 sm:w-80">{info}</span>
                <input
                    onChange={handleChange}
                    className="cursor-pointer box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] border-white bg-white bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-[#00df9a] checked:ring-[#00df9a]"
                    type="radio"
                    value={body}
                    id={body}
                    name="body"
                    checked={body === currentValue}
                    data-testid={body}
                    required />
            </label>
        </>
    )
}

export default BodyTypeContainer;