import styled from "styled-components"
import { IPropsTheme } from "../interfaces/interfaces"

export const TweetsContainer = styled.div`
  background-color: ${(props: IPropsTheme) => props.theme.pageBackgroundColor};
  margin-top: 5rem;
  margin-bottom: -5rem;
  padding: 5rem 2rem;

  @media (min-width: 40rem) {
    padding: 5rem;
  }
`

export const TweetsGrid = styled.div`
  display: grid;
  grid-gap: 2rem;

  @media(min-width: 40rem) {
    grid-gap: 5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`

export const TweetsHeader = styled.h2`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeLarge};
  font-weight: normal;
  margin: 0;
  padding-bottom: 3rem;
`

export const TweetUserProfileImageContainer = styled.div`
  border-radius: 9999px;
  box-shadow: ${(props: IPropsTheme) => props.theme.boxShadowSecondary};
  display: inline-block;
`

export const TweetUserProfileImage = styled.img`
  border-radius: 9999px;
  display: block;
`

export const TweetDate = styled.span`
  white-space: nowrap;
`

export const TweetMeta = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeSmall};
`

export const TweetText = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeMedium};
`