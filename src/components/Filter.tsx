import Select from "react-select";
import { LAND_COLOR, SEA_COLOR } from "../data/colors";

export type FilterValue = { label: string; value: string };

type FilterProps = {
  id: string;
  label: string;
  value: FilterValue[] | undefined;
  setValue: (value: readonly FilterValue[] | undefined) => void;
  options: readonly FilterValue[];
};

export const Filter = ({
  id,
  label,
  value,
  setValue,
  options,
}: FilterProps) => {
  return (
    <>
      <div className="gothic">{label}</div>
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
