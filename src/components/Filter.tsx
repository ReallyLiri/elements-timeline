import Select from "react-select";
import { LAND_COLOR, SEA_COLOR } from "../data/colors";
import styled from "styled-components";

export type FilterValue = { label: string; value: string };

type FilterProps = {
  id: string;
  label: string;
  include: boolean;
  setInclude: (include: boolean) => void;
  value: FilterValue[] | undefined;
  setValue: (value: readonly FilterValue[] | undefined) => void;
  options: readonly FilterValue[];
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
          multiValueRemove: (styles, { data }) => ({
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
