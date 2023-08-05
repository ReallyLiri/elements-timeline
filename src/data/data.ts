import Papa from "papaparse";
import { Point } from "react-simple-maps";
import { groupByMap } from "./util";

export type Translation = {
  type: string;
  city: string;
  year: string;
};

type City = {
  city: string;
  lon: number;
  lat: number;
};

const parseCsvAsync = async <T>(url: string) => {
  const response = await fetch(url);
  const data = await response.text();
  return Papa.parse<T>(data.trim(), { header: true }).data;
};

export const loadCitiesAsync = async (): Promise<Record<string, Point>> => {
  const cities = await parseCsvAsync<City>("/cities.csv");
  return groupByMap(
    cities,
    (city) => city.city,
    (city) => [city.lon, city.lat],
  );
};

export const loadDataAsync = async (): Promise<Translation[]> => {
  return await parseCsvAsync<Translation>("/data.csv");
};
