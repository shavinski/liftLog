interface UserData {
    firstName: string,
    lastName: string,
}

interface FirsLastNameProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function FirsLastNameForm({ firstName, lastName, handleChange }: FirsLastNameProps) {
    return (
        <>
            {/* FIRST NAME INPUT */}
            <div>
                <label
                    className="absolute bg-white ml-4 text-md p-1"
                    htmlFor="firstName">
                    First Name
                </label>
                <input
                    value={firstName}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                    type="firstName"
                    name="firstName"
                    id="firstName"
                    required />
            </div>

            {/* LAST NAME INPUT */}
            <div className="mt-6">
                <label
                    className="absolute bg-white ml-4 p-1 text-md"
                    htmlFor="lastName">
                    Last Name
                </label>
                <input
                    value={lastName}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    required />
            </div>
        </>
    )
}

export default FirsLastNameForm;