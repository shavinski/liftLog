import React, { FC } from "react";

import ectomorphBody from "/images/bodyForm/ectomorphBody.jpg"
import mesomorphBody from "/images/bodyForm/mesomorphBody.jpg"
import endomorphBody from "/images/bodyForm/endomorphBody.jpg"

import BodyTypeContainer from "./BodyTypeContainer";

interface UserData {
    body: string,
}

interface BodyTypeProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const BODY_TYPE_DETAILS: string[][] = [
    ["Ectomorph", ectomorphBody, "Typically a person with a slimmer and leaner body. Naturally less body fat and muscle overall."],
    ["Mesomorph", mesomorphBody, "Typically a person with a naturally more athletic and strong body."],
    ["Endomorph", endomorphBody, "Typically a person that contains more stored fat, more muscle, and gains weight easily."]
]

const BodyTypeForm: FC<BodyTypeProps> = ({ handleChange }) => {

    return (
        <>
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">What type of body type do you have?</h1>

            {BODY_TYPE_DETAILS.map((type, i) => {
                return <BodyTypeContainer body={type[0]} imagePath={type[1]} info={type[2]} handleChange={handleChange} key={i} />;
            })}
        </>
    )
}

export default BodyTypeForm;