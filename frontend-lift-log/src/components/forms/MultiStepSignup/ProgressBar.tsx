import { FC } from "react";

interface ProgessBarProps {
    calculateBarWidth: () => number
}

const ProgressBar: FC<ProgessBarProps> = ({ calculateBarWidth }) => {

    return (
        <>
            {/* MOBILE PROGRESS BAR */}
            <div className="sm:invisible absolute -top-12 w-full bg-gray-300 h-2.5">
                <div
                    className="sm:invisible bg-gradient-to-r from-[#00df9a] to-green-500 h-2.5"
                    style={{ transition: "width 1s", width: `${calculateBarWidth()}%` }}></div>
            </div>


            {/* NON MOBILE PROGRESS BAR */}
            <div className="w-full bg-gray-300 rounded-t-lg h-2.5 hidden sm:block">
                <div
                    className="sm:block bg-gradient-to-r from-[#00df9a] to-green-500 h-2.5 rounded-t-lg hidden"
                    style={{ transition: "width 1s", width: `${calculateBarWidth()}%` }}></div>
            </div>
        </>
    );
};

export default ProgressBar;