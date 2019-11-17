export interface IFrameProps {
  data: Array<IChartData>,
  size: Array<number>,
  margin: number,
  type: object,
  projection: string,
  dynamicColumnWidth: string,
  oAccessor: string,
  rAccessor: string,
  rScaleType: () => {},
  style: (d: object) => object,
  oPadding: number,
  pieceHoverAnnotation: boolean,
  tooltipContent: () => {},
  customHoverBehavior: (d: any) => void
}

export interface ITopTwentyWords {
  word: string,
  count: number
}

export interface IChartData {
  word: string,
  count: number,
  color: string,
  fillOpacity: number
}

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
  index: number
}

export interface IPropsTheme {
  theme: ITheme
}

export interface ITheme {
  pageBackgroundColor: string,
  baseFontColor: string,
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