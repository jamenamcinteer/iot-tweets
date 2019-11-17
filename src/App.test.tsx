import React from 'react';
import { cleanup, render } from "@testing-library/react";
import "jest-styled-components";
import App from './App';

afterEach(cleanup);

it('renders without crashing', async () => {
  const {} = render(<App />)
})