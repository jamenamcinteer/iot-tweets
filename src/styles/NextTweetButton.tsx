import styled from "styled-components"
import { IPropsTheme } from "../interfaces/interfaces"

export const Button = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 1.6rem;
  box-shadow: ${(props: IPropsTheme) => props.theme.boxShadowPrimary};
  padding: 1rem 1.5rem;
  color: ${(props: IPropsTheme) => props.theme.baseFontColor};
  cursor: pointer;
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeSmall};
  font-family: ${(props: IPropsTheme) => props.theme.baseFontFamily};

  &:hover, &:focus {
    box-shadow: ${(props: IPropsTheme) => props.theme.boxShadowSecondary};
  }
`