import React, { FC, useState } from "react";

import ectomorphBody from "/images/bodyForm/ectomorphBody.jpg"
import mesomorphBody from "/images/bodyForm/mesomorphBody.jpg"
import endomorphBody from "/images/bodyForm/endomorphBody.jpg"

import BodyTypeContainer from "./BodyTypeContainer";

interface FormData {
    body: string,
}

interface ErrorData {
    body?: string
}
interface BodyTypeProps {
    goToNextForm: () => void,
    goToPreviousForm: () => void,
}

// DO NOT CHANGE, includes body type, img path, and description
const BODY_TYPE_DETAILS: string[][] = [
    ["Ectomorph", ectomorphBody, "Typically a person with a slimmer and leaner body. Naturally less body fat and muscle overall."],
    ["Mesomorph", mesomorphBody, "Typically a person with a naturally more athletic and strong body."],
    ["Endomorph", endomorphBody, "Typically a person that contains more stored fat, more muscle, and gains weight easily."]
]

const BodyTypeForm: FC<BodyTypeProps> = ({ goToNextForm, goToPreviousForm }) => {
    const [formData, setFormData] = useState<FormData>({
        body: sessionStorage.getItem('body') ?? "",
    });

    const [errors, setErrors] = useState<ErrorData>({
        body: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const validateForm = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData)

        const newErrors: ErrorData = {}
        if (!formData.body) newErrors.body = "❌ Please select one body type"

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        sessionStorage.setItem("body", formData.body);

        console.log(sessionStorage.getItem('body'));

        goToNextForm();
    }

    return (
        <>
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">What type of body type do you have?</h1>

            {BODY_TYPE_DETAILS.map((type, i) => {
                return <BodyTypeContainer body={type[0]} imagePath={type[1]} info={type[2]} handleChange={handleChange} key={i} />;
            })}

            {errors.body && <span>{errors.body}</span>}

            <div className="flex gap-5 mt-8">
                <button
                    onClick={goToPreviousForm}
                    type="button"
                    className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]"
                >Back</button>

                <button
                    onClick={validateForm}
                    type="button"
                    className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl"
                >Next</button>
            </div>
        </>
    )
}

export default BodyTypeForm;