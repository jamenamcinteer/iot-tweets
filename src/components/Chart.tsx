import React, { useState, useEffect } from "react"
import OrdinalFrame from "semiotic/lib/OrdinalFrame"
import { scaleSqrt } from "d3-scale"
import { IFrameProps, IChartData, ITopWord, IChartProps } from "../interfaces/interfaces"

function Chart({ twitterData, topTwentyWords, handleHover, handleCycleOn }: IChartProps) {
  const [frameProps, setFrameProps] = useState<IFrameProps | undefined>(undefined)
  const [hoveredOn, setHoveredOn] = useState<ITopWord | undefined>()
  const [cycleOn, setCycleOn] = useState<ITopWord>(topTwentyWords[0])
  const [cycleWord, setCycleWord] = useState<number>(0)
  const [windowWidth] = useState<number>(window.innerWidth)

  // Set up the frameProps for the chart
  useEffect(() => {
    if(twitterData.length > 0) {
      let r: number = -12
      let g: number = 207
      let b: number = 255
      // The maximum that "r" can be is 255
      // We want to move from an r of 0 to an r of 255 over twenty chart "bars"
      // The distance for each step between 0 and 255 is 12.75 points when the total number of steps is 20 (255 / 20)
      // We'll round this to 12; so we'll be adding 12 to every value of r for each data point
      // Since 12 will be added to the first data point as well, we start with -12 instead of 0

      // The maximum that "g" can be is 255
      // We want to move from a g of 209 to a g of 255 over twenty chart "bars"
      // The distance for each step between 209 and 255 is 2.3 points when the total number of steps is 20 (255 / 209)
      // We'll round this to 2; so we'll be adding 2 to every value of g for each data point
      // Since 2 will be added to the first data point as well, we start with 207 instead of 209

      // "b" never changes
      let data: Array<IChartData> = topTwentyWords.map((word: ITopWord, index: number) => {
        r += 12
        g += 2
        return {
          word: word.word,
          count: word.count,
          color: `rgb(${r}, ${g}, ${b})`, // computed rgb values as described above
          fillOpacity: index === 0 ? 1 : 0.4 // the first item starts as fully opaque, the others start as semi-transparent
        }
      })
      let newFrameProps = {
        data: data,
        size: windowWidth >= 450 ? [400, 400] : [windowWidth, windowWidth], // the max size of the chart is 400x400, but in mobile devices with viewport widths <450, the chart size is based on the window inner width
        margin: 50,
        type: { type: "bar", innerRadius: windowWidth >= 450 ? 200 : (windowWidth - 40) / 2 }, // the max inner radius of the chart is 200, but in mobile devices with viewport widths <450, the inner radius is based on the window inner width
        projection: "radial",
        dynamicColumnWidth: "count",
        oAccessor: "word",
        rAccessor: "count",
        rScaleType: scaleSqrt(),
        // axes: true,
        style: d => ({ fill: d.color, fillOpacity: d.fillOpacity }),
        oPadding: 10,
        pieceHoverAnnotation: true,
        tooltipContent: () => { // this makes the custom hover behavior work, but we don't actually want tooltip content
          return (<div></div>)
        },
        customHoverBehavior: d => {
          setHoveredOn(d)
        },
        customClickBehavior: d => { // need this for mobile, does the same thing that custom hover behavior does in desktop
          setHoveredOn(d)
        }
      }
      setFrameProps(newFrameProps)
    }
  }, [twitterData, topTwentyWords, windowWidth])

  // Let the parent component (MainLayout) know that the user hovered on a chart piece
  useEffect(() => {
    let index: number | undefined
    if(frameProps && frameProps.data && hoveredOn) {
      for(let i: number=0;i<frameProps.data.length;i++) {
        if(frameProps.data[i].word === hoveredOn.word) {
          index = i // grab the index of the hovered item (will be used to select the right node in the document when changing the opacity)
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

  // Let the parent component (MainLayout) know that the highlighted word in the timed cycle has changed
  useEffect(() => {
    handleCycleOn(cycleOn)
  }, [cycleOn, handleCycleOn])

  // Change cycleOn with the top word data and index of the current cycle word
  useEffect(() => {
    setCycleOn({
      ...topTwentyWords[cycleWord],
      index: cycleWord
    })
    
  }, [cycleWord, topTwentyWords])

  // When the component mounts, start a timer that changes the highlighted top word every 1 second
  useEffect(() => {
    let timerCount: number = 0
    const timer: any = setInterval(() => {
      timerCount++
      setCycleWord(timerCount)
      if(timerCount >= 19) timerCount = -1 // reset the cycle to the beginning
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <OrdinalFrame {...frameProps} />
  )
}

export default Chart