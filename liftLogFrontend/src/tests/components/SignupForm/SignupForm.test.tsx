import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import SignupForm from "../../../components/forms/SignupForm/SignupForm";


describe("Signup component tests", () => {
    afterEach(cleanup);

    test('Renders signup component properly on initial load', () => {
        render(<SignupForm />);

        const startingText = screen.getByText(/Account Information/i);
        expect(startingText).toBeInTheDocument();

        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        expect(firstNameInput).toBeInTheDocument();

        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        expect(lastNameInput).toBeInTheDocument();
    });
});

describe("Multistep form works properly", () => {
    afterEach(cleanup);

    test("Multistep form works on firstLastName form to heightWeight form", () => {
        render(<SignupForm />);

        // Only fill out first name input, should not be able to go next
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        const nextButton = screen.getByText(/Next/i);
        fireEvent.click(nextButton);
        expect(firstNameInput).toBeInTheDocument();

        // Now fill out both fields, should now be able to properly click next
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);

        // Goes to next form in multistep => height and weight form and makes sure it loads properly initially
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;
        expect(heightFeetInput).toBeInTheDocument();
        expect(heightInchesInput).toBeInTheDocument();
        expect(weightInput).toBeInTheDocument();

        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '9' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '12' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '1002' } });

        const heightFeetError = screen.getByText(/❌ Feet must be between 2 and 8/i);
        const heightInchesError = screen.getByText(/❌ Inches must be between 0 and 11/i);
        const weightError = screen.getByText(/❌ Weight must be less than or equal to 1000/i);
        expect(heightFeetError).toBeInTheDocument();
        expect(heightInchesError).toBeInTheDocument();
        expect(weightError).toBeInTheDocument();
    });

    test("If blank inputs on second height weight form, will not allow to go to next step", () => {
        render(<SignupForm />);

        // Fill out first step in form to get to second step        
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);

        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);

        // Click next button on beginning of height weight form render
        fireEvent.click(nextButton);

        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        expect(heightFeetInput).toBeInTheDocument();

    });

    test("Test input errors on heightWeightForm, positive numbers", () => {
        render(<SignupForm />);

        // Fill out first step in form to get to second step        
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);

        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);


        // Goes to next form in multistep => height and weight form and makes sure it loads properly initially
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;

        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '9' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '12' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '1002' } });

        const heightFeetError = screen.getByText(/❌ Feet must be between 2 and 8/i);
        const heightInchesError = screen.getByText(/❌ Inches must be between 0 and 11/i);
        const weightError = screen.getByText(/❌ Weight must be less than or equal to 1000/i);
        expect(heightFeetError).toBeInTheDocument();
        expect(heightInchesError).toBeInTheDocument();
        expect(weightError).toBeInTheDocument();
    });

    test("Test input errors on heightWeightForm, negative numbers", () => {
        render(<SignupForm />);

        // Fill out first step in form to get to second step        
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);

        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);


        // Goes to next form in multistep => height and weight form and makes sure it loads properly initially
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;

        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '-1' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '-1' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '-1' } });

        const heightFeetError = screen.getByText(/❌ Feet must be between 2 and 8/i);
        const heightInchesError = screen.getByText(/❌ Inches must be between 0 and 11/i);
        const weightError = screen.getByText(/❌ Weight must be greater than or equal to 30/i);
        expect(heightFeetError).toBeInTheDocument();
        expect(heightInchesError).toBeInTheDocument();
        expect(weightError).toBeInTheDocument();
    });

    test("Multistep form works on heightWeightForm to bodyTypeForm", () => {
        render(<SignupForm />);

        // Fill out first step in form to get to second step        
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);

        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);


        // Goes to next form in multistep => height and weight form and makes sure it loads properly initially
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;

        // Update inputs to have proper values to get to next form
        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '5' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '9' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '160' } });
        fireEvent.click(nextButton);

        // Now should be on next form
        const bodyTypeTitle = screen.getByText(/What type of body type do you have?/);
        expect(bodyTypeTitle).toBeInTheDocument();
    });

    test("Multistep form works bodyTypeForm to goalForm", () => {
        render(<SignupForm />);

        // Fill out firstLast name form to get to heightWeightForm   
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);
        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);

        // Fill out heightWeight form to get to bodyTypeForm
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;
        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '5' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '9' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '160' } });
        fireEvent.click(nextButton);

        // Will click three options to make sure only one is clicked 
        const ectomorphInput = screen.getByTestId('Ectomorph') as HTMLInputElement;
        fireEvent.click(ectomorphInput);
        expect(ectomorphInput.checked).toBe(true);

        const mesomorphInput = screen.getByTestId('Mesomorph') as HTMLInputElement;
        fireEvent.click(mesomorphInput);
        expect(mesomorphInput.checked).toBe(true);

        const endomorphInput = screen.getByTestId('Endomorph') as HTMLInputElement;
        fireEvent.click(endomorphInput);
        expect(endomorphInput.checked).toBe(true);

        // Go to next form, goalForm
        fireEvent.click(nextButton);

        const goalText = screen.getByText(/Personal Goals/i);
        expect(goalText).toBeInTheDocument();
    });

    test("Multistep form works goalForm to emailPassword form", () => {
        render(<SignupForm />);

        // Fill out firstLast name form to get to heightWeightForm   
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);
        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);

        // Fill out heightWeight form to get to bodyTypeForm
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;
        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '5' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '9' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '160' } });
        fireEvent.click(nextButton);

        // Will click ectomorph option for body type
        const ectomorphInput = screen.getByTestId('Ectomorph') as HTMLInputElement;
        fireEvent.click(ectomorphInput);
        expect(ectomorphInput.checked).toBe(true);

        // Go to next form, goalForm
        fireEvent.click(nextButton);

        const goalText = screen.getByText(/Personal Goals/i);
        expect(goalText).toBeInTheDocument();

        // Will click all options on goal form to make sure they can be clicked
        const loseWeightInput = screen.getByTestId('Lose weight') as HTMLInputElement;
        fireEvent.click(loseWeightInput);
        expect(loseWeightInput.checked).toBe(true);
        const maintainWeightInput = screen.getByTestId('Maintain current weight') as HTMLInputElement;
        fireEvent.click(maintainWeightInput);
        expect(maintainWeightInput.checked).toBe(true);
        const gainWeightInput = screen.getByTestId('Gain weight') as HTMLInputElement;
        fireEvent.click(gainWeightInput);
        expect(gainWeightInput.checked).toBe(true);
        const gainMuscleInput = screen.getByTestId('Gain muscle') as HTMLInputElement;
        fireEvent.click(gainMuscleInput);
        expect(gainMuscleInput.checked).toBe(true);
        const moreActiveInput = screen.getByTestId('Become more active') as HTMLInputElement;
        fireEvent.click(moreActiveInput);
        expect(moreActiveInput.checked).toBe(true);
        // Little check to make sure only one input is checked
        expect(loseWeightInput.checked).toBe(false);

        // Go to next form, emailPassword form
        fireEvent.click(nextButton);

        const emailPasswordTitle = screen.getByText(/User Login Information/i);
        expect(emailPasswordTitle).toBeInTheDocument();
    });

    test("goalForm does not go to emailPassword form with empty inputs", () => {
        render(<SignupForm />);

        // Fill out firstLast name form to get to heightWeightForm   
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);
        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);

        // Fill out heightWeight form to get to bodyTypeForm
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;
        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '5' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '9' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '160' } });
        fireEvent.click(nextButton);

        // Will click ectomorph option for body type
        const ectomorphInput = screen.getByTestId('Ectomorph') as HTMLInputElement;
        fireEvent.click(ectomorphInput);
        expect(ectomorphInput.checked).toBe(true);

        // Go to next form, goalForm
        fireEvent.click(nextButton);

        const goalText = screen.getByText(/Personal Goals/i);
        expect(goalText).toBeInTheDocument();

        // Click next but since inputs are empty we stay on same form
        fireEvent.click(nextButton);
        expect(goalText).toBeInTheDocument();
    });

    test("Multistep final step emailPassword form, trigger alert on success", () => {
        render(<SignupForm />);

        // Fill out firstLast name form to get to heightWeightForm   
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);
        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);

        // Fill out heightWeight form to get to bodyTypeForm
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;
        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '5' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '9' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '160' } });
        fireEvent.click(nextButton);

        // Will click ectomorph option for body type
        const ectomorphInput = screen.getByTestId('Ectomorph') as HTMLInputElement;
        fireEvent.click(ectomorphInput);
        expect(ectomorphInput.checked).toBe(true);

        // Go to next form, goalForm
        fireEvent.click(nextButton);

        const goalText = screen.getByText(/Personal Goals/i);
        expect(goalText).toBeInTheDocument();

        // Will click all options on goal form to make sure they can be clicked
        const loseWeightInput = screen.getByTestId('Lose weight') as HTMLInputElement;
        fireEvent.click(loseWeightInput);
        expect(loseWeightInput.checked).toBe(true);

        // Go to next form, emailPassword form
        fireEvent.click(nextButton);

        const originalAlert = window.alert;
        window.alert = jest.fn();

        const emailPasswordTitle = screen.getByText(/User Login Information/i);
        expect(emailPasswordTitle).toBeInTheDocument();

        // Goes to next form in multistep => height and weight form and makes sure it loads properly initially
        const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;

        fireEvent.change(usernameInput, { target: { name: 'username', value: 'test-username' } });
        fireEvent.change(emailInput, { target: { name: 'email', value: 'email@test.com' } });
        fireEvent.change(passwordInput, { target: { name: 'password', value: 'test-password' } });

        const form = screen.getByTestId('signup-form');
        fireEvent.submit(form);

        expect(window.alert).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Account Created');
        window.alert = originalAlert; // Restore the original window.alert function
    });

    test("Multistep final step emailPassword form, no inputs then no submission", () => {
        render(<SignupForm />);

        // Fill out firstLast name form to get to heightWeightForm   
        const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        const nextButton = screen.getByText(/Next/i);
        fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'test-fn' } });
        fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'test-ln' } });
        fireEvent.click(nextButton);

        // Fill out heightWeight form to get to bodyTypeForm
        const heightFeetInput = screen.getByLabelText(/Height Feet/i) as HTMLInputElement;
        const heightInchesInput = screen.getByLabelText(/Height Inches/i) as HTMLInputElement;
        const weightInput = screen.getByLabelText(/Weight/i) as HTMLInputElement;
        fireEvent.change(heightFeetInput, { target: { name: 'heightFeet', value: '5' } });
        fireEvent.change(heightInchesInput, { target: { name: 'heightInches', value: '9' } });
        fireEvent.change(weightInput, { target: { name: 'weight', value: '160' } });
        fireEvent.click(nextButton);

        // Will click ectomorph option for body type
        const ectomorphInput = screen.getByTestId('Ectomorph') as HTMLInputElement;
        fireEvent.click(ectomorphInput);
        expect(ectomorphInput.checked).toBe(true);

        // Go to next form, goalForm
        fireEvent.click(nextButton);

        const goalText = screen.getByText(/Personal Goals/i);
        expect(goalText).toBeInTheDocument();

        // Will click all options on goal form to make sure they can be clicked
        const loseWeightInput = screen.getByTestId('Lose weight') as HTMLInputElement;
        fireEvent.click(loseWeightInput);
        expect(loseWeightInput.checked).toBe(true);

        // Go to next form, emailPassword form
        fireEvent.click(nextButton);

        const emailPasswordTitle = screen.getByText(/User Login Information/i);
        expect(emailPasswordTitle).toBeInTheDocument();

        // Goes to next form in multistep => height and weight form and makes sure it loads properly initially
        const usernameInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
        const submitButton = screen.getByText(/Submit/i);

        fireEvent.click(submitButton);

        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });
})
