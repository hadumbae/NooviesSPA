import {Location, LocationSchema} from "@/common/_models/location/LocationSchema.ts";
import {PostalCode, PostalCodeSchema} from "@/common/_models/location/PostalCodeSchema.ts";
import {CityString, CityStringSchema} from "@/common/_models/location/CityStringSchema.ts";
import {StateString, StateStringSchema} from "@/common/_models/location/StateStringSchema.ts";
import {StreetString, StreetStringSchema} from "@/common/_models/location/StreetStringSchema.ts";

export {
    LocationSchema,
    PostalCodeSchema,
    CityStringSchema,
    StateStringSchema,
    StreetStringSchema,
}

export type {
    Location,
    PostalCode,
    CityString,
    StateString,
    StreetString,
}