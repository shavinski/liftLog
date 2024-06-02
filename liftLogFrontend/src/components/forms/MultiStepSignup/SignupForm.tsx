import { FC } from "react";
import { Link } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage";

export interface FormValidation {
    firstName?: string;
    lastName?: string;
    heightFeet?: number | "";
    heightInches?: number | "";
    weight?: number;
    email?: string;
    password?: string;
}


const SignupForm: FC = () => {

    // const calculateProgressBarWidth = () => {
    //     return ((currentStep + 1) / steps.length) * 100;
    // };

    return (
        <div className="relative flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">
            {/* MOBILE PROGRESS BAR
            // <div className="sm:invisible absolute -top-12 w-full bg-gray-300 h-2.5">
            //     <div
            //         className="sm:invisible bg-gradient-to-r from-[#00df9a] to-green-500 h-2.5"
            //         style={{ transition: "width 1s", width: `${calculateProgressBarWidth()}%` }}></div>
            // </div> */}

            {<WelcomeMessage />}

            {/* NON MOBILE PROGRESS BAR */}
            {/* <div className="w-full bg-gray-300 rounded-t-lg h-2.5 hidden sm:block">
                <div
                    className="sm:block bg-gradient-to-r from-[#00df9a] to-green-500 h-2.5 rounded-t-lg hidden"
                    style={{ transition: "width 1s", width: `${calculateProgressBarWidth()}%` }}></div>
            </div> */}

            <div>
                <h1>Begin here</h1>
                <Link to="user-information">BEGIN!</Link>
            </div>

            {/* Renders form based on current step */}
            {/* {steps[currentStep]} */}

        </div >
    );
}


export default SignupForm;