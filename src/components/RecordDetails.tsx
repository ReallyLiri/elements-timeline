import { Translation } from "../data/data";
import styled from "styled-components";
import { TRANSPARENT_WHITE } from "../data/colors";

type RecordDetailsProps = {
  data: Translation;
};

const Paragraph = styled.div`
  padding: 0.5rem;
  line-height: 120%;
`;

const Highlight = styled.span`
  font-weight: bolder;
  background-color: ${TRANSPARENT_WHITE};
  width: fit-content;
  padding: 0 2px;
  border-radius: 2px;
`;

export const RecordDetails = ({ data }: RecordDetailsProps) => {
  return (
    <Paragraph>
      A <Highlight>{data.language}</Highlight> translation of type{" "}
      <Highlight>{data.type}</Highlight>. Published in{" "}
      <Highlight>{data.year}</Highlight> at <Highlight>{data.city}</Highlight>{" "}
      by <Highlight>{data.translator}</Highlight>.
    </Paragraph>
  );
};
