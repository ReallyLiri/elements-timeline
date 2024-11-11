import styled, {css} from "styled-components";
import {MARKER_4, PANE_COLOR, SEA_COLOR} from "../data/colors";
import {Link} from "react-router-dom";
import {Proposition5Book2V1} from "../sep24/Proposition5Book2V1";

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

export const Nov24Page = () => {
    return (
        <Wrapper>
            <Container>
                <Title>French Translations of Euclid's Elements in the first half of the 17th century</Title>
                <SubTitle>A Study of a Book in the Education Sphere</SubTitle>
                <div>Mia Joskowicz, November 2024</div>
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
                <Proposition5Book2V1/>
            </Container>
        </Wrapper>
    );
};
