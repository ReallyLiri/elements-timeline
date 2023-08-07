import React, { useEffect, useMemo, useState } from "react";
import { Point } from "react-simple-maps";
import styled from "styled-components";
import { loadCitiesAsync, loadDataAsync, Translation } from "./data/data";
import { groupBy, isEmpty, uniqueId } from "lodash";
import { CityMarkers } from "./components/Markers";
import { ZoomControls } from "./components/ZoomControls";
import { useElementSize } from "./data/useElementSize";
import { useWindowSize } from "usehooks-ts";
import {
  LAND_COLOR,
  PANE_BORDER,
  PANE_COLOR,
  SEA_COLOR,
  TRANSPARENT_WHITE,
} from "./data/colors";
import { MdClose, MdDoubleArrow } from "react-icons/md";
import {
  TOOLTIP_CLOSE_DETAILS,
  TOOLTIP_FILTERS_HIDE,
  TOOLTIP_FILTERS_SHOW,
} from "./components/Tooltips";
import { CitiesMap, DEFAULT_POSITION, MAX_ZOOM } from "./components/CitiesMap";
import { Timeline } from "./components/Timeline";

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
    background-color: ${SEA_COLOR};
  }

  path {
    fill: ${LAND_COLOR};
  }

=
`;

const ControlsRow = styled.div`
  position: relative;
  left: 2rem;
  bottom: 4rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const MapSection = styled.div`
  width: 100%;
  height: 100vh;
`;

const ExpandFiltersButton = styled.div`
  position: relative;
  width: fit-content;
  height: 0;
  left: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  cursor: pointer;

  svg {
    background-color: ${TRANSPARENT_WHITE};
    border-radius: 20%;
    color: ${SEA_COLOR};
  }
`;

const CollapseFiltersButton = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 20%;
  background-color: ${TRANSPARENT_WHITE};
  color: ${SEA_COLOR};
  align-self: center;
`;

const MdDoubleArrowFlipped = styled(MdDoubleArrow)`
  transform: rotate(180deg);
`;

const Pane = styled.div<{ borderRight: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: auto;
  width: fit-content;
  min-width: 10%;
  background-color: ${PANE_COLOR};
  padding: 1rem;
  ${({ borderRight }) =>
    borderRight ? "border-right" : "border-left"}: 2px ${PANE_BORDER} solid;
`;

const App = () => {
  const { height } = useWindowSize();
  const [data, setData] = useState<Translation[]>([]);
  const [cities, setCities] = useState<Record<string, Point>>({});
  const [zoom, setZoom] = useState<number>(1);
  const [mapSectionRef, { width }, refreshSize] = useElementSize();
  const [position, setPosition] = useState<Point>(DEFAULT_POSITION);
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [filterOpen, setFilterOpen] = useState<boolean>(true);
  const [range, setRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    loadDataAsync().then(setData);
    loadCitiesAsync().then(setCities);
  }, []);

  const [minYear, maxYear] = useMemo(() => {
    const years = data.map((t) => t.year);
    return [Math.min(...years), Math.max(...years)];
  }, [data]);

  const filteredTranslations = useMemo(
    () =>
      range[0] > 0 && range[1] > 0
        ? data.filter((t) => t.year >= range[0] && t.year <= range[1])
        : data,
    [data, range],
  );
  const translationByCity: Record<string, Translation[]> = useMemo(
    () => groupBy(filteredTranslations, (t) => t.city),
    [filteredTranslations],
  );

  useEffect(() => {
    refreshSize();
  }, [refreshSize, selectedCity, filterOpen]);

  return (
    <Wrapper>
      {filterOpen && (
        <Pane borderRight={true}>
          <CollapseFiltersButton
            onClick={() => setFilterOpen(false)}
            data-tooltip-id={TOOLTIP_FILTERS_HIDE}
            data-tooltip-content="Hide Filters"
          >
            <MdDoubleArrowFlipped />
          </CollapseFiltersButton>
          <div>Filter TBD</div>
        </Pane>
      )}
      <MapSection ref={mapSectionRef}>
        {!filterOpen && (
          <ExpandFiltersButton
            onClick={() => setFilterOpen(true)}
            data-tooltip-id={TOOLTIP_FILTERS_SHOW}
            data-tooltip-content="Show Filters"
          >
            <MdDoubleArrow />
          </ExpandFiltersButton>
        )}
        <MapWrapper>
          <CitiesMap
            height={height}
            width={width}
            zoom={zoom}
            position={position}
            setPosition={setPosition}
            markers={
              <CityMarkers
                cities={cities}
                data={translationByCity}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
            }
          />
        </MapWrapper>
        <ControlsRow>
          <ZoomControls
            setZoom={setZoom}
            maxZoom={MAX_ZOOM}
            resetCenter={() => {
              setPosition(DEFAULT_POSITION);
              setZoom(1);
            }}
          />
          <div />
          <Timeline
            minYear={minYear}
            maxYear={maxYear}
            rangeChanged={(from, to) => setRange([from, to])}
          />
        </ControlsRow>
      </MapSection>
      {!isEmpty(selectedCity) && (
        <Pane borderRight={false}>
          <CollapseFiltersButton
            onClick={() => setSelectedCity(undefined)}
            data-tooltip-id={TOOLTIP_CLOSE_DETAILS}
            data-tooltip-content="Close"
          >
            <MdClose />
          </CollapseFiltersButton>
          <div>{selectedCity}</div>
          {translationByCity[selectedCity!].map((translation) => (
            <div key={uniqueId()}>
              {translation.type} {translation.year}
            </div>
          ))}
        </Pane>
      )}
    </Wrapper>
  );
};

export default App;
