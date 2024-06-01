import React, { FC } from "react"
import { FormValidation } from "./SignupForm";

// interface UserData {
//     heightFeet: number | "",
//     heightInches: number | "",
//     weight: number | "",
//     errors: FormValidation,
// }

// interface HeightWeightProps extends UserData {
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
// }

interface HeightWeightProps {
    // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    goToNextForm: () => void,
    goToPreviousForm: () => void,
}

const HeightWeightForm: FC<HeightWeightProps> = ({ goToNextForm, goToPreviousForm }) => {

    return (
        <>
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">How tall are you?</h1>

            {/* HEIGHT INPUT */}
            <div className="flex justify-between">
                <div className="flex relative">
                    <label
                        className="absolute bg-white text-md left-3 p-1"
                        htmlFor="heightFeet">
                        Height Feet
                    </label>

                    <input
                        // value={heightFeet}
                        // onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                        type="number"
                        name="heightFeet"
                        id="heightFeet"
                        required />

                </div>

                <div className="w-3"></div>


                <div className="flex relative">
                    <label
                        className="absolute bg-white text-md left-3 p-1"
                        htmlFor="heightInches">
                        Height Inches
                    </label>
                    <div className="flex">
                        <input
                            // value={heightInches}
                            // onChange={handleChange}
                            className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                            type="number"
                            name="heightInches"
                            id="heightInches"
                            required />
                    </div>
                </div>
            </div>

            {/* {errors.heightFeet && <span>{errors.heightFeet}</span>}
            {errors.heightInches && <span>{errors.heightInches}</span>} */}

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
                        // value={weight}
                        // onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                        type="number"
                        name="weight"
                        id="weight"
                        required />
                </div>
            </div>

            {/* {errors.weight && <span>{errors.weight}</span>} */}

            <div className="flex gap-5 mt-8">
                <button
                    onClick={goToPreviousForm}
                    type="button"
                    className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]"
                >Back</button>

                <button
                    onClick={goToNextForm}
                    type="button"
                    className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl"
                >Next</button>
            </div>
        </>
    )
}

export default HeightWeightForm;