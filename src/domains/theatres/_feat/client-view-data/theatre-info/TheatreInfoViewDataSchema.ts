/**
 * @fileoverview Defines the schema and type for theatre information view data.
 */

import {z} from "zod";
import {TheatreDetailsSchema} from "@/domains/theatres/_schema/theatre";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {TheatreScreenScheduleSchema} from "@/domains/theatre-screens/_schema/model";
import {
    TheatreMovieRuntimesSchema
} from "@/domains/theatres/_feat/client-view-data/theatre-info/TheatreMovieRuntimesSchema";

/** Zod schema for validating theatre details and their associated screen schedules. */
export const TheatreInfoViewDataSchema = z.object({
    theatre: TheatreDetailsSchema,
    screens: generateArraySchema(TheatreScreenScheduleSchema),
    upcoming: generateArraySchema(TheatreMovieRuntimesSchema),
});

/** Type definition for the composite theatre information view data. */
export type TheatreInfoViewData = z.infer<typeof TheatreInfoViewDataSchema>;