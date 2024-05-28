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

        // 
    });

})
