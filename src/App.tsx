import React, { useEffect, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Point,
  ZoomableGroup,
} from "react-simple-maps";
import styled from "styled-components";
import { loadCitiesAsync, loadDataAsync, Translation } from "./data/data";
import { groupBy, isEmpty } from "lodash";
import { CityMarkers } from "./components/Markers";
import { ZoomControls } from "./components/ZoomControls";
import { useElementSize } from "./data/useElementSize";
import { useWindowSize } from "usehooks-ts";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;

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

const StyledZoomControls = styled(ZoomControls)`
  position: relative;
  left: 32px;
  bottom: 64px;
`;

const MapSection = styled.div`
  width: 100%;
  height: 100vh;
`;

const MAX_ZOOM = 10;
const DEFAULT_POSITION: Point = [12, 49.3];

const App = () => {
  const { height } = useWindowSize();
  const [data, setData] = useState<Translation[]>([]);
  const [cities, setCities] = useState<Record<string, Point>>({});
  const [zoom, setZoom] = useState<number>(1);
  const [mapSectionRef, { width }, refreshSize] = useElementSize();
  const [position, setPosition] = useState<Point>(DEFAULT_POSITION);
  const [selectedCity, setSelectedCity] = useState<string>();

  useEffect(() => {
    loadDataAsync().then(setData);
    loadCitiesAsync().then(setCities);
  }, []);

  const filteredTranslations = data; // TODO
  const translationByCity: Record<string, Translation[]> = useMemo(
    () => groupBy(filteredTranslations, (t) => t.city),
    [filteredTranslations],
  );

  useEffect(() => {
    refreshSize();
  }, [refreshSize, selectedCity]);

  return (
    <Wrapper>
      <div>Filter</div>
      <MapSection ref={mapSectionRef}>
        <MapWrapper>
          <ComposableMap
            height={height}
            width={width}
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-40.0, -48.0, 0],
              scale: 2200,
            }}
          >
            <ZoomableGroup
              zoom={zoom}
              maxZoom={MAX_ZOOM}
              center={position}
              onMoveEnd={(e) => setPosition(e.coordinates)}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              <CityMarkers
                cities={cities}
                data={translationByCity}
                setSelectedCity={setSelectedCity}
              />
            </ZoomableGroup>
          </ComposableMap>
        </MapWrapper>
        <StyledZoomControls
          setZoom={setZoom}
          maxZoom={MAX_ZOOM}
          resetCenter={() => setPosition(DEFAULT_POSITION)}
        />
      </MapSection>
      {!isEmpty(selectedCity) && <div>{selectedCity}</div>}
    </Wrapper>
  );
};

export default App;
