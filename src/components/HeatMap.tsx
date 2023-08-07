import {
  MARKER_1,
  MARKER_2,
  MARKER_3,
  MARKER_4,
  MARKER_5,
  MARKER_STROKE,
  TRANSPARENT_WHITE,
} from "../data/colors";
import { uniq } from "lodash";
import { Translation } from "../data/data";
import React from "react";
import styled from "styled-components";

export const TOP_N = 5;

const COLORS_HEAT_MAP = [MARKER_1, MARKER_2, MARKER_3, MARKER_4, MARKER_5];

if (COLORS_HEAT_MAP.length !== TOP_N) {
  throw Error("hit map is outdated");
}

export const getHeatColor = (value: number, topN: number[]): string => {
  for (let i = 0; i < TOP_N - 1; i++) {
    if (value >= topN[i]) {
      return COLORS_HEAT_MAP[i];
    }
  }
  return COLORS_HEAT_MAP[TOP_N - 1];
};

export const getTopLengths = (data: Record<string, Translation[]>) =>
  uniq(Object.values(data).map((arr) => arr.length))
    .sort((a, b) => b - a)
    .slice(0, TOP_N);

const Legend = styled.div`
  position: absolute;
  right: 1rem;
  bottom: calc(2rem - 4px);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${TRANSPARENT_WHITE};
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Circle = styled.div<{ color: string }>`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ color }) => color};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  padding-bottom: 0.5rem;
`;

export const HeatLegend = ({ topLengths }: { topLengths: number[] }) => (
  <Legend>
    <Title>No. of Records</Title>
    {topLengths.map((len) => (
      <Row key={len}>
        <Circle color={getHeatColor(len, topLengths)} />
        <div>
          {topLengths.length === TOP_N &&
          len === topLengths[topLengths.length - 1]
            ? `${len} or less`
            : len}
        </div>
      </Row>
    ))}
  </Legend>
);
