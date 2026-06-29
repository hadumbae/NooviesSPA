/** @fileoverview Provides a hook to generate memoized default values for the theatre submission form. */

import {Theatre} from "@/domains/theatres/_schema/theatre";
import {LocationFormStarterValues} from "@/common/_models/location-form/LocationFormStarterValues.ts";
import {CoordinateFormStarterValues} from "@/common/_models/coordinate-form";
import {useRef} from "react";
import {isEqual} from "lodash";
import {TheatreFormValues} from "@/domains/theatres";

/** Configuration options for calculating form default values. */
type ValueConfig = {
    theatre?: Theatre;
    presetValues?: Partial<TheatreFormValues>;
}

/**
 * Generates and memoizes default values for the theatre submission form.
 */
export function useTheatreSubmitFormDefaultValues(
    {theatre, presetValues}: ValueConfig = {},
): TheatreFormValues {
    const coordinates: CoordinateFormStarterValues = {
        type: "Point",
        coordinates: [
            presetValues?.location?.coordinates?.coordinates?.[0] ??
            theatre?.location?.coordinates?.coordinates?.[0] ??
            "",
            presetValues?.location?.coordinates?.coordinates?.[1] ??
            theatre?.location?.coordinates?.coordinates?.[1] ??
            "",
        ],
    };

    const location: LocationFormStarterValues = {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        timezone: "",
        includeCoordinates: false,

        ...theatre?.location,
        ...presetValues?.location,

        coordinates,
    };

    const defaultValues: TheatreFormValues = {
        name: "",
        seatCapacity: "",

        ...theatre,
        ...presetValues,

        location,
    };

    const heldValues = useRef<TheatreFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}