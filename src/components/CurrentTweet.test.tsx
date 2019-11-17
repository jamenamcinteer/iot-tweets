import React from 'react';
import { cleanup, render, fireEvent, wait } from "@testing-library/react";
import "jest-styled-components";
import { mockSuccessResponseTwitter } from "../__mocks__/mockTwitterApiResponse"
import CurrentTweet from './CurrentTweet';

afterEach(cleanup);

it('renders as expected', () => {
  const realDateNow = Date.now.bind(global.Date);
  const dateNowStub = jest.fn(() => 1574012671025);
  global.Date.now = dateNowStub;

  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.01;
  global.Math = mockMath;

  const { asFragment } = render(<CurrentTweet twitterData={mockSuccessResponseTwitter} />)
  expect(asFragment()).toMatchSnapshot()

  global.Date.now = realDateNow;
})

it('should call clickHandler when clicked', () => {
  const { getByText, getByTestId } = render(<CurrentTweet twitterData={mockSuccessResponseTwitter} />)
  const oldImg = getByTestId("tweet-img")
  const oldMeta = getByTestId("tweet-meta")
  const oldText = getByTestId("tweet-text")

  fireEvent.click(getByText('Another Tweet'))

  setTimeout(() => {
    expect(getByTestId("tweet-img")).not.toBe(oldImg)
    expect(getByTestId("tweet-meta")).not.toBe(oldMeta)
    expect(getByTestId("tweet-text")).not.toBe(oldText)
  }, 10)
  
})