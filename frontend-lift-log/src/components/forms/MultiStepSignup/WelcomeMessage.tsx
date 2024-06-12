import { FC } from "react";

const WelcomeMessage: FC = () => {

    return (
        <>
            <div className="flex flex-col justify-center items-center sm:m-10" >
                <p className="text-4x1 font-bold">Welcome to</p>
                <p className="text-3xl font-bold text-[#00df9a]">Lift Log</p>
            </div>
        </>
    )
}

export default WelcomeMessage;