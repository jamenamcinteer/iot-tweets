import styled from "styled-components"
import { IPropsTheme } from "../interfaces/interfaces"

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

export const Word = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeLarge};
  font-weight: bold;
  margin: 0;
  margin-bottom: .5rem;
  padding: 0;
`
export const Count = styled.p`
  font-size: ${(props: IPropsTheme) => props.theme.fontSizeSmall};
  margin: 0;
  padding: 0;
`