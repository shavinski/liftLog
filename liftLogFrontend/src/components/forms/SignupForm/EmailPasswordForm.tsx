interface UserData {
    email: string,
    password: string,
}

interface EmailPasswordProps extends UserData {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function EmailPasswordForm({ email, password, handleChange }: EmailPasswordProps) {
    return (
        <>
            {/* FIRST NAME INPUT */}
            <div>
                <label
                    className="absolute bg-white ml-4 text-md p-1"
                    htmlFor="email">
                    Email
                </label>
                <input
                    value={email}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                    type="email"
                    name="email"
                    id="email"
                    required />
            </div>

            {/* LAST NAME INPUT */}
            <div className="mt-6">
                <label
                    className="absolute bg-white ml-4 p-1 text-md"
                    htmlFor="password">
                    Password
                </label>
                <input
                    value={password}
                    onChange={handleChange}
                    className="mt-4 mb-2 p-3 text-lg w-full border-solid border-4 border-light-grey-500"
                    type="password"
                    name="password"
                    id="password"
                    required />
            </div>
        </>
    )
}

export default EmailPasswordForm;