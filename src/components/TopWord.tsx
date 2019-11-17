import React from "react"
import { ITopWordProps } from "../interfaces/interfaces"
import { Container, Word, Count } from "../styles/TopWord"

const TopWord = ({ topWord }: ITopWordProps) => {
  return (
    <Container>
      {topWord && topWord.word && (
        <>
          <Word data-testid="top-word">{topWord.word}</Word>
          <Count data-testid="top-wordcount">used {topWord.count} times</Count>
        </>
      )}
    </Container>
  )
}

export default TopWord