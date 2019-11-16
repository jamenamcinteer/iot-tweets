import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* border: 1px solid white; */
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const Word = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: .5rem;
  padding: 0;
`
const Count = styled.p`
  font-size: 1rem;
  margin: 0;
  padding: 0;
`

const TopWord = ({ topWord }) => {
  return (
    <Container>
      {topWord && topWord.word && (
        <div>
          <Word>{topWord.word}</Word>
          <Count>used {topWord.count} times</Count>
        </div>
      )}
    </Container>
  )
}

export default TopWord