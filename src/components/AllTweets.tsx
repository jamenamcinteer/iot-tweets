import React from "react"
import moment from "moment"
import LazyLoad from "react-lazyload";
import { ITweets, IAllTweetsProps } from "../interfaces/interfaces"
import { TweetsContainer, TweetsGrid, TweetsHeader, TweetUserProfileImageContainer, TweetUserProfileImage, TweetDate, TweetMeta, TweetText } from "../styles/AllTweets"

function AllTweets({ twitterData }: IAllTweetsProps) {
  return (
    <TweetsContainer>
      <TweetsHeader>All 100 Tweets</TweetsHeader>
      <TweetsGrid>
      {twitterData.map((currentTweet: ITweets) => (
        <LazyLoad height={'100%'} key={currentTweet.id}>
          <div>
            <TweetUserProfileImageContainer>
              <TweetUserProfileImage src={currentTweet.user_profile_image_url_https} alt="" data-testid="tweet-img" />
            </TweetUserProfileImageContainer>
            <TweetMeta data-testid="tweet-meta">{currentTweet.user_screen_name} @{currentTweet.user_name} <TweetDate>· {moment(currentTweet.created_at, "ddd MMM D HH:mm:ss ZZ yyyy").fromNow()}</TweetDate></TweetMeta>
            <TweetText data-testid="tweet-text" dangerouslySetInnerHTML={currentTweet}></TweetText>
          </div>
        </LazyLoad>
      ))}
      </TweetsGrid>
    </TweetsContainer>
  )
}

export default AllTweets