import styled, {css} from "styled-components";
import {MARKER_4, PANE_COLOR, SEA_COLOR} from "../data/colors";
import {Link} from "react-router-dom";
import {Proposition} from "./Proposition";

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: auto;
    margin-bottom: 1rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    color: white;
    padding: 4rem 1rem;
    @media only screen and (max-width: 500px) {
        padding: 2rem 1rem;
    }
    background-color: ${SEA_COLOR};
    gap: 1rem;
    text-align: center;
`;

const Title = styled.div`
    font-size: 2rem;
    @media only screen and (max-width: 500px) { 
        font-size: 1.5rem;
    }
    font-weight: bold;
`;

const SubTitle = styled.div`
    font-size: 1.2rem;
    @media only screen and (max-width: 500px) {
        font-size: 1.1rem;
    }
    color: ${PANE_COLOR};
`;

const LinkStyle = css`
    font-size: 1.5rem;
    @media only screen and (max-width: 500px) {
        font-size: 1.2rem;
    }
    color: ${MARKER_4};
`

const StyledAnchor = styled.a`
    ${LinkStyle};
`;

const StyledLink = styled(Link)`
    ${LinkStyle};
`;

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
`

const PropositionVer1PathPrefix = "/b2p5/ver1/p";
const PropositionVer1Text = [
    "If a straight line is cut into equal and unequal segments,",
    "then the rectangle contained by the unequal segments of the whole,",
    "together with the square on the straight line between the points of section,",
    "equals the square on the half."
];
const PropositionVer1Mapping: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    13: 2,
    14: 2,
    15: 2,
    16: 2,
    17: 2,
    18: 2,
    19: 2,
    20: 2,
    21: 2,
    22: 2,
    23: 2,
    24: 3,
    25: 3,
    26: 3,
    27: 3,
    28: 3,
    29: 3,
    30: 3,
    31: 3,
    32: 3,
    33: 3,
    34: 3,
    35: 3,
    36: 3,
    37: 4,
}

export const Sep24Page = () => {
    return (
        <Wrapper>
        <Container>
            <Title>Transformation of Mathematical Knowledge</Title>
            <SubTitle>German Editions of Euclid’s Elements in the 16th-17th Centuries</SubTitle>
            <div>Mia Joskowicz, September 2024</div>
            <div/>
            <div/>
            <StyledAnchor href="/presentation/TransformationOfMathematicalKnowledge.pdf" target="_blank" rel="noopener noreferrer">Presentation Slides</StyledAnchor>
            <div/>
            <div/>
            <Block>
                <StyledLink to="/">Elements Timeline Map</StyledLink>
                <div>Best viewed on desktop</div>
            </Block>
            <div/>
            <div/>
            <Proposition title="Proposition 5, Book II" description={PropositionVer1Text} stepImagePrefix={PropositionVer1PathPrefix} stepsToDescriptionIndex={PropositionVer1Mapping}/>
        </Container>
        </Wrapper>
    );
};
