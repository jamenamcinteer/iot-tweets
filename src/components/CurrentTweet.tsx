import React, { useEffect, useState } from "react"
import moment from "moment"
import styled from "styled-components"
import NextTweetButton from "./NextTweetButton"
import { IPropsTheme, ITweets } from "../interfaces/interfaces"

const TweetUserProfileImageContainer = styled.div`
  border-radius: 9999px;
  box-shadow: ${(props: IPropsTheme) => props.theme.boxShadowSecondary};
  display: inline-block;
`

const TweetUserProfileImage = styled.img`
  border-radius: 9999px;
  display: block;
  /* -webkit-mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg>'); */
  /* mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg>'); */
  /* mask-image: url('data%3Aimage%2Fsvg%2Bxml%3Butf8%2C%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%2F%3E%3C%2Fsvg%3E'); */
  /* mask-mode: alpha; */
  /* -webkit-mask-repeat: no-repeat; */
  /* mask-repeat: no-repeat; */
  /* -webkit-mask-size: contain; */
  /* mask-size: contain; */
  /* -webkit-mask-position: center; */
  /* mask-position: center; */
`

const TweetDate = styled.span`
  white-space: nowrap;
`

const TweetMeta = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeSmall};
`

const TweetText = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeMedium};
`

const CurrentTweet = ({ twitterData }) => {
  const [currentTweet, setCurrentTweet] = useState<ITweets | undefined>()

  useEffect(() => {
    const newIndex: number = Math.floor(Math.random() * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
    // setInterval(() => {
    //   const newIndex = Math.floor(Math.random(0, 1) * twitterData.length)
    //   setCurrentTweet(twitterData[newIndex])
    // }, 15000)
  }, [twitterData])

  const nextClickHandler = () => {
    const newIndex: number = Math.floor(Math.random() * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
  }

  // BUG: moment returns a warning regarding the date format that Twitter provides us
  return (
    <>
    {currentTweet && (
      <div>
        <TweetUserProfileImageContainer>
          <TweetUserProfileImage src={currentTweet.user_profile_image_url_https} alt="" data-testid="tweet-img" />
        </TweetUserProfileImageContainer>
        <TweetMeta data-testid="tweet-meta">{currentTweet.user_screen_name} @{currentTweet.user_name} <TweetDate>· {moment(currentTweet.created_at).fromNow()}</TweetDate></TweetMeta>
        <TweetText data-testid="tweet-text" dangerouslySetInnerHTML={currentTweet}></TweetText>
        <NextTweetButton clickHandler={nextClickHandler} />
      </div>
    )}
    </>
  )
}

export default CurrentTweet