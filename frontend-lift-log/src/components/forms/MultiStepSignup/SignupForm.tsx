import { FC, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import WelcomeMessage from "./WelcomeMessage";

// export interface FormValidation {
//     firstName?: string;
//     lastName?: string;
//     heightFeet?: number | "";
//     heightInches?: number | "";
//     weight?: number;
//     email?: string;
//     password?: string;
// }

const SignupForm: FC = () => {
    const navigate = useNavigate();
    const [clickedLink, setClickLink] = useState<boolean>(false);
    const location = useLocation();

    const handleSignupLink = () => {
        navigate("/users/create/account/part-1-user-information");
        setClickLink(!clickedLink);
    }

    return (
        <div className="relative flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">

            {location.pathname === "/users/create/account" &&
                <>
                    {< WelcomeMessage />}

                    <div>
                        <button className="bg-[#00df9a] font-bold text-base p-3 rounded-tl-2xl rounded-br-2xl mt-6 md:mt-0 hover:bg-[#13FFB6] active:bg-[#00df9a] transform transition duration-300 hover:scale-105"
                            type="button"
                            onClick={handleSignupLink}>
                            Begin Today!
                        </button>
                    </div>
                </>
            }

            <Outlet context={{}} />
        </div >
    );
};

export default SignupForm;