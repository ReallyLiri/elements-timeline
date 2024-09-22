import styled from "styled-components";
import { MARKER_4, PANE_COLOR, SEA_COLOR } from "../data/colors";
import { Link } from "react-router-dom";
import { Proposition, PropositionStep } from "./Proposition";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
  width: 100vw;
  color: white;
  padding: 6rem 0;
  background-color: ${SEA_COLOR};
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  color: ${PANE_COLOR};
`;

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  color: ${MARKER_4};
`;

const PropositionVer1PathPrefix = "/b2p5/ver1/";
const PropositionVer1: PropositionStep[] = [
  {
    text: "Proposition 1: A line segment can be extended indefinitely in a straight line.",
    img: [
      PropositionVer1PathPrefix + "p1.png",
      PropositionVer1PathPrefix + "p2.png",
      PropositionVer1PathPrefix + "p3.png",
    ],
  },
  {
    text: "",
    img: [
      PropositionVer1PathPrefix + "p4.png",
      PropositionVer1PathPrefix + "p5.png",
      PropositionVer1PathPrefix + "p6.png",
      PropositionVer1PathPrefix + "p7.png",
      PropositionVer1PathPrefix + "p8.png",
    ],
  },
  {
    text: "",
    img: [
      PropositionVer1PathPrefix + "p9.png",
      PropositionVer1PathPrefix + "p10.png",
      PropositionVer1PathPrefix + "p11.png",
    ],
  },
  {
    text: "",
    img: [
      PropositionVer1PathPrefix + "p12.png",
      PropositionVer1PathPrefix + "p13.png",
      PropositionVer1PathPrefix + "p14.png",
      PropositionVer1PathPrefix + "p15.png",
      PropositionVer1PathPrefix + "p16.png",
      PropositionVer1PathPrefix + "p17.png",
      PropositionVer1PathPrefix + "p18.png",
      PropositionVer1PathPrefix + "p19.png",
    ],
  },
  {
    text: "",
    img: [
      PropositionVer1PathPrefix + "p20.png",
      PropositionVer1PathPrefix + "p21.png",
      PropositionVer1PathPrefix + "p22.png",
      PropositionVer1PathPrefix + "p23.png",
    ],
  },
  {
    text: "",
    img: [
      PropositionVer1PathPrefix + "p24.png",
      PropositionVer1PathPrefix + "p25.png",
      PropositionVer1PathPrefix + "p26.png",
      PropositionVer1PathPrefix + "p27.png",
      PropositionVer1PathPrefix + "p28.png",
      PropositionVer1PathPrefix + "p29.png",
      PropositionVer1PathPrefix + "p30.png",
      PropositionVer1PathPrefix + "p31.png",
      PropositionVer1PathPrefix + "p32.png",
    ],
  },
  {
    text: "",
    img: PropositionVer1PathPrefix + "p99final.png",
  },
];

export const Sep24Page = () => {
  return (
    <Container>
      <Title>Transformation of Mathematical Knowledge</Title>
      <SubTitle>Mia Joskowicz, September 2024</SubTitle>
      <div />
      <StyledLink to="/">Elements Timeline Map</StyledLink>
      <div />
      <div>Other stuffs?</div>
      <div />
      <Proposition steps={PropositionVer1} />
    </Container>
  );
};
