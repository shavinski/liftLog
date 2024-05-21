import React, { useState } from "react";

interface SingupFormData {
    firstName: string;
    lastName: string;
}

function SignupForm() {

    const [formData, setFormData] = useState<SingupFormData>({
        firstName: "",
        lastName: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sending to server...");
        console.log(formData);
        // TODO: SEND FORM INFO TO BACKEND LATER ON
    }

    return (
        <div className="flex flex-col justify-center items-center w-11/12 mx-auto md:max-w-lg mt-12">
            <div className="flex flex-col justify-center items-center" >
                <p className="text-4x1 font-bold pt-4">Welcome to</p>
                <p className="text-3xl font-bold text-[#00df9a] pb-6">Lift Log</p>
            </div>

            <p className="text-lg text-center">Ready to begin your journey?</p>

            <form className="flex flex-col w-full shadow-custom p-12">

                <div className="">
                    <label
                        className="absolute bg-white ml-4 text-md p-1"
                        htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        value={formData.firstName} onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="firstName"
                        name="firstName"
                        id="firstName" />
                </div>
                <div className="mt-6">
                    <label
                        className="absolute bg-white ml-4 p-1 text-md"
                        htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        value={formData.lastName} onChange={handleChange}
                        className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                        type="lastName"
                        name="lastName"
                        id="lastName" />
                </div>

                <div className="flex w-full mt-8">
                    <button className="w-1/2 p-3 border-solid border-2 border-[#00df9a] rounded-md text-[#00df9a] font-bold text-xl hover:border-[#10B981] hover:text-[#10B981]">Back</button>
                    <div className="bg-white w-4"></div>
                    <button className="w-1/2 p-3 bg-[#00df9a] rounded-md hover:bg-[#10B981] color-white text-white font-bold text-xl">Next</button>
                </div>
            </form>

        </div>
    );
}

export default SignupForm;