import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Point } from "react-simple-maps"
import styled from "styled-components";
import { useHover, useWindowSize } from "usehooks-ts";
import { loadDataAsync, Translation } from "./data";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json"

const Wrapper = styled.div`
  svg {
    display: inline-block;
    vertical-align: middle;
    background-color: #465966;
  }

  path {
    fill: #c7b1ae;
  }

  circle {
    stroke: #dec97c;
    stroke-width: 0.2em;
    fill: #433c21;
    cursor: pointer;
  }

  text {
    stroke: #dec97c;
    stroke-width: 0.5em;
    fill: #433c21;
    font-weight: bold;
    paint-order: stroke;
    stroke-linejoin: round;
    cursor: pointer;
  }
`

const CityMarker = ({city}: {city: string}) => {
    const ref = useRef(null)
    const isHover = useHover(ref)
    return <>
            <circle ref={ref} r={ 8 }/>
            {
                isHover && <text x={-8} y={-12}>{ city }</text>
            }
        </>
}


const App = () => {
    const { width, height } = useWindowSize()
    const [, setTranslation] = useState<Translation[]>([])
    const [cities, setCities] = useState<Record<string, Point>>({})

    useEffect(() => {
        loadDataAsync().then(([c, t]) => {
            setCities(c)
            setTranslation(t)
        })
    }, [])

    console.error(Object.keys(cities))

    return (
           <Wrapper>
               <ComposableMap
                   width={ width }
                   height={ height }
                   projection="geoAzimuthalEqualArea"
                   projectionConfig={ {
                       rotate: [-40.0, -48.0, 0],
                       center: [-20, 2],
                       scale: 2600,
                   } }
               >
                   <Geographies geography={ geoUrl }>
                       { ({ geographies }) =>
                           geographies.map((geo) => (
                               <Geography key={ geo.rsmKey } geography={ geo }/>
                           ))
                       }
                   </Geographies>

                   {
                       Object.keys(cities)
                           .map(city => <Marker key={ city } coordinates={ cities[city] }>
                           <CityMarker city={city}/>
                       </Marker>)
                   }
               </ComposableMap>
           </Wrapper>
    );
};

export default App;
