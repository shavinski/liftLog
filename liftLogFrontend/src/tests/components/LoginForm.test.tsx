import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event'

import LoginForm from '../../components/forms/LoginForm';
import SignupForm from '../../components/forms/SignupForm/SignupForm';


afterEach(cleanup);

// const mockUser = userEvent.setup();

test('renders App component', () => {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );

    const loginTitle = screen.getByText(/Account Login/i);
    expect(loginTitle).toBeInTheDocument();
});

test('Makes sure the sign up here link redirects to SignUp form', () => {
    render(
        <MemoryRouter >
            <LoginForm />
            <SignupForm />
        </MemoryRouter>
    );

    // Loads Login Form
    const signUpLink = screen.getByText(/Sign up here!/i);
    expect(signUpLink).toBeInTheDocument();

    // User clicks sign up link
    fireEvent.click(signUpLink);

    // Redirects to Signup Form 
    expect(screen.getByText(/Account Information/i)).toBeInTheDocument();
});

test('HandleChange functions properly', () => {
    const { getByLabelText } = render(
        <MemoryRouter>
            <LoginForm  />
        </MemoryRouter>
    );

    const emailInput = getByLabelText(/Email Address/);
    fireEvent.change(emailInput, { target: { value: 'test-email' } });

    expect(emailInput).toHaveValue('test-email');
});

// TODO: Create test for login functionality when I finish writing endpoint on backed 