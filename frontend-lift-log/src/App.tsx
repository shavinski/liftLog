import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from './context/UserContext.ts';

import Navbar from './components/Navbar.tsx';
import Home from "./components/Home.tsx";

import LoginForm from './components/forms/LoginForm.tsx';
import SignupForm from './components/forms/MultiStepSignup/SignupForm.tsx';
import Step1 from './components/forms/MultiStepSignup/Step1.tsx';
import Step2 from './components/forms/MultiStepSignup/Step2.tsx';
import Step3 from './components/forms/MultiStepSignup/Step3.tsx';
import Step4 from './components/forms/MultiStepSignup/Step4.tsx';
import FinalStep from './components/forms/MultiStepSignup/FinalStep.tsx';

import { useEffect, useState } from 'react';

import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LiftLogApi, loginData, signUpData } from './api/LiftLogApi.ts';

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

const LOCAL_STORAGE_TOKEN = "";

function App() {
  const [token, setToken] = useState(localStorage.getItem(LOCAL_STORAGE_TOKEN));
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      if (token) {
        LiftLogApi.token = token;
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
        const { username } = jwtDecode<CustomJwtPayload>(token);
        const userData = await LiftLogApi.getSingleUserData(username);
        setUser(userData.user);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        setUser(undefined);
      }

      setIsLoading(false);
    }

    getUser();
  }, [token]);

  async function signup(formData: signUpData) {
    try {
      const token = await LiftLogApi.signup(formData);
      setToken(token);
    } catch (error) {
      throw error;
    }
  }

  async function login(formData: loginData) {
    try {
      const token = await LiftLogApi.login(formData);
      setToken(token);
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    LiftLogApi.logout();
    console.log("Execute log out on app")
    setToken("");
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/account/login",
      element: <LoginForm login={login}/>
    },
    {
      path: "/users/create/account",
      element: <SignupForm />,
      children: [
        { path: "part-1-user-information", element: <Step1 /> },
        { path: "part-2-height-weight", element: <Step2 /> },
        { path: "part-3-body-type", element: <Step3 /> },
        { path: "part-4-goal", element: <Step4 /> },
        { path: "signup", element: <FinalStep signup={signup} /> },
      ]
    },
  ]);

  return (
    <>
      <UserContext.Provider value={{ user }} >
        <Navbar logout={logout} />
        <RouterProvider router={router} />
      </UserContext.Provider >
    </>
  );
}

export default App;
