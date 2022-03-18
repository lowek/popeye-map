import {TPin} from "@/interfaces/TPin";

export interface IGeoMap {
    geoInterval: number,
    geoData: IGeoData,
    pinType: TPin
}

export interface IGeoData {
    type: string,
    features: [
        {
            type: string,
            properties: {},
            geometry: {
                type: string,
                "coordinates": [number, number][]
            }
        }
    ]
}
