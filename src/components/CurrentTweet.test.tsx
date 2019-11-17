import React from 'react';
import { cleanup, render, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import { mockSuccessResponseTwitter } from "../__mocks__/mockTwitterApiResponse"
import CurrentTweet from './CurrentTweet';

afterEach(cleanup);

// it('renders as expected', () => {
//   const { asFragment } = render(<CurrentTweet twitterData={mockSuccessResponseTwitter} />)
//   expect(asFragment()).toMatchSnapshot()
// })

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
  }, 0)
  
})