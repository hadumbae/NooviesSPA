/**
 * @fileoverview Typing for data associated with client-side screen view data.
 */

import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { DateOnlyString } from "@/common/schema/dates/DateOnlyStringSchema.ts";
import {SlugString} from "@/common/_schemas/strings/SlugString.ts";

/** Parameters for fetching screens with showings by theatre and date. */
export type FetchScreensWithShowingsConfig = {
    theatreID: ObjectId | SlugString;
    localDate: DateOnlyString;
};