import React, { FC, useState } from "react"

interface FormData {
    firstName: string,
    lastName: string,
}

interface FirsLastNameProps {
    goToNextForm: () => void,
}

const FirsLastNameForm: FC<FirsLastNameProps> = ({ goToNextForm }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        

    }

    return (
        <>
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">Account Information</h1>

            {/* FIRST NAME INPUT */}
            <div className="relative">
                <label
                    className="absolute bg-white text-md left-3 p-1"
                    htmlFor="firstName">
                    First Name
                </label>
                <input
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                    type="firstName"
                    name="firstName"
                    id="firstName"
                    required />
            </div>

            {/* LAST NAME INPUT */}
            <div className="relative mt-6">
                <label
                    className="absolute bg-white text-md left-3 p-1"
                    htmlFor="lastName">
                    Last Name
                </label>
                <input
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    required />
            </div>

            <div className="flex gap-5 mt-8">
                <a
                    href="/account/login"
                    className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] text-center font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]"
                >Back</a>

                <button
                    onClick={goToNextForm}
                    type="button"
                    className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] text-white font-bold text-xl"
                >Next</button>
            </div>
        </>
    )
}

export default FirsLastNameForm;