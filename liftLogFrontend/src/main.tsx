import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import Navbar from './components/Navbar.tsx';
import './index.css'
import LoginForm from './components/forms/LoginForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/account/login",
    element: <LoginForm />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
)
