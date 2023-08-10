import { Translation } from "../data/data";
import React, { useMemo } from "react";
import { capitalize, get, uniq } from "lodash";
import { Filter, FilterValue } from "./Filter";
import { ReactComponent as Deco } from "../svg/deco2.svg";
import styled from "styled-components";

type FiltersGroupProps = {
  data: Translation[];
  fields: Partial<keyof Translation>[];
  filters: Record<string, FilterValue[] | undefined>;
  setFilters: React.Dispatch<
    React.SetStateAction<Record<string, FilterValue[] | undefined>>
  >;
};

const StyledDeco = styled(Deco)``;

export const FiltersGroup = ({
  data,
  fields,
  filters,
  setFilters,
}: FiltersGroupProps) => {
  const optionsByFilter = useMemo(() => {
    const byFilter: Record<string, FilterValue[]> = {};
    fields.forEach((field) => {
      byFilter[field] = uniq(
        data
          .map((t) => get(t, field)?.toString() || "")
          .filter((v) => v)
          .sort(),
      ).map((v) => ({ label: v, value: v }));
    });
    return byFilter;
  }, [data, fields]);

  return (
    <>
      {fields.map((field) => (
        <Filter
          key={field}
          label={capitalize(field)}
          value={filters[field]}
          setValue={(values) =>
            setFilters((f) => ({
              ...f,
              [field]: values ? [...values] : undefined,
            }))
          }
          options={optionsByFilter[field]}
        />
      ))}
      <StyledDeco />
    </>
  );
};
