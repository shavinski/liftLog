import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import App from './App.tsx'

import Navbar from './components/Navbar.tsx';
import LoginForm from './components/forms/LoginForm.tsx';
import SignupForm from './components/forms/SignupForm/SignupForm.tsx';

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
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Navbar />
    <RouterProvider router={router} />
  </>
)
