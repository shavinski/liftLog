interface UserData {
    height: number | "",
    weight: number | "",
}

interface HeightWeightProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function HeightWeightForm({ height, weight, handleChange }: HeightWeightProps) {
    return (
        <>
            {/* HEIGHT INPUT */}
            <div>
                <label
                    className="absolute bg-white ml-4 text-md p-1"
                    htmlFor="height">
                    Height
                </label>
                <div>
                    <input
                        value={height}
                        onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="number"
                        name="height"
                        id="height"
                        required />
                    <div className="border-solid border-4 border-light-grey-500">ft</div>
                </div>
            </div>

            {/* WEIGHT INPUT */}
            <div className="mt-6">
                <label
                    className="absolute bg-white ml-4 p-1 text-md"
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
        </>
    )
}

export default HeightWeightForm;