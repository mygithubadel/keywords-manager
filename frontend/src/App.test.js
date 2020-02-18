import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Keywords Manager in root path', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Keywords Manager/i);
  expect(linkElement).toBeInTheDocument();
});
