// -- Chart --
export interface IFrameProps {
  data: Array<IChartData>,
  size: Array<number>,
  margin: number,
  type: object,
  projection: string,
  dynamicColumnWidth: string,
  oAccessor: string,
  rAccessor: string,
  rScaleType: (d: any) => {},
  style: (d: object) => object,
  oPadding: number,
  pieceHoverAnnotation: boolean,
  tooltipContent: () => {},
  customHoverBehavior: (d: any) => void,
  customClickBehavior: (d: any) => void
}

export interface IChartData {
  word: string,
  count: number,
  color: string,
  fillOpacity: number
}

// --- Tweets ---
export interface ITweets {
  created_at: string,
  id: number,
  text: string,
  __html: string,
  user_name: string,
  user_screen_name: string,
  user_profile_image_url_https: string
}

export interface ITopWord {
  word: string,
  count: number,
  index?: number | undefined
}

// -- Theme --
export interface IPropsTheme {
  theme: ITheme
}

export interface ITheme {
  pageBackgroundColor: string,
  baseFontColor: string,
  baseFontFamily: string,
  fontSizeSmall: string,
  fontSizeMedium: string,
  fontSizeLarge: string,
  fontSizeXLarge: string,
  baseChartColorR: number,
  baseChartColorG: number,
  baseChartColorB: number,
  boxShadowPrimary: string,
  boxShadowSecondary: string
}

// --- React Component Props -->
export interface IChartProps {
  twitterData: Array<ITweets>,
  topTwentyWords: Array<ITopWord>,
  handleHover: (newTopWord: ITopWord | undefined) => void,
  handleCycleOn: (newTopWord: ITopWord) => void
}

export interface ICurrentTweetProps {
  twitterData: Array<ITweets>
}

export interface IMainLayoutProps {
  twitterData: Array<ITweets>
}

export interface INextTweetButtonProps {
  clickHandler: () => void
}

export interface ITopWordProps {
  topWord: ITopWord
}