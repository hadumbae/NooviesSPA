/**
 * @fileoverview Typing for data associated with client-side screen view data.
 */

import { ObjectId } from "@/common/_schemas";
import { DateOnlyString } from "@/common/_schemas/dates/DateOnlyStringSchema.ts";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

/** Parameters for fetching screens with showings by theatre and date. */
export type FetchScreensWithShowingsConfig = {
    theatreID: ObjectId | SlugString;
    localDate: DateOnlyString;
};