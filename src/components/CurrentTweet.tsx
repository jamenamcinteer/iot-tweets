import React, { useEffect, useState } from "react"
import moment from "moment"
import NextTweetButton from "./NextTweetButton"
import { ITweets, ICurrentTweetProps } from "../interfaces/interfaces"
import { TweetUserProfileImageContainer, TweetUserProfileImage, TweetDate, TweetMeta, TweetText } from "../styles/CurrentTweet"

const CurrentTweet = ({ twitterData }: ICurrentTweetProps) => {
  const [currentTweet, setCurrentTweet] = useState<ITweets | undefined>()

  useEffect(() => {
    const newIndex: number = Math.floor(Math.random() * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
  }, [twitterData])

  const nextClickHandler = () => {
    const newIndex: number = Math.floor(Math.random() * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
  }

  return (
    <>
    {currentTweet && (
      <div>
        <TweetUserProfileImageContainer>
          <TweetUserProfileImage src={currentTweet.user_profile_image_url_https} alt="" data-testid="tweet-img" />
        </TweetUserProfileImageContainer>
        <TweetMeta data-testid="tweet-meta">{currentTweet.user_screen_name} @{currentTweet.user_name} <TweetDate>· {moment(currentTweet.created_at, "ddd MMM D HH:mm:ss ZZ yyyy").fromNow()}</TweetDate></TweetMeta>
        <TweetText data-testid="tweet-text" dangerouslySetInnerHTML={currentTweet}></TweetText>
        <NextTweetButton clickHandler={nextClickHandler} />
      </div>
    )}
    </>
  )
}

export default CurrentTweet