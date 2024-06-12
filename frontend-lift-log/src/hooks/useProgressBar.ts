// export default useProgressBar;
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ProgressBar {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  calculateBarWidth: () => number;
}

const useProgressBar = (formAmount: number): ProgressBar => {
  const location = useLocation();

  const isFormPage = location.pathname.includes('/user/create/account');

  const [currentStep, setCurrentStep] = useState<number>(
    isFormPage ? (Number(localStorage.getItem('currentStep')) ?? 0) : 0
  );

  useEffect(() => {
    if (isFormPage) {
      localStorage.setItem('currentStep', currentStep.toString());
    } else {
      localStorage.removeItem('currentStep');
    }
  }, [currentStep, isFormPage]);

  const totalSteps = formAmount;

  const nextStep = () => {
    setCurrentStep((prevState) => {
      const nextStep = prevState + 1;
      return nextStep;
    });
  };

  const prevStep = () => {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep((prevState) => {
      const prevStep = prevState - 1;
      return prevStep;
    });
  };

  const calculateBarWidth = () => {
    return ((currentStep) / (totalSteps)) * 100;
  };

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    calculateBarWidth,
  };
};

export default useProgressBar;