import React, { useCallback } from "react";
import { MdMyLocation, MdZoomInMap, MdZoomOutMap } from "react-icons/md";
import styled from "styled-components";
import { ButtonStyle, SEA_COLOR, TRANSPARENT_WHITE } from "../data/colors";
import { TOOLTIP_RESET, TOOLTIP_ZOOMIN, TOOLTIP_ZOOMOUT } from "./Tooltips";

type ZoomControlsProps = {
  className?: string;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  maxZoom: number;
  resetCenter: () => void;
};

const StyledDiv = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  div {
    ${ButtonStyle};
  }
`;

export const ZoomControls = ({
  className,
  setZoom,
  maxZoom,
  resetCenter,
}: ZoomControlsProps) => {
  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 1, maxZoom));
  }, [maxZoom, setZoom]);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 1, 1));
  }, [setZoom]);

  return (
    <StyledDiv className={className}>
      <div
        onClick={resetCenter}
        data-tooltip-id={TOOLTIP_RESET}
        data-tooltip-content="Reset"
      >
        <MdMyLocation />
      </div>
      <div
        onClick={handleZoomIn}
        data-tooltip-id={TOOLTIP_ZOOMIN}
        data-tooltip-content="Zoom-In"
      >
        <MdZoomInMap />
      </div>
      <div
        onClick={handleZoomOut}
        data-tooltip-id={TOOLTIP_ZOOMOUT}
        data-tooltip-content="Zoom-Out"
      >
        <MdZoomOutMap />
      </div>
    </StyledDiv>
  );
};
