import React, { useEffect, useState } from "react"
import moment from "moment"
import NextTweetButton from "./NextTweetButton"

const CurrentTweet = ({ twitterData }) => {
  const [currentTweet, setCurrentTweet] = useState()

  useEffect(() => {
    const newIndex = Math.floor(Math.random(0, 1) * twitterData.length)
    console.log(twitterData[newIndex])
    setCurrentTweet(twitterData[newIndex])
    // setInterval(() => {
    //   const newIndex = Math.floor(Math.random(0, 1) * twitterData.length)
    //   setCurrentTweet(twitterData[newIndex])
    // }, 15000)
  }, [twitterData])

  const nextClickHandler = () => {
    const newIndex = Math.floor(Math.random(0, 1) * twitterData.length)
    setCurrentTweet(twitterData[newIndex])
  }

  // BUG: moment returns a warning regarding the date format that Twitter provides us
  return (
    <>
    {currentTweet && (
      <div>
        <img src={currentTweet.user_profile_image_url_https} alt="" />
        <p>{currentTweet.user_screen_name} @{currentTweet.user_name} <span className="tweet__date">· {moment(currentTweet.created_at).fromNow()}</span></p>
        <p dangerouslySetInnerHTML={currentTweet}></p>
        <NextTweetButton clickHandler={nextClickHandler} />
      </div>
    )}
    </>
  )
}

export default CurrentTweet