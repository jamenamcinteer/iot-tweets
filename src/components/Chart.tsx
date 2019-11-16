import React, { useState, useEffect } from "react"
import OrdinalFrame from "semiotic/lib/OrdinalFrame"
import { scaleSqrt } from "d3-scale"
import { IFrameProps, ITopTwentyWords, IChartData } from "../interfaces/interfaces"

const Chart = (({ twitterData, topTwentyWords, handleHover, handleCycleOn }) => {
  const [frameProps, setFrameProps] = useState<IFrameProps | undefined>(undefined)
  const [hoveredOn, setHoveredOn] = useState()
  const [cycleTweet, setCycleTweet] = useState(0)
  const [cycleOn, setCycleOn] = useState(topTwentyWords[0])

  useEffect(() => {
    if(twitterData.length > 0) {
      let r: number = -12
      let g: number = 207
      let b: number = 255
      // max r is 255; each "step" between 0 and 255 is 12.75 points for 20 steps
      // max g is 255; each "step" between 209 and 255 is 2.3 points for 20 steps
      let data: Array<IChartData> = topTwentyWords.map((word: ITopTwentyWords, index: number) => {
        r += 12
        g += 2
        return {
          word: word.word,
          count: word.count,
          color: `rgb(${r}, ${g}, ${b})`,
          fillOpacity: index === 0 ? 1 : 0.4
        }
      })
      let newFrameProps = {
        data: data,
        size: [400, 400],
        margin: 50,
        type: { type: "bar", innerRadius: 200 },
        projection: "radial",
        dynamicColumnWidth: "count",
        oAccessor: "word",
        rAccessor: "count",
        rScaleType: scaleSqrt(),
        // axes: true,
        style: d=> ({ fill: d.color, fillOpacity: d.fillOpacity }),
        oPadding: 10,
        pieceHoverAnnotation: true,
        tooltipContent: () => {
          return (<div></div>)
        },
        customHoverBehavior: d => {
          setHoveredOn(d)
        }
      }
      setFrameProps(newFrameProps)
    }
  }, [twitterData, topTwentyWords])

  useEffect(() => {
    let index: number | undefined;
    if(frameProps && frameProps.data && hoveredOn) {
      for(let i=0;i<frameProps.data.length;i++) {
        if(frameProps.data[i].word === hoveredOn.word) {
          index = i
        }
      }
    }
    handleHover(
      hoveredOn
      ? {
          word: hoveredOn.word,
          count: hoveredOn.count,
          index: index
        }
      : undefined
    )
  }, [hoveredOn, handleHover, frameProps])

  useEffect(() => {
    handleCycleOn(cycleOn)
  }, [cycleOn, handleCycleOn])

  useEffect(() => {
    setCycleOn({
      ...topTwentyWords[cycleTweet],
      index: cycleTweet
    })
    
  }, [cycleTweet, topTwentyWords])

  useEffect(() => {
    let timerCount = 0;
    const timer = setInterval(() => {
      timerCount++;
      setCycleTweet(timerCount)
      if(timerCount >= 20) clearInterval(timer)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <OrdinalFrame {...frameProps} />
  )
})

export default Chart;