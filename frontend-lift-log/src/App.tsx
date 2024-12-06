import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from './context/UserContext.ts';

import Navbar from './components/navbars/Navbar.tsx';
import Home from "./components/Home.tsx";

import LoginForm from './components/forms/LoginForm.tsx';
import SignupForm from './components/forms/MultiStepSignup/SignupForm.tsx';
import Part1 from './components/forms/MultiStepSignup/Part1.tsx';
import Part2 from './components/forms/MultiStepSignup/Part2.tsx';
import Part3 from './components/forms/MultiStepSignup/Part3.tsx';
import Part4 from './components/forms/MultiStepSignup/Part4.tsx';
import Signup from './components/forms/MultiStepSignup/Signup.tsx';

import { useEffect, useState } from 'react';

import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LiftLogApi, loginData, signUpData } from './api/liftLogApi.ts'

import authEndpoints from './constants/urls.ts';

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
    const token = await LiftLogApi.signup(formData);
    setToken(token);
  }

  async function login(formData: loginData) {
    const token = await LiftLogApi.login(formData);
    setToken(token);
  }

  function logout() {
    LiftLogApi.logout();
    setToken("");
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: `/auth/${authEndpoints.loginPath}`,
      element: <LoginForm login={login} />
    },
    {
      path: "/auth",
      element: <SignupForm />,
      children: [
        { path: authEndpoints.part1Path, element: <Part1 /> },
        { path: authEndpoints.part2Path, element: <Part2 /> },
        { path: authEndpoints.part3Path, element: <Part3 /> },
        { path: authEndpoints.part4Path, element: <Part4 /> },
        { path: authEndpoints.signupPath, element: <Signup signup={signup} /> },
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
