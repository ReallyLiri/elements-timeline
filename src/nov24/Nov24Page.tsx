import styled, {css} from "styled-components";
import {MARKER_4, MARKER_5, PANE_COLOR, SEA_COLOR} from "../data/colors";
import {Link, useNavigate} from "react-router-dom";

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: auto;
    margin-bottom: 1rem;
`;

const Container = styled.div`
    display: flex;
    min-height: calc(100vh - 8rem);
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
    cursor: pointer;
`

const StyledAnchor = styled.a`
    ${LinkStyle};
    color: ${MARKER_5};
    font-size: 1.8rem;
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

const Tile = styled.img`
    height: auto;
    width: auto;
    max-width: min(22rem, 92vw);
    cursor: pointer;
`

export const Nov24Page = () => {
    const navigate = useNavigate();
    const pdf = "/presentation/FrenchTranslationsOfEuclidsElementsInTheFirstHalfOfThe17thCentury.pdf"
    return (
        <Wrapper>
            <Container>
                <Title>French Translations of Euclid's Elements in the first half of the 17th century</Title>
                <SubTitle>A Study of a Book in the Education Sphere</SubTitle>
                <div>Mia Joskowicz, November 2024</div>
                <div/>
                <div/>
                <StyledAnchor href={pdf} target="_blank" rel="noopener noreferrer">Presentation Slides</StyledAnchor>
                <Tile src="/presentation/nov24.png" onClick={() => window.open(pdf, "_blank")?.focus()}/>
                <div/>
                <div/>
                <Block>
                    <StyledLink to="/">Elements Timeline Map</StyledLink>
                    <Tile src="/presentation/map.png" onClick={() => navigate('/')}/>
                    <div>Best viewed on desktop</div>
                </Block>
                <div/>
                <div/>
                <Block>
                    <StyledLink to="/sep24">Transformation of Mathematical Knowledge: German Editions of Euclid’s Elements in the 16th-17th Centuries</StyledLink>
                    <div>Talk, September 2024</div>
                </Block>
            </Container>
        </Wrapper>
    );
};
