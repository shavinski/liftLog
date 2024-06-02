import React, { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom";


interface FormData {
    heightFeet: string,
    heightInches: string,
    weight: string,
}

interface ErrorData {
    heightFeet?: string,
    heightInches?: string,
    weight?: string,
}

const Step2: FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        heightFeet: sessionStorage.getItem('heightFeet') ?? "",
        heightInches: sessionStorage.getItem('heightInches') ?? "",
        weight: sessionStorage.getItem('weight') ?? "",
    });

    const [errors, setErrors] = useState<ErrorData>({
        heightFeet: "",
        heightInches: "",
        weight: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const validateForm = (e: React.FormEvent) => {
        e.preventDefault();

        const heightFeetInt = parseInt(formData.heightFeet);
        const heightInchesInt = parseInt(formData.heightInches);
        const weightInt = parseInt(formData.weight);

        const newErrors: ErrorData = {}
        if (!formData.heightFeet || heightFeetInt < 2 || heightFeetInt > 8) newErrors.heightFeet = "❌ Input a height (feet) between 2 and 8"
        if (!formData.heightInches || heightInchesInt < 0 || heightInchesInt > 11) newErrors.heightInches = "❌ Input a height (inches) between 0 and 11"
        if (!formData.weight || weightInt > 1000 || weightInt < 40) newErrors.weight = "❌ Input a weight between 40 and 1000";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        sessionStorage.setItem("heightFeet", formData.heightFeet);
        sessionStorage.setItem("heightInches", formData.heightInches);
        sessionStorage.setItem("weight", formData.weight);

        console.log(sessionStorage.getItem('heightFeet'), sessionStorage.getItem('heightInches'), sessionStorage.getItem("weight"));

        navigate("/account/create/body-type");
    }

    return (
        <div className="relative flex flex-col justify-center items-center md:max-w-lg md:mx-auto md:mt-12">


            <form
                onSubmit={validateForm}
                className="flex flex-col w-full p-4 md:shadow-custom"
                data-testid="height-weight-form">
                <h1 className="font-bold text-left mt-3 mb-3 text-lg">How tall are you?</h1>

                {/* HEIGHT INPUT */}
                <div className="flex justify-between gap-3">
                    <div className="flex relative">
                        <label
                            className="absolute bg-white text-md left-3 p-1"
                            htmlFor="heightFeet">
                            Height Feet
                        </label>
                        <input
                            value={formData.heightFeet}
                            onChange={handleChange}
                            className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                            type="number"
                            name="heightFeet"
                            id="heightFeet"
                            required />
                    </div>
                    <div className="flex relative">
                        <label
                            className="absolute bg-white text-md left-3 p-1"
                            htmlFor="heightInches">
                            Height Inches
                        </label>
                        <div className="flex">
                            <input
                                value={formData.heightInches}
                                onChange={handleChange}
                                className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                                type="number"
                                name="heightInches"
                                id="heightInches"
                                required />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    {errors.heightFeet && <span>{errors.heightFeet}</span>}
                    {errors.heightInches && <span>{errors.heightInches}</span>}
                </div>

                <h1 className="font-bold text-left mt-6 mb-3 text-lg">What is your current weight?</h1>

                {/* WEIGHT INPUT */}
                <div>
                    <div className="flex relative">
                        <label
                            className="absolute bg-white p-1 left-3 text-md"
                            htmlFor="weight">
                            Weight
                        </label>
                        <input
                            value={formData.weight}
                            onChange={handleChange}
                            className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                            type="number"
                            name="weight"
                            id="weight"
                            required />
                    </div>
                </div>

                {errors.weight && <span>{errors.weight}</span>}

                <div className="flex gap-5 mt-8">
                    <Link
                        to="/account/create/user-information"
                        className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]"
                    >Back</Link>

                    <button
                        type="submit"
                        className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl"
                    >Next</button>
                </div>
            </form>
        </div>
    )
}

export default Step2;