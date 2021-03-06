import styled from "styled-components"
import { IPropsTheme } from "../interfaces/interfaces"

export const TweetContainer = styled.div`
  padding: 0 2rem;

  @media (min-width: 40rem) {
    padding: 0;
  }
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