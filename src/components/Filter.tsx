import Select from "react-select";
import {
  LAND_COLOR,
  PANE_COLOR,
  SEA_COLOR,
  TRANSPARENT_BLACK,
  TRANSPARENT_WHITE,
} from "../data/colors";
import styled from "styled-components";
import { Translation } from "../data/data";
import { MdQuestionMark } from "react-icons/md";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useHover } from "usehooks-ts";
import { useElementSize } from "../data/useElementSize";
import { Link } from "./Link";
import { Tooltip } from "react-tooltip";

export type FilterValue = { label: string; value: string };

type FilterProps = {
  id: string;
  field: keyof Translation;
  label: string;
  include: boolean;
  setInclude: (include: boolean) => void;
  value: FilterValue[] | undefined;
  setValue: (value: readonly FilterValue[] | undefined) => void;
  options: readonly FilterValue[];
};

const HelpTipButton = styled.div`
  margin: 0 -0.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${TRANSPARENT_WHITE};
  color: ${SEA_COLOR};
  cursor: pointer;
  height: 0.5rem;
  width: 0.5rem;
  font-size: 0.8rem;
`;

const StyledQuestionMark = styled(MdQuestionMark)`
  transform: translate(-2px, -2px);
`;

const HelpFloatingTip = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 1rem;
  z-index: 100;
  a {
    color: ${PANE_COLOR};
  }
`;

const HelpTip = ({ children }: { children: ReactElement }) => {
  const HELP_TIP_ID = "help-tip";
  return (
    <>
      <HelpTipButton id={HELP_TIP_ID}>
        <StyledQuestionMark />
      </HelpTipButton>
      <Tooltip anchorSelect={`#${HELP_TIP_ID}`} clickable>
        <HelpFloatingTip>{children}</HelpFloatingTip>
      </Tooltip>
    </>
  );
};

const OptionalHelpTip = ({ field }: { field: keyof Translation }) => {
  if (field === "type") {
    return (
      <HelpTip>
        <div>
          Classification according to{" "}
          <Link
            url="http://www.bibsoc.org.uk/sites/bibsoc.org.uk/files/Euclid_v1.pdf"
            text="Euclid in print"
          />
        </div>
      </HelpTip>
    );
  }
  return undefined;
};

const Switch = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  height: fit-content;

  div:first-child {
    border-radius: 5px 0 0 5px;
  }

  div:last-child {
    border-radius: 0 5px 5px 0;
  }
`;

const SwitchOption = styled.div<{ selected: boolean }>`
  cursor: pointer;
  padding: 4px;
  color: white;
  background-color: ${({ selected }) => (selected ? SEA_COLOR : LAND_COLOR)};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  margin-bottom: -0.5rem;
`;

const Filler = styled.div`
  width: 100%;
`;

export const Filter = ({
  id,
  field,
  label,
  value,
  setValue,
  options,
  include,
  setInclude,
}: FilterProps) => {
  return (
    <>
      <Row>
        <div className="gothic">{label}</div>
        <OptionalHelpTip field={field} />
        <Filler />
        <Switch>
          <SwitchOption
            selected={include}
            onClick={() => setInclude(true)}
            title="Include only selected values"
          >
            Include
          </SwitchOption>
          <SwitchOption
            selected={!include}
            onClick={() => setInclude(false)}
            title="Exclude all selected values"
          >
            Exclude
          </SwitchOption>
        </Switch>
      </Row>
      <Select
        id={id}
        value={value}
        options={options}
        isMulti
        onChange={(value) => setValue(value)}
        styles={{
          control: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: isFocused ? `0 0 0 1px ${SEA_COLOR}` : undefined,
            borderColor: isFocused ? SEA_COLOR : undefined,
            ":hover": {
              ...styles[":hover"],
              borderColor: SEA_COLOR,
            },
          }),
          option: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: isFocused ? LAND_COLOR : undefined,
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            ":hover": {
              backgroundColor: SEA_COLOR,
              color: "white",
            },
          }),
        }}
      />
    </>
  );
};
