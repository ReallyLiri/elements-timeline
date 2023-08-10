import { Translation } from "../data/data";
import styled from "styled-components";
import { TRANSPARENT_WHITE } from "../data/colors";
import { ReactComponent as Deco } from "../svg/deco1.svg";

type RecordDetailsProps = {
  data: Translation;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

const Highlight = styled.span`
  font-weight: bolder;
  background-color: ${TRANSPARENT_WHITE};
  width: fit-content;
  padding: 0 2px;
  border-radius: 2px;
  margin-left: 0.5rem;
`;

const TopDeco = styled(Deco)``;

const BottomDeco = styled(Deco)`
  transform: rotate(180deg);
  margin-top: 1rem;
`;

const Row = ({ title, value }: { title: string; value: string }) => (
  <div>
    <div className="gothic" title={title}>
      {title}
    </div>
    <Highlight title={value}>{value}</Highlight>
  </div>
);

export const RecordDetails = ({ data }: RecordDetailsProps) => {
  return (
    <Wrapper>
      <TopDeco />
      <Row title="Year" value={data.rawYear} />
      <Row title="Language" value={data.language} />
      <Row title="Translator" value={data.translator} />
      <Row title="City" value={data.rawCity} />
      <Row title="Books" value={data.books} />
      <Row title="Type" value={data.type} />
      <BottomDeco />
    </Wrapper>
  );
};
