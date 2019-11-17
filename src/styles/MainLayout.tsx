import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem 9rem;
  width: 100%;

  @media (min-width: 80rem) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 90rem) {
    grid-template-columns: 1fr 400px 25rem 1fr;
  }
  `

  export const GridChart = styled.div`
  @media (min-width: 90rem) {
    grid-column: 2;
  }
`

export const GridChartFrame = styled.div`
  position: relative;
  margin: 0 auto;

  @media (min-width: 28rem) {
    width: 400px;
  }
  @media (min-width: 80rem) {
    float: right;
    margin: 0;
  }
  @media (min-width: 90rem) {
    float: none;
    margin: 0 auto;
  }
`

export const GridTweets = styled.div`
  @media (min-width: 90rem) {
    grid-column: 3;
  }
`

export const GridTweetsContainer = styled.div`
  max-width: 25rem;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;

  @media (min-width: 80rem) {
    margin: 0;
  }
  @media (min-width: 90rem) {
    margin: 0 auto;
  }
`