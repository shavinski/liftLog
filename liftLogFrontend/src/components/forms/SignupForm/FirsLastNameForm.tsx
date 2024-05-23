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
            <h1 className="font-bold text-left mt-3 mb-3 text-lg">Account Information</h1>
            
            {/* FIRST NAME INPUT */}
            <div className="relative">
                <label
                    className="absolute bg-white text-md left-3 p-1"
                    htmlFor="firstName">
                    First Name
                </label>
                <input
                    value={firstName}
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
                    value={lastName}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500 rounded-lg"
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    required />
            </div>
        </>
    )
}

export default FirsLastNameForm;