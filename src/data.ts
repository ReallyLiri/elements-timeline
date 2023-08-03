import Papa from 'papaparse';
import { reduce, trim, uniq } from 'lodash'
import { Point } from "react-simple-maps";

export type Translation = {
    type: string
    city: string
    year: string
}

type City = {
    city: string
    lon: number
    lat: number
}

const parseCsvAsync = async <T>(url: string) => {
    const response = await fetch(url)
    const data = await response.text()
    return Papa.parse<T>(data.trim(), { header: true }).data
}

export const loadDataAsync = async (): Promise<[Record<string, Point>, Translation[]]> => {
    const [translations, cities] = await Promise.all([
        parseCsvAsync<Translation>("/data.csv"),
        parseCsvAsync<City>("/cities.csv")
    ])
    const cityToLocation: Record<string, Point> = reduce(
        cities,
        (acc, { city, lon, lat }) => ( { ...acc, [city]: [lon, lat] } ),
        {}
    )
    return [cityToLocation, translations]
}
