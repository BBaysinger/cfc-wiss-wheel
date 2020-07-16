import React from 'react';
import { render } from '@testing-library/react';
import WissApp from './WissApp';

test('renders learn react link', () => {
  const { getByText } = render(<WissApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
