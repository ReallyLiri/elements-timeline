import { useEffect, useState } from "react";
import styled from "styled-components";
import { PANE_COLOR, SEA_COLOR } from "../data/colors";

export type PropositionStep = {
  text: string;
  img: string | string[];
};

type PropositionProps = {
  steps: PropositionStep[];
};

const StepTitle = styled.div`
  color: ${PANE_COLOR};
`;

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
  height: 20rem;
`;

type AnimatedImageProps = {
  images: string[];
  reset: any;
};

const AnimatedImage = ({ images, reset }: AnimatedImageProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === images.length - 1) {
        clearInterval(interval);
        return;
      }
      setIndex((index + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images.length, index]);

  useEffect(() => {
    if (reset > 0) {
      setIndex(0);
    }
  }, [reset]);

  return <Image src={images[index]} alt="" />;
};

export const Proposition = (props: PropositionProps) => {
  const [step, setStep] = useState(0);
  const currentStep = props.steps[step];
  const [animationState, setAnimationState] = useState(0);
  const isAnimation = Array.isArray(currentStep.img);

  const nextStep = () => setStep(Math.min(step + 1, props.steps.length - 1));
  const prevStep = () => setStep(Math.max(step - 1, 0));
  const resetAnimation = () => setAnimationState((s) => s + 1);

  return (
    <>
      <StepTitle>{currentStep.text || "TODO"}</StepTitle>
      <div>
        {isAnimation ? (
          <AnimatedImage
            images={currentStep.img as string[]}
            reset={animationState}
          />
        ) : (
          <Image src={currentStep.img as string} alt="" />
        )}
      </div>
      <ButtonsRow>
        <Button hide={step === 0} onClick={prevStep}>
          Previous
        </Button>
        <Button hide={!isAnimation} onClick={() => resetAnimation()}>
          Reset Animation
        </Button>
        <Button hide={step === props.steps.length - 1} onClick={nextStep}>
          Next
        </Button>
      </ButtonsRow>
    </>
  );
};
