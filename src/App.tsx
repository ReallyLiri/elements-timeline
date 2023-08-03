import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Point } from "react-simple-maps"
import styled from "styled-components";
import { useWindowSize } from "usehooks-ts";
import { loadDataAsync, Translation } from "./data";

const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json"

const StyledMap = styled(ComposableMap)`
  svg {
    display: inline-block;
    vertical-align: middle;
  }

  path {
    fill: #2a354d;
  }
`


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

    return (
        <StyledMap
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
                Object.keys(cities).map(cityName => <Marker key={ cityName } coordinates={ cities[cityName] }>
                    <>
                        <circle r={ 8 } fill="#F53"/>
                        <line style={ { stroke: "grey", strokeWidth: 100 } }/>
                        <text style={ {
                            stroke: "white",
                            strokeWidth: "0.5em",
                            fill: "black",
                            paintOrder: "stroke",
                            strokeLinejoin: "round"
                        } }>{ cityName }</text>

                    </>
                </Marker>)
            }
        </StyledMap>
    );
};

// stroke:white; stroke-width:0.5em; fill:black; paint-order:stroke; stroke-linejoin:round"

export default App;
