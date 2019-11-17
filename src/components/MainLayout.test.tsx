import React from 'react';
import { cleanup, render } from "@testing-library/react";
import "jest-styled-components";
import { mockSuccessResponseTwitter } from "../__mocks__/mockTwitterApiResponse"
import MainLayout from './MainLayout';

afterEach(cleanup);

it('renders as expected', () => {
  const realDateNow = Date.now.bind(global.Date);
  const dateNowStub = jest.fn(() => 1574012671025);
  global.Date.now = dateNowStub;

  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.01;
  global.Math = mockMath;

  const { asFragment, getByTestId } = render(<MainLayout twitterData={mockSuccessResponseTwitter} />)
  expect(asFragment()).toMatchSnapshot()

  expect(getByTestId("top-word").textContent).toEqual("iot")
  expect(getByTestId("top-wordcount").textContent).toEqual("used 54 times")
  setTimeout(() => {
    expect(getByTestId("top-word").textContent).toEqual("ai")
    expect(getByTestId("top-wordcount").textContent).toEqual("used 34 times")
  }, 3000)

  global.Date.now = realDateNow;
})

// These don't work because the visualization layer in the chart is separate from the interaction layer and the interaction layer doesn't have text to select
// ---
// it('handles hovering on a chart piece', () => {
//   const { getAllByLabelText, getByTestId } = render(<MainLayout twitterData={mockSuccessResponseTwitter} />)

//   fireEvent.mouseOver(getAllByLabelText("bigdata bar value 15")[0])
//   expect(getByTestId("top-word").textContent).toEqual("bigdata")
//   expect(getByTestId("top-wordcount").textContent).toEqual("used 15 times")
// })

// it('handles clicking on a chart piece', () => {
//   const { getAllByLabelText, getByTestId } = render(<MainLayout twitterData={mockSuccessResponseTwitter} />)

//   fireEvent.click(getAllByLabelText("bigdata bar value 15")[0])
//   expect(getByTestId("top-word").textContent).toEqual("bigdata")
//   expect(getByTestId("top-wordcount").textContent).toEqual("used 15 times")
// })