import { render, screen } from '@testing-library/react';
import Placeholder from "../placeholder";
import { placeholder_text } from '../../../utils/constants';

test('renders empty placeholder on page load', () => {
  render(<Placeholder />);
  const linkElement = screen.getByText(new RegExp(placeholder_text, "i"));
  expect(linkElement).toBeInTheDocument();
});
