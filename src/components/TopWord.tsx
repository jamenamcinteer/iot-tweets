import React from "react"
import styled from "styled-components"
import { IPropsTheme, ITopWordProps } from "../interfaces/interfaces"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const Word = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeLarge};
  font-weight: bold;
  margin: 0;
  margin-bottom: .5rem;
  padding: 0;
`
const Count = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeSmall};
  margin: 0;
  padding: 0;
`

const TopWord = ({ topWord }: ITopWordProps) => {
  return (
    <Container>
      {topWord && topWord.word && (
        <div>
          <Word data-testid="top-word">{topWord.word}</Word>
          <Count data-testid="top-wordcount">used {topWord.count} times</Count>
        </div>
      )}
    </Container>
  )
}

export default TopWord