import {useEffect, useState} from "react";
import styled from "styled-components";
import {MARKER_5, PANE_COLOR, SEA_COLOR} from "../data/colors";

type PropositionProps = {
    title: string;
    description: string[];
    stepImagePrefix: string;
    stepsToDescriptionIndex: Record<number, number>;
};

const Title = styled.div`
    font-size: 1.5rem;
    @media only screen and (max-width: 500px) {
        font-size: 1.2rem;
    }
    font-weight: bold;
    color: ${PANE_COLOR};
`;

const StepTitle = styled.div<{ selected: boolean }>`
    text-align: start;
    color: ${(props) => (props.selected ? MARKER_5 : "white")};
    line-height: 1.5rem;
`;

const Descriptions = styled.div`
    font-style: italic;
`

const ButtonsRow = styled.div`
    display: flex;
    gap: 1rem;
`;

const Button = styled.button<{ hide: boolean }>`
    opacity: ${(props) => (props.hide ? 0 : 1)};
    pointer-events: ${(props) => (props.hide ? "none" : "auto")};
    width: 6rem;
    border-radius: 0.5rem;
    background-color: ${PANE_COLOR};
    color: ${SEA_COLOR};
    cursor: pointer;
`;

const Image = styled.img`
    max-height: 20rem;
    height: auto;
    max-width: 100vw;
`;

export const Proposition = ({title, stepImagePrefix, description, stepsToDescriptionIndex}: PropositionProps) => {
    const steps = Object.keys(stepsToDescriptionIndex);
    const [step, setStep] = useState(0);
    const [playing, setPlaying] = useState(true);

    const reset = () => setStep(0);

    useEffect(() => {
        if (!playing) {
            return
        }
        const interval = setInterval(() => {
            setStep((step) => {
                if (step === steps.length - 1) {
                    setPlaying(false);
                    clearInterval(interval);
                    return step;
                }
                return step + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [playing, steps.length]);

    return (
        <>
            <Title>{title}</Title>
            <Descriptions>
                {description.map((text, i) => <StepTitle selected={i === stepsToDescriptionIndex[steps[step] as any as number]}>{text}</StepTitle>)}
            </Descriptions>
            <div>
                <Image src={`${stepImagePrefix}${steps[step]}.png`} alt=""/>
            </div>
            <ButtonsRow>
                <Button hide={false} onClick={() => reset()}>
                    Reset
                </Button>
                <Button hide={step === steps.length - 1} onClick={() => setPlaying(b => !b)}>
                    {playing ? "Pause" : "Play"}
                </Button>
            </ButtonsRow>
        </>
    );
};
