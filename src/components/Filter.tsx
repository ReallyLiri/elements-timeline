import Select from "react-select";

export type FilterValue = { label: string; value: string };

type FilterProps = {
  label: string;
  value: FilterValue[] | undefined;
  setValue: (value: readonly FilterValue[] | undefined) => void;
  options: readonly FilterValue[];
};

export const Filter = ({ label, value, setValue, options }: FilterProps) => {
  return (
    <>
      <div className="gothic">{label}</div>
      <Select
        value={value}
        options={options}
        isMulti
        onChange={(value) => setValue(value)}
      />
    </>
  );
};
