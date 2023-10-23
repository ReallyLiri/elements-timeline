import Papa from "papaparse";
import { Point } from "react-simple-maps";
import { groupByMap } from "./util";
import { isEmpty, isNil, startCase, trimEnd } from "lodash";

const BLANK_CITY = "n.p.";
const BLANK_YEAR = "n.d.";

type RawTranslation = {
  id: string;
  wClass: string;
  city: string;
  year: string;
  translator: string;
  language: string;
  elementsBooks: string;
  bookSize: string;
  volumesCount: string;
  additionalContent: string | undefined;
};

export type Translation = Omit<
  RawTranslation,
  "year" | "city" | "volumesCount" | "additionalContent" | "wClass"
> & {
  rawCity: string;
  city: string | undefined;
  rawYear: string;
  year: number | undefined;
  class: string;
  booksExpanded: number[];
  volumesCount: number | undefined;
  additionalContent: string[];
};

type City = {
  city: string;
  lon: number;
  lat: number;
};

export const FLOATING_CITY = "-";
const FLOATING_CITY_ENTRY: City = {
  city: FLOATING_CITY,
  lon: -16,
  lat: 42,
};

const parseCsvAsync = async <T>(url: string) => {
  const response = await fetch(url);
  const data = await response.text();
  return Papa.parse<T>(data.trim(), { header: true }).data;
};

export const loadCitiesAsync = async (): Promise<Record<string, Point>> => {
  const cities = await parseCsvAsync<City>("/data/cities.csv");
  cities.push(FLOATING_CITY_ENTRY);
  return groupByMap(
    cities,
    (city) => city.city,
    (city) => [city.lon, city.lat],
  );
};

export const loadDataAsync = async (): Promise<Translation[]> => {
  return (await parseCsvAsync<RawTranslation>("/data/data.csv"))
    .filter((t) => !isEmpty(t.elementsBooks))
    .map((t) => {
      const city = t.city === BLANK_CITY ? undefined : t.city;
      const year =
        t.year === BLANK_YEAR || t.year === "-1" ? undefined : t.year;
      return {
        ...t,
        rawCity: startCase(city) || "Unknown",
        city:
          !city || !year
            ? FLOATING_CITY_ENTRY.city
            : startCase(city.split(" and ")[0].split("/")[0].split(",")[0]),
        translator: trimEnd(t.translator, " (?)"),
        rawYear: year || "Unknown",
        year: year ? parseInt(t.year) : undefined,
        booksExpanded: isEmpty(t.elementsBooks)
          ? []
          : t.elementsBooks.split(", ").map((s) => parseInt(s)),
        volumesCount:
          isEmpty(t.volumesCount) || t.volumesCount === "-1"
            ? undefined
            : parseInt(t.volumesCount),
        additionalContent: isEmpty(t.additionalContent)
          ? []
          : t.additionalContent!.split(", ").map((s) => startCase(s)),
        bookSize: startCase(t.bookSize)
          .replace(" In ", " in ")
          .replace("8 S", "8s"),
        class: t.wClass,
      };
    })
    .filter((t) => isNil(t.year) || t.year <= 1703);
};
