interface UserData {
    heightFeet: number | "",
    heightInches: number | "",
    weight: number | "",
}

interface HeightWeightProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function HeightWeightForm({ heightFeet, heightInches, weight, handleChange }: HeightWeightProps) {
    return (
        <>
            {/* HEIGHT INPUT */}
            <div className="flex justify-between">
                <div className="flex relative">
                    <label
                        className="absolute bg-white text-md left-3 p-1"
                        htmlFor="height">
                        Height Feet
                    </label>

                    <input
                        value={heightFeet}
                        onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="number"
                        name="heightFeet"
                        id="heightFeet"
                        required />
                    {/* <div className="mt-4 mb-2 p-3 text-lg border-solid border-4 border-light-grey-500">ft</div> */}
                </div>

                <div className="w-3"></div>

                <div className="flex relative">
                    <label
                        className="absolute bg-white text-md left-3 p-1"
                        htmlFor="height">
                        Height Inches
                    </label>
                    <div className="flex">
                        <input
                            value={heightInches}
                            onChange={handleChange}
                            className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                            type="number"
                            name="heightInches"
                            id="heightInches"
                            required />
                        {/* <div className="mt-4 mb-2 p-3 text-lg border-solid border-4 border-light-grey-500">in</div> */}
                    </div>
                </div>
            </div>

            {/* WEIGHT INPUT */}
            <div>
                <div className="flex relative mt-6">
                    <label
                        className="absolute bg-white p-1 left-3 text-md"
                        htmlFor="weight">
                        Weight
                    </label>
                    <input
                        value={weight}
                        onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
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