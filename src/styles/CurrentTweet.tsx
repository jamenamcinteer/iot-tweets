import styled from "styled-components"
import { IPropsTheme } from "../interfaces/interfaces"

export const TweetUserProfileImageContainer = styled.div`
  border-radius: 9999px;
  box-shadow: ${(props: IPropsTheme) => props.theme.boxShadowSecondary};
  display: inline-block;
`

export const TweetUserProfileImage = styled.img`
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

export const TweetDate = styled.span`
  white-space: nowrap;
`

export const TweetMeta = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeSmall};
`

export const TweetText = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeMedium};
`