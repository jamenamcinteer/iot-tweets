import React from 'react';
import { cleanup, render, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import { mockSuccessResponseTwitter } from "../__mocks__/mockTwitterApiResponse"
import MainLayout from './MainLayout';

afterEach(cleanup);

// it('renders as expected', () => {
//   const { asFragment } = render(<MainLayout twitterData={mockSuccessResponseTwitter} />)
//   expect(asFragment()).toMatchSnapshot()
// })

it('handles hovering on a chart piece', () => {
  const { getAllByLabelText, getByTestId } = render(<MainLayout twitterData={mockSuccessResponseTwitter} />)

  fireEvent.mouseOver(getAllByLabelText("iot bar value 54")[0])
  expect(getByTestId("top-word").textContent).toEqual("iot")
  expect(getByTestId("top-wordcount").textContent).toEqual("used 54 times")
})

it('handles clicking on a chart piece', () => {
  const { getAllByLabelText, getByTestId } = render(<MainLayout twitterData={mockSuccessResponseTwitter} />)

  fireEvent.click(getAllByLabelText("iot bar value 54")[0])
  expect(getByTestId("top-word").textContent).toEqual("iot")
  expect(getByTestId("top-wordcount").textContent).toEqual("used 54 times")
})