import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import App from './App.tsx'

import Navbar from './components/Navbar.tsx';
import LoginForm from './components/forms/LoginForm.tsx';

import SignupForm from './components/forms/MultiStepSignup/SignupForm.tsx';
import Step1 from './components/forms/MultiStepSignup/Step1.tsx';
import Step2 from './components/forms/MultiStepSignup/Step2.tsx';
import Step3 from './components/forms/MultiStepSignup/Step3.tsx';
import Step4 from './components/forms/MultiStepSignup/Step4.tsx';
import FinalStep from './components/forms/MultiStepSignup/FinalStep.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/account/login",
    element: <LoginForm />
  },
  {
    path: "/account/create",
    element: <SignupForm />
  },
  {
    path: "/account/create/user-information",
    element: <Step1 />
  },
  {
    path: "/account/create/height-weight",
    element: <Step2 />
  },
  { 
    path: "account/create/body-type", 
    element: <Step3 />
  },
  { 
    path: "account/create/goal", 
    element: <Step4 />
  },
  { 
    path: "account/create/account-information", 
    element: <FinalStep />
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Navbar />
    <RouterProvider router={router} />
  </>
)
