import React, { FC } from "react"
interface UserData {
    heightFeet: number | "",
    heightInches: number | "",
    weight: number | "",
}

interface HeightWeightProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const HeightWeightForm: FC<HeightWeightProps> = ({ heightFeet, heightInches, weight, handleChange }) => {
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
                        value={heightFeet}
                        onChange={handleChange}
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
                            value={heightInches}
                            onChange={handleChange}
                            className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                            type="number"
                            name="heightInches"
                            id="heightInches"
                            required />
                    </div>
                </div>
            </div>


            <h1 className="font-bold text-left mb-3 mt-3 text-lg">What is your current weight?</h1>

            {/* WEIGHT INPUT */}
            <div>
                <div className="flex relative">
                    <label
                        className="absolute bg-white p-1 left-3 text-md"
                        htmlFor="weight">
                        Weight
                    </label>
                    <input
                        value={weight}
                        onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                        type="number"
                        name="weight"
                        id="weight"
                        required />
                </div>
            </div>
        </>
    )
}

export default HeightWeightForm;