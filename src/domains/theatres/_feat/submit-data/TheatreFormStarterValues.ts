/** @fileoverview Type definition for theatre form initialization values. */

import {LocationFormStarterValues} from "@/common/_models/location-form";

/** Form values used to initialize the theatre creation or edit fields. */
export type TheatreFormStarterValues = {
    name: any;
    seatCapacity: any;
    location: LocationFormStarterValues;
};