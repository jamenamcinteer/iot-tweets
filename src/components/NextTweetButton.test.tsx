import React from 'react';
import { cleanup, render, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import NextTweetButton from './NextTweetButton';

afterEach(cleanup);

it('renders as expected', () => {
  const clickHandler = jest.fn()

  const { asFragment } = render(<NextTweetButton clickHandler={clickHandler} />)
  expect(asFragment()).toMatchSnapshot()
})

it('should call clickHandler when clicked', () => {
  const clickHandler = jest.fn()

  const { getByText } = render(<NextTweetButton clickHandler={clickHandler} />)
  fireEvent.click(getByText('Another Tweet'))
  expect(clickHandler).toHaveBeenCalledTimes(1)
})