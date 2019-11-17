import React from "react"
import { INextTweetButtonProps } from "../interfaces/interfaces"
import { Button } from "../styles/NextTweetButton"

const NextTweetButton = ({ clickHandler }: INextTweetButtonProps) => {
  const onClick = (e: any) => {
    e.preventDefault()
    e.target.blur()
    clickHandler()
  }

  return (
    <Button onClick={onClick}>
      Another Tweet
      <svg viewBox="0 0 12 12" fill="none" style={{"width": "14px", "height": "14px", "marginLeft": "5px"}}>
        <path d="M6 0.666664L5.06 1.60666L8.78 5.33333H0.666668V6.66666H8.78L5.06 10.3933L6 11.3333L11.3333 6L6 0.666664Z" fill="white"/>
      </svg>
    </Button>
  )
}

export default NextTweetButton