import React, { useCallback } from "react";
import { MdMyLocation, MdZoomInMap, MdZoomOutMap } from "react-icons/md";
import styled from "styled-components";

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
    height: 24px;
    width: 24px;
    font-size: 24px;
    background-color: rgba(255, 255, 255, 0.65);
    color: #465966;
    border-radius: 20%;
    padding: 0.4rem;
    cursor: pointer;
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
      <div onClick={resetCenter} title="Re-Center">
        <MdMyLocation />
      </div>
      <div onClick={handleZoomIn} title="Zoom-In">
        <MdZoomInMap />
      </div>
      <div onClick={handleZoomOut} title="Zoom-Out">
        <MdZoomOutMap />
      </div>
    </StyledDiv>
  );
};
