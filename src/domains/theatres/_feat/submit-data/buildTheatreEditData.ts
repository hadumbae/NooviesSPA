/**
 * @fileoverview Utility functions and types for transforming theatre entity data into form edit values.
 */

import {AnyValues} from "@/common/_types";
import {TheatreFormData} from "@/domains/theatres/_feat/submit-data/schema.ts";
import {Theatre, TheatreDetails} from "@/domains/theatres/_schema/theatre";
import {CoordinateFormStarterValues} from "@/common/_models/coordinate-form";
import {LocationFormStarterValues} from "@/common/_models/location-form";

/** Type representing form values for editing a theatre. */
export type TheatreEditData = AnyValues<TheatreFormData>;

/**
 * Transforms a theatre entity or details object into initial form values for editing.
 */
export function buildTheatreEditData(theatre: Theatre | TheatreDetails) {
    const {
        location: {coordinates: theatreCoordinates, ...theatreLocation},
        ...theatreData
    } = theatre;

    const coordinates: CoordinateFormStarterValues = {
        type: "Point",
        coordinates: [
            theatreCoordinates?.coordinates?.[0] ?? "",
            theatreCoordinates?.coordinates?.[1] ?? "",
        ],
    };

    const location: LocationFormStarterValues = {
        coordinates,
        street: "",
        state: "",
        postalCode: "",
        includeCoordinates: false,
        ...theatreLocation,
    };

    return {
        ...theatreData,
        location,
    };
}