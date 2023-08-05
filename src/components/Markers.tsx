import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Marker, Point } from "react-simple-maps";
import { Translation } from "../data/data";
import {
  MARKER_1,
  MARKER_2,
  MARKER_3,
  MARKER_4,
  MARKER_5,
  MARKER_STROKE,
  MARKER_STROKE_HL,
} from "../data/colors";
import { uniq } from "lodash";
import styled from "styled-components";

type CityMarkersProps = {
  cities: Record<string, Point>;
  data: Record<string, Translation[]>;
  selectedCity: string | undefined;
  setSelectedCity: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const TOP_N = 5;

const COLORS_HIT_MAP = [MARKER_1, MARKER_2, MARKER_3, MARKER_4, MARKER_5];

if (COLORS_HIT_MAP.length !== TOP_N) {
  throw Error("hit map is outdated");
}

const getHitColor = (value: number, topN: number[]): string => {
  for (let i = 0; i < TOP_N - 1; i++) {
    if (value >= topN[i]) {
      return COLORS_HIT_MAP[i];
    }
  }
  return COLORS_HIT_MAP[TOP_N - 1];
};

const StyledCircle = styled.circle<{ selected: boolean; hovered: boolean }>`
  stroke: ${({ selected, hovered }) =>
    selected || hovered ? MARKER_STROKE_HL : MARKER_STROKE};
  stroke-width: 2px;
  cursor: pointer;
`;

const StyledText = styled.text`
  stroke: ${MARKER_5};
  fill: ${MARKER_1};
  font-size: 1.4rem;
  stroke-width: 4px;
  font-weight: bold;
  paint-order: stroke;
  stroke-linejoin: round;
  cursor: pointer;
`;

export const CityMarkers = ({
  cities,
  data,
  selectedCity,
  setSelectedCity,
}: CityMarkersProps) => {
  const refsByCity = useRef<Record<string, SVGCircleElement | null>>({});
  const [hoveredCity, setHoveredCity] = useState<string | undefined>();

  const setRef = useCallback(
    (element: SVGCircleElement | null, key: string) => {
      refsByCity.current[key] = element;
    },
    [],
  );

  const handleCircleHover = useCallback((event: Event) => {
    const circle = event.target as SVGCircleElement;
    const city = circle.id;
    setHoveredCity(city);
  }, []);

  const handleCircleHoverStop = useCallback(
    (event: Event) => setHoveredCity(undefined),
    [],
  );

  const topLengths = useMemo(
    () =>
      uniq(Object.values(data).map((arr) => arr.length))
        .sort((a, b) => b - a)
        .slice(0, TOP_N),
    [data],
  );

  const getFillColor = useCallback(
    (value: number) => getHitColor(value, topLengths),
    [topLengths],
  );

  const reffedCities = Object.keys(refsByCity);
  useEffect(() => {
    const circles = Object.values(refsByCity.current).filter((c) => c);
    circles.forEach((circle) => {
      circle!.addEventListener("mouseenter", handleCircleHover);
      circle!.addEventListener("mouseleave", handleCircleHoverStop);
    });
    return () => {
      circles.forEach((circle) => {
        circle!.removeEventListener("mouseenter", handleCircleHover);
        circle!.removeEventListener("mouseleave", handleCircleHoverStop);
      });
    };
  }, [reffedCities, handleCircleHover, handleCircleHoverStop]);

  return (
    <>
      {Object.keys(cities).map((city) => (
        <Marker key={`${city}_circle`} coordinates={cities[city]}>
          <StyledCircle
            fill={getFillColor(data[city]?.length || 0)}
            selected={city === hoveredCity}
            hovered={city === selectedCity}
            onClick={() => setSelectedCity(city)}
            id={city}
            ref={(element) => setRef(element, city)}
            r={8}
          />
          ;
        </Marker>
      ))}
      {hoveredCity && (
        <Marker key={`${hoveredCity}_hover`} coordinates={cities[hoveredCity]}>
          <StyledText x={-8} y={-12}>
            {hoveredCity} · {data[hoveredCity]?.length || 0}
          </StyledText>
        </Marker>
      )}
    </>
  );
};
