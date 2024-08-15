import { FC, ReactNode, useState } from "react";
import { Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";

import useProgressBar from "../../../hooks/useProgressBar"

import WelcomeMessage from "./WelcomeMessage";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import FinalStep from "./FinalStep";
// import ProgressBar from "./ProgressBar";

export interface FormValidation {
    firstName?: string;
    lastName?: string;
    heightFeet?: number | "";
    heightInches?: number | "";
    weight?: number;
    email?: string;
    password?: string;
}

type ProgessBarContext = {
    currentStep: number,
    totalSteps: number,
    nextStep: () => void,
    prevStep: () => void,
    calculteBarwidth: () => string,
}

const SignupForm: FC = () => {
    const navigate = useNavigate();
    const [clickedLink, setClickLink] = useState<boolean>(false);
    const location = useLocation();

    const formSteps: ReactNode[] = [
        <Step1 />,
        <Step2 />,
        <Step3 />,
        <Step4 />,
        <FinalStep />
    ];

    const { currentStep,
        totalSteps,
        nextStep,
        prevStep,
        calculateBarWidth
    } = useProgressBar(formSteps.length);

    const handleSignupLink = () => {
        navigate("/user/create/account/part-1-user-information");
        nextStep();
        setClickLink(!clickedLink);
    }

    return (
        <div className="relative flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">

            {/* {location.pathname !== "/user/create/account" &&
                <ProgressBar calculateBarWidth={calculateBarWidth} />
            } */}

            {location.pathname === "/user/create/account" &&
                <>
                    {< WelcomeMessage />}

                    <div>
                        <button
                            type="button"
                            onClick={handleSignupLink}>
                            Begin Today!
                        </button>
                    </div>
                </>
            }

            <Outlet context={{ currentStep, totalSteps, nextStep, prevStep, calculateBarWidth }} />
        </div >
    );
};

export function useFormProgessBar() {
    return useOutletContext<ProgessBarContext>();
}


export default SignupForm;