import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Point,
} from "react-simple-maps";
import styled from "styled-components";
import { useHover, useWindowSize } from "usehooks-ts";
import { loadCitiesAsync, loadDataAsync, Translation } from "./data/data";
import { groupByMap } from "./data/util";
import { groupBy } from "lodash";
import { CityMarkers } from "./components/Markers";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";

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
`;

const App = () => {
  const { width, height } = useWindowSize();
  const [data, setData] = useState<Translation[]>([]);
  const [cities, setCities] = useState<Record<string, Point>>({});

  useEffect(() => {
    loadDataAsync().then(setData);
    loadCitiesAsync().then(setCities);
  }, []);

  const filteredTranslations = data; // TODO
  const translationByCity: Record<string, Translation[]> = useMemo(
    () => groupBy(filteredTranslations, (t) => t.city),
    [filteredTranslations],
  );

  return (
    <Wrapper>
      <ComposableMap
        width={width}
        height={height}
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-40.0, -48.0, 0],
          center: [-20, 2],
          scale: 2600,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        <CityMarkers cities={cities} data={translationByCity} />
      </ComposableMap>
    </Wrapper>
  );
};

export default App;
