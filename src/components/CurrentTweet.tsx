import React, { useEffect, useState } from "react"
import moment from "moment"
import styled from "styled-components"
import NextTweetButton from "./NextTweetButton"

const TweetUserProfileImage = styled.img`
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
  /* -webkit-mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg>'); */
  mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg>');
  mask-mode: alpha;
  /* -webkit-mask-repeat: no-repeat; */
  mask-repeat: no-repeat;
  /* -webkit-mask-size: contain; */
  mask-size: contain;
  /* -webkit-mask-position: center; */
  mask-position: center;
  border-radius: 9999px;
`

const TweetDate = styled.span`
  white-space: nowrap;
`

const CurrentTweet = ({ twitterData }) => {
  const [currentTweet, setCurrentTweet] = useState()

  useEffect(() => {
    const newIndex = Math.floor(Math.random() * twitterData.length)
    console.log(twitterData[newIndex])
    setCurrentTweet(twitterData[newIndex])
    // setInterval(() => {
    //   const newIndex = Math.floor(Math.random(0, 1) * twitterData.length)
    //   setCurrentTweet(twitterData[newIndex])
    // }, 15000)
  }, [twitterData])

  const nextClickHandler = () => {
    const newIndex = Math.floor(Math.random() * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
  }

  // BUG: moment returns a warning regarding the date format that Twitter provides us
  return (
    <>
    {currentTweet && (
      <div>
        <TweetUserProfileImage src={currentTweet.user_profile_image_url_https} alt="" />
        <p>{currentTweet.user_screen_name} @{currentTweet.user_name} <TweetDate>· {moment(currentTweet.created_at).fromNow()}</TweetDate></p>
        <p dangerouslySetInnerHTML={currentTweet}></p>
        <NextTweetButton clickHandler={nextClickHandler} />
      </div>
    )}
    </>
  )
}

export default CurrentTweet