import React, { useEffect, useState } from "react"
import moment from "moment"
import NextTweetButton from "./NextTweetButton"
import { ITweets, ICurrentTweetProps } from "../interfaces/interfaces"
import { TweetContainer, TweetUserProfileImageContainer, TweetUserProfileImage, TweetDate, TweetMeta, TweetText } from "../styles/CurrentTweet"

function CurrentTweet({ twitterData }: ICurrentTweetProps) {
  const [currentTweet, setCurrentTweet] = useState<ITweets | undefined>()

  // Select a random tweet to display when the component gets the twitter data
  useEffect(() => {
    const newIndex: number = Math.floor(Math.random() * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
  }, [twitterData])

  // Change the current tweet to another random tweet when the Another Tweet button is clicked
  const nextClickHandler = () => {
    const newIndex: number = Math.floor(Math.random() * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
  }

  return (
    <>
    {currentTweet && (
      <TweetContainer>
        <TweetUserProfileImageContainer>
          <TweetUserProfileImage src={currentTweet.user_profile_image_url_https} alt="" data-testid="tweet-img" />
        </TweetUserProfileImageContainer>
        <TweetMeta data-testid="tweet-meta">{currentTweet.user_screen_name} @{currentTweet.user_name} <TweetDate>· {moment(currentTweet.created_at, "ddd MMM D HH:mm:ss ZZ yyyy").fromNow()}</TweetDate></TweetMeta>
        <TweetText data-testid="tweet-text" dangerouslySetInnerHTML={currentTweet}></TweetText>
        <NextTweetButton clickHandler={nextClickHandler} />
      </TweetContainer>
    )}
    </>
  )
}

export default CurrentTweet