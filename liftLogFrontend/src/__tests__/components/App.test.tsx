import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders App component', () => {
  render(<App />);
  const element = screen.getByText(/Welcome to this page/i);
  expect(element).toBeInTheDocument();
});
4