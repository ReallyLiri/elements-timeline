import Papa from "papaparse";
import { Point } from "react-simple-maps";
import { groupByMap } from "./util";
import { trimEnd } from "lodash";

const BLANK_CITY = "n.p.";
const BLANK_YEAR = "n.d.";

type RawTranslation = {
  id: string;
  type: string;
  city: string;
  year: string;
  translator: string;
  language: string;
  books: string;
};

export type Translation = Omit<RawTranslation, "year" | "city"> & {
  rawCity: string;
  city: string | undefined;
  rawYear: string;
  year: number | undefined;
  booksExpanded: number[];
};

type City = {
  city: string;
  lon: number;
  lat: number;
};

export const FLOATING_CITY = "-";
const FLOATING_CITY_ENTRY: City = {
  city: FLOATING_CITY,
  lon: -22,
  lat: 50,
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
  return (await parseCsvAsync<RawTranslation>("/data/data.csv")).map((t) => {
    const city = t.city === BLANK_CITY ? undefined : t.city;
    const year = t.year === BLANK_YEAR ? undefined : t.year;
    return {
      ...t,
      rawCity: city || "Unknown",
      city:
        !city || !year
          ? FLOATING_CITY_ENTRY.city
          : city.split(" and ")[0].split("/")[0],
      translator: trimEnd(t.translator, " (?)"),
      rawYear: year || "Unknown",
      year: year ? parseInt(t.year) : undefined,
      booksExpanded: parseRange(t.books),
    };
  });
};

const parseRange = (range: string): number[] => {
  const parts = range.split(/[ ,]+/);
  const result: number[] = [];

  for (const part of parts) {
    if (part.includes("-")) {
      const range = part.split("-");
      const start = parseInt(range[0]);
      const end = parseInt(range[1]);
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
    } else if (part !== "") {
      result.push(parseInt(part));
    }
  }

  return result;
};
