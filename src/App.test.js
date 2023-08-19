import { render, screen } from '@testing-library/react';
import App from './App';

test('renders empty placeholder on page load', () => {
  render(<App />);
  const linkElement = screen.getByText(/No data for curent period/i);
  expect(linkElement).toBeInTheDocument();
});
