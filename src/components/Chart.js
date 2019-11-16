import React, { useState, useEffect } from "react"
import OrdinalFrame from "semiotic/lib/OrdinalFrame"
import { scaleSqrt} from "d3-scale"

const Chart = (({ twitterData, topTwentyWords }) => {
  const [frameProps, setFrameProps] = useState({})
  const [hoveredOn, setHoveredOn] = useState()

  useEffect(() => {
    if(twitterData.length > 0) {
      let r = -12
      let g = 207
      let b = 255
      // max r is 255; each "step" between 0 and 255 is 12.75 points for 20 steps
      // max g is 255; each "step" between 209 and 255 is 2.3 points for 20 steps
      let data = topTwentyWords.map(word => {
        r += 12
        g += 2
        return {
          word: word.word,
          count: word.count,
          color: `rgb(${r}, ${g}, ${b})`
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
        style: d=> ({ fill: d.color }),
        oPadding: 10,
        pieceHoverAnnotation: true,
        tooltipContent: d => {
          return (
          <div></div>
        )},
        customHoverBehavior: d => {
          setHoveredOn(d)
        }
      }
      setFrameProps(newFrameProps)
    }
  }, [twitterData, topTwentyWords])

  useEffect(() => {
    if(hoveredOn) {
      console.log(hoveredOn)
    }
    
  }, [hoveredOn])


  return (
    <OrdinalFrame {...frameProps} />
  )
})

export default Chart;