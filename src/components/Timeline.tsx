import React, { useCallback, useEffect, useRef, useState } from "react";
import RangeSlider from "react-range-slider-input";
import { MdPause, MdPlayArrow } from "react-icons/md";
import styled from "styled-components";
import {
  ButtonStyle,
  RANGE_FILL,
  SEA_COLOR,
  TRANSPARENT_WHITE,
} from "../data/colors";
import { TOOLTIP_TIMELINE_BUTTON } from "./Tooltips";
import { min } from "lodash";
import { useTimeout } from "usehooks-ts";

type TimelineProps = {
  minYear: number;
  maxYear: number;
  rangeChanged: (from: number, to: number) => void;
};

const PlayButton = styled.div`
  ${ButtonStyle};
`;

const StyledRangeSlider = styled(RangeSlider)`
  width: 60%;
`;

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  height: 100%;
  width: 100%;
  align-items: center;

  #range-slider {
    background: ${TRANSPARENT_WHITE};
  }

  #range-slider .range-slider__range {
    background: ${RANGE_FILL};
    transition: height 0.3s;
  }

  #range-slider .range-slider__thumb {
    background: ${RANGE_FILL};
    transition: transform 0.3s;
  }

  #range-slider .range-slider__thumb[data-active] {
    transform: translate(-50%, -50%) scale(1.25);
  }

  #range-slider .range-slider__range[data-active] {
    height: 16px;
  }
`;

const YearLabel = styled.div`
  background-color: ${TRANSPARENT_WHITE};
  padding: 0.5rem;
  border-radius: 4px;
  cursor: default;
  color: ${SEA_COLOR};
`;

const PLAY_STEP_YEARS = 10;
const PLAY_STEP_SEC = 2;

export const Timeline = ({ minYear, maxYear, rangeChanged }: TimelineProps) => {
  const [value, setValue] = useState([0, 0]);
  const [isPlay, setPlay] = useState<boolean>(false);
  const rangeChangedRef = useRef(rangeChanged);

  useEffect(() => {
    setValue([minYear, maxYear]);
  }, [maxYear, minYear]);

  const playStep = useCallback(
    () =>
      setValue(([from, to]) => [Math.min(maxYear, from + PLAY_STEP_YEARS), to]),
    [maxYear],
  );

  useEffect(() => {
    if (!isPlay) {
      return;
    }
    const id = setInterval(playStep, PLAY_STEP_SEC * 1000);
    return () => clearTimeout(id);
  }, [isPlay, playStep]);

  useEffect(() => {
    rangeChangedRef.current(value[0], value[1]);
  }, [rangeChangedRef, value]);

  return (
    <>
      <PlayButton
        onClick={() => setPlay((p) => !p)}
        data-tooltip-id={TOOLTIP_TIMELINE_BUTTON}
        data-tooltip-content={isPlay ? "Pause" : "Play"}
      >
        {isPlay ? <MdPause /> : <MdPlayArrow />}
      </PlayButton>
      <RangeWrapper>
        <YearLabel>{value[0]}</YearLabel>
        {value[0] > 0 && value[1] > 0 && (
          <StyledRangeSlider
            id="range-slider"
            min={minYear}
            max={maxYear}
            value={value}
            onInput={(range: [number, number]) => setValue(range)}
          />
        )}
        <YearLabel>{value[1]}</YearLabel>
      </RangeWrapper>
    </>
  );
};