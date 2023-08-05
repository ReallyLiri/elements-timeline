import React, { useCallback, useEffect, useRef, useState } from "react";
import { Marker, Point } from "react-simple-maps";
import { Translation } from "../data/data";

type CityMarkersProps = {
  cities: Record<string, Point>;
  data: Record<string, Translation[]>;
};

export const CityMarkers = ({ cities, data }: CityMarkersProps) => {
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
  }, [handleCircleHover, handleCircleHoverStop]);

  return (
    <>
      {Object.keys(cities).map((city) => (
        <Marker key={`${city}_circle`} coordinates={cities[city]}>
          <circle id={city} ref={(element) => setRef(element, city)} r={8} />;
        </Marker>
      ))}
      {hoveredCity && (
        <Marker key={`${hoveredCity}_hover`} coordinates={cities[hoveredCity]}>
          <text x={-8} y={-12}>
            {hoveredCity} · {data[hoveredCity]?.length || 0}
          </text>
        </Marker>
      )}
    </>
  );
};
