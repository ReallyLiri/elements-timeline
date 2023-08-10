import Select from "react-select";

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
      />
    </>
  );
};
