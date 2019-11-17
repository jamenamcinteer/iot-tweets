import React from 'react';
import { cleanup, render, wait } from "@testing-library/react";
import "jest-styled-components";
import { mockSuccessResponseTwitter } from "../__mocks__/mockTwitterApiResponse"
import MainLayout from './MainLayout';

afterEach(cleanup);

it('calls the API when rendered', async () => {
  const mockJsonPromise = Promise.resolve(mockSuccessResponseTwitter);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const {} = render(<MainLayout />)
  await wait(() => expect(global.fetch).toHaveBeenCalledTimes(1))
})

it('handles an error from the API call', async () => {
  const mockFetchPromise = Promise.reject({
    error: 'rejected'
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

  const { } = render(<MainLayout />)
  
  await wait(() => expect(global.fetch).toHaveBeenCalledTimes(2))
})

// it('handles hovering on a chart piece', async () => {
//   const mockFetchPromise = Promise.reject({
//     error: 'rejected'
//   });
//   jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

//   const { getAllByLabelText, getByTestId } = render(<MainLayout />)

  // fireEvent.mouseOver(getAllByLabelText("data bar value 50")[0])
  // expect(getByTestId("top-word")).toEqual("iot")
  // expect(getByTestId("top-wordcount")).toEqual("used 7 times")
// })