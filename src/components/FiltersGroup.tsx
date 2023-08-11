import { FLOATING_CITY, Translation } from "../data/data";
import React, { useMemo } from "react";
import { capitalize, get, uniq } from "lodash";
import { Filter, FilterValue } from "./Filter";
import { ReactComponent as Deco } from "../svg/deco2.svg";
import styled from "styled-components";
import { FILTER_INDEXED_ID } from "./Tour";

type FiltersGroupProps = {
  data: Translation[];
  fields: Partial<keyof Translation>[];
  filters: Record<string, FilterValue[] | undefined>;
  setFilters: React.Dispatch<
    React.SetStateAction<Record<string, FilterValue[] | undefined>>
  >;
};

const StyledDeco = styled(Deco)``;

const toOption = (v: string) => ({ label: v, value: v });

export const FiltersGroup = ({
  data,
  fields,
  filters,
  setFilters,
}: FiltersGroupProps) => {
  const optionsByFilter = useMemo(() => {
    const byFilter: Record<string, FilterValue[]> = {};
    fields.forEach((field) => {
      if (field === "books") {
        byFilter[field] = uniq(
          data
            .flatMap((t) => t.booksExpanded)
            .sort((a, b) => a - b)
            .map((n) => n.toString()),
        ).map(toOption);
      } else {
        byFilter[field] = uniq(
          data
            .map((t) => get(t, field)?.toString() || "")
            .filter((v) => v && v !== FLOATING_CITY)
            .sort(),
        ).map(toOption);
      }
    });
    return byFilter;
  }, [data, fields]);

  return (
    <>
      {fields.map((field, index) => (
        <Filter
          id={`${FILTER_INDEXED_ID}${index}`}
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
