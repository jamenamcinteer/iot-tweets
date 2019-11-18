import React from 'react';
import { cleanup, render, wait } from "@testing-library/react";
import "jest-styled-components";
import { mockSuccessResponseTwitter } from "./__mocks__/mockTwitterApiResponse"
import App from './App';

afterEach(cleanup);

it('renders without crashing', async () => {
  render(<App />)
})

it('calls the API when rendered', async () => {
  const mockJsonPromise = Promise.resolve(mockSuccessResponseTwitter);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  render(<App />)
  await wait(() => expect(global.fetch).toHaveBeenCalledTimes(1))
})

it('handles an error from the API call', async () => {
  const mockFetchPromise = Promise.reject({
    error: 'rejected'
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  render(<App />)
  
  await wait(() => expect(global.fetch).toHaveBeenCalledTimes(2))
})