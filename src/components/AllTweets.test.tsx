import React from 'react'
import { cleanup, render, fireEvent, wait } from "@testing-library/react"
import "jest-styled-components"
import { mockSuccessResponseTwitter } from "../__mocks__/mockTwitterApiResponse"
import AllTweets from './AllTweets'

afterEach(cleanup)

it('renders as expected', () => {
  const realDateNow = Date.now.bind(global.Date)
  const dateNowStub = jest.fn(() => 1574012671025)
  global.Date.now = dateNowStub

  const { asFragment } = render(<AllTweets twitterData={mockSuccessResponseTwitter} />)
  expect(asFragment()).toMatchSnapshot()

  global.Date.now = realDateNow
})