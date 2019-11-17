import React from 'react';
import { cleanup, render, wait, fireEvent } from "@testing-library/react";
import "jest-styled-components";
import { mockSuccessResponseTwitter } from "../__mocks__/mockTwitterApiResponse"
import Chart from './Chart';

afterEach(cleanup);

const topTwentyWords = [
  { "word": "ai", "count": 50},
  { "word": "startup", "count": 49},
  { "word": "bigdata", "count": 48},
  { "word": "5g", "count": 47},
  { "word": "cybersecurity", "count": 46},
  { "word": "security", "count": 45},
  { "word": "iot", "count": 44},
  { "word": "2019", "count": 43},
  { "word": "py", "count": 42},
  { "word": "datascience", "count": 41},
  { "word": "machinelearning", "count": 40},
  { "word": "vr", "count": 39},
  { "word": "iot", "count": 38},
  { "word": "bigdata", "count": 37},
  { "word": "analytics", "count": 36},
  { "word": "business", "count": 35},
  { "word": "infosec", "count": 34},
  { "word": "ar", "count": 33},
  { "word": "blockchain", "count": 32},
  { "word": "robotics", "count": 32},
  { "word": "data", "count": 31}
]

it('renders as expected', () => {
  const handleHover = jest.fn()
  const handleCycleOn = jest.fn()

  const { asFragment } = render(<Chart twitterData={mockSuccessResponseTwitter} topTwentyWords={topTwentyWords} handleHover={handleHover} handleCycleOn={handleCycleOn} />)
  expect(asFragment()).toMatchSnapshot()
})