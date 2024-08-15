import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from './components/Navbar.tsx';
import Home from "./components/Home.tsx";
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
    element: <Home />
  },
  {
    path: "/account/login",
    element: <LoginForm />
  },
  {
    path: "/user/create/account",
    element: <SignupForm />,
    children: [
      { path: "part-1-user-information", element: <Step1 /> },
      { path: "part-2-height-weight", element: <Step2 /> },
      { path: "part-3-body-type", element: <Step3 /> },
      { path: "part-4-goal", element: <Step4 /> },
      { path: "part-5-final-account-information", element: <FinalStep /> },
    ]
  },
]);

function App() {

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
