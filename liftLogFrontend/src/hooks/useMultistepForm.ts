import { ReactElement, useState } from "react";

function useMultistepForm(steps: ReactElement[]) {
    const [currentStep, setCurrentStep] = useState(0);

    function next() {
        setCurrentStep(i =>  {
            
            if (i > steps.length - 1) {
                return currentStep;
            }
           
            return i + 1;
        });
    }

    function back() {
        setCurrentStep(i =>  {
            
            if (i <= 0) {
                return currentStep;
            }
           
            return i - 1;
        });
    }

    function goTo(index: number) {
        setCurrentStep(index);
    }

    return {
        currentStep,
        form: steps[currentStep],
        steps,
        next,
        back,
        goTo,
    }
}

export default useMultistepForm;