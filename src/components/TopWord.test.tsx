import React from 'react'
import { cleanup, render } from "@testing-library/react"
import "jest-styled-components"
import TopWord from './TopWord'

afterEach(cleanup)

it('renders as expected', () => {
  const topWord = {
    word: "AI",
    count: 50,
    index: 0
  }

  const { asFragment } = render(<TopWord topWord={topWord} />)
  expect(asFragment()).toMatchSnapshot()
})