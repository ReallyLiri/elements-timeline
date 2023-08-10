import { Translation } from "../data/data";
import { sortBy } from "lodash";
import React, { useMemo } from "react";
import styled from "styled-components";
import { PANE_COLOR } from "../data/colors";

type CityDetailsProps = {
  city: string;
  data: Translation[];
  selectedRecordId: string | undefined;
  setSelectedRecordId: (selected: string) => void;
};

const Title = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  color: ${PANE_COLOR};
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
  margin-bottom: 1rem;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
`;

const DeLys = styled.span`
  font-size: 2rem;
  padding-bottom: 4px;
`;

const RowTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
  cursor: pointer;
  width: fit-content;
  border-radius: 0.5rem;
  padding: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: ${PANE_COLOR};
  }
`;

export const CityDetails = ({
  city,
  data,
  setSelectedRecordId,
}: CityDetailsProps) => {
  const sortedData = useMemo(() => sortBy(data, "year"), [data]);
  return (
    <>
      <Title className="gothic">{city}</Title>
      <Subtitle>{data?.length || 0} records</Subtitle>
      {sortedData.map((translation) => (
        <>
          <div key={translation.id}>
            <Separator />
            <RowTitle onClick={() => setSelectedRecordId(translation.id)}>
              <div className="gothic">{translation.year}</div>
              <div>
                <span className="gothic">{translation.translator[0]}</span>
                {translation.translator.substring(1)}
              </div>
            </RowTitle>
          </div>
        </>
      ))}
    </>
  );
};
