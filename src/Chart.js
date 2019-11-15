import React, { useState, useEffect } from "react"
import OrdinalFrame from "semiotic/lib/OrdinalFrame"
import AnnotationCalloutElbow from "react-annotation/lib/Types/AnnotationCalloutElbow"

const Chart = (() => {
  const [twitterData, setTwitterData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('');
      console.log(response)
    }
    fetchData();
  }, [])


  const frameProps = {
    data: [
      {
        word: "Augmented Reality",
        count: 50,
        color: '#00D1FF'
      },
      {
        word: "Virtual Reality",
        count: 43,
        color: '#52E0FF'
      },
      {
        word: "Wearable Tech",
        count: 27,
        color: '#89EAFF'
      },
      {
        word: "Technology",
        count: 12,
        color: '#BEF3FF'
      },
      {
        word: "AR",
        count: 3,
        color: '#FFFFFF'
      }
    ],
    size: [400, 400],
    margin: 50,
    type: { type: "bar", innerRadius: 200 },
    projection: "radial",
    dynamicColumnWidth: "count",
    oAccessor: "word",
    // style: { fill: "#00D1FF", stroke: "#0A111C"},
    style: d=> ({ fill: d.color }),
    oPadding: 10,
    // pieceHoverAnnotation: true,
    // hoverAnnotation: true,
    // oLabel: d => <text fontSize={16} dx={-15} dy={-20}>{d}</text>,
    // oLabel: { label: true, orient: "stem", padding: -5 }
    annotations: [
      {
        dx: 70,
        dy: 50,
        x: 350,
        color: "#FFFFFF",
        type: AnnotationCalloutElbow,
        word: "Augmented Reality",
        count: 50,
        note: { title: "Augmented Reality" }
      },
      {
        dx: 70,
        dy: 50,
        x: 350,
        color: "#FFFFFF",
        type: AnnotationCalloutElbow,
        word: "Virtual Reality",
        count: 43,
        note: { title: "Virtual Reality" }
      }
    ],
    // annotationSettings: {
    //   layout: {
    //     type: "marginalia",
    //     orient: "nearest",
    //     characterWidth: 8,
    //     lineWidth: 20,
    //     padding: 2,
    //     iterations: 1000,
    //     pointSizeFunction: () => 2
    //   }
    // }
  }

  return (<OrdinalFrame {...frameProps} />)
})

export default Chart;