import React, { useEffect, useMemo, useState } from "react";
import { Point } from "react-simple-maps";
import styled from "styled-components";
import { loadCitiesAsync, loadDataAsync, Translation } from "./data/data";
import { get, groupBy, isEmpty } from "lodash";
import { CityMarkers } from "./components/Markers";
import { ZoomControls } from "./components/ZoomControls";
import { useElementSize } from "./data/useElementSize";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import {
  LAND_COLOR,
  MARKER_STROKE,
  PANE_BORDER,
  PANE_COLOR,
  PANE_COLOR_ALT,
  SEA_COLOR,
  TRANSPARENT_WHITE,
} from "./data/colors";
import { MdClose, MdDoubleArrow } from "react-icons/md";
import {
  TOOLTIP_CLOSE_CITY_DETAILS,
  TOOLTIP_CLOSE_RECORD_DETAILS,
  TOOLTIP_FILTERS_HIDE,
  TOOLTIP_FILTERS_SHOW,
} from "./components/Tooltips";
import { CitiesMap, DEFAULT_POSITION, MAX_ZOOM } from "./components/CitiesMap";
import { Timeline } from "./components/Timeline";
import { getTopLengths, HeatLegend } from "./components/HeatMap";
import { FiltersGroup } from "./components/FiltersGroup";
import { FilterValue } from "./components/Filter";
import { CityDetails } from "./components/CityDetails";
import { RecordDetails } from "./components/RecordDetails";

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
  align-self: start;
`;

const MdDoubleArrowFlipped = styled(MdDoubleArrow)`
  transform: rotate(180deg);
`;

const Pane = styled.div<{
  borderRight: boolean;
  widthPercentage?: number;
  backgroundColor?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 2rem);
  width: ${({ widthPercentage }) => widthPercentage || 20}%;
  overflow-x: auto;
  background-color: ${({ backgroundColor }) => backgroundColor || PANE_COLOR};
  padding: 1rem;
  margin-bottom: 10rem;
  ${({ borderRight }) =>
    borderRight ? "border-right" : "border-left"}: 2px ${PANE_BORDER} solid;
`;

const filterRecord = (
  t: Translation,
  range: [number, number],
  filters: Record<string, FilterValue[] | undefined>,
): boolean => {
  if (!t.year || !t.city) {
    return false;
  }
  if (
    range[0] > 0 &&
    range[1] > 0 &&
    (t.year < range[0] || t.year > range[1])
  ) {
    return false;
  }
  return Object.keys(filters).every((field) => {
    const values = filters[field]?.map((v) => v.value);
    return isEmpty(values) || values!.includes(get(t, field).toString());
  });
};

const App = () => {
  const { height, width: windowWidth } = useWindowSize();
  const [data, setData] = useState<Translation[]>([]);
  const [cities, setCities] = useState<Record<string, Point>>({});
  const [zoom, setZoom] = useState<number>(1);
  const [mapSectionRef, { width: mapWidth }, refreshSize] = useElementSize();
  const [position, setPosition] = useState<Point>(DEFAULT_POSITION);
  const [selectedCity, setSelectedCity] = useLocalStorage<string | undefined>(
    "selected-city",
    undefined,
  );
  const [selectedRecordId, setSelectedRecordId] = useLocalStorage<
    string | undefined
  >("selected-record", undefined);
  const [filterOpen, setFilterOpen] = useState<boolean>(true);
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const [filters, setFilters] = useLocalStorage<
    Record<string, FilterValue[] | undefined>
  >("filters", {});

  useEffect(() => {
    loadDataAsync().then(setData);
    loadCitiesAsync().then(setCities);
  }, []);

  const [minYear, maxYear] = useMemo(() => {
    const years = data.filter((t) => !!t.year).map((t) => t.year!!);
    return [Math.min(...years), Math.max(...years)];
  }, [data]);

  const filteredTranslations = useMemo(
    () => data.filter((t) => filterRecord(t, range, filters)),
    [data, range, filters],
  );

  const translationByCity: Record<string, Translation[]> = useMemo(
    () => groupBy(filteredTranslations, (t) => t.city),
    [filteredTranslations],
  );

  const selectedRecord = useMemo(
    () =>
      selectedRecordId
        ? data.filter((d) => d.id === selectedRecordId)[0]
        : undefined,
    [data, selectedRecordId],
  );

  useEffect(() => {
    refreshSize();
  }, [refreshSize, selectedCity, selectedRecordId, filterOpen]);

  return (
    <Wrapper>
      {filterOpen && (
        <Pane borderRight={true} widthPercentage={16}>
          <CollapseFiltersButton
            onClick={() => setFilterOpen(false)}
            data-tooltip-id={TOOLTIP_FILTERS_HIDE}
            data-tooltip-content="Hide Filters"
          >
            <MdDoubleArrowFlipped />
          </CollapseFiltersButton>
          <FiltersGroup
            data={data}
            fields={["city", "type", "language", "translator"]}
            filters={filters}
            setFilters={setFilters}
          />
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
            width={mapWidth}
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
        <HeatLegend
          offsetRight={
            Math.min(
              (selectedCity ? 1.2 : 0) + (selectedRecord ? 1.9 : 0),
              2.6,
            ) *
            0.14 *
            windowWidth
          }
          total={filteredTranslations?.length || 0}
        />
      </MapSection>
      {!isEmpty(selectedCity) && (
        <Pane borderRight={false} backgroundColor={PANE_COLOR_ALT}>
          <CollapseFiltersButton
            onClick={() => setSelectedCity(undefined)}
            data-tooltip-id={TOOLTIP_CLOSE_CITY_DETAILS}
            data-tooltip-content="Close"
          >
            <MdClose />
          </CollapseFiltersButton>
          <CityDetails
            city={selectedCity!}
            data={translationByCity[selectedCity!]}
            selectedRecordId={selectedRecordId}
            setSelectedRecordId={setSelectedRecordId}
          />
        </Pane>
      )}
      {!isEmpty(selectedRecord) && (
        <Pane borderRight={false} widthPercentage={40}>
          <CollapseFiltersButton
            onClick={() => setSelectedRecordId(undefined)}
            data-tooltip-id={TOOLTIP_CLOSE_RECORD_DETAILS}
            data-tooltip-content="Close"
          >
            <MdClose />
          </CollapseFiltersButton>
          <RecordDetails data={selectedRecord} />
        </Pane>
      )}
    </Wrapper>
  );
};

export default App;
