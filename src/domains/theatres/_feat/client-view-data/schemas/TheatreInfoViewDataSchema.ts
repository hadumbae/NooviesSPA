/**
 * @fileoverview Defines the schema and type for theatre information view data.
 */

import {z} from "zod";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/theatre";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {TheatreScreenScheduleSchema} from "@/domains/theatre-screens/schema/model";

/** Zod schema for validating theatre details and their associated screen schedules. */
export const TheatreInfoViewDataSchema = z.object({
    theatre: TheatreDetailsSchema,
    screens: generateArraySchema(TheatreScreenScheduleSchema),
});

/** Type definition for the composite theatre information view data. */
export type TheatreInfoViewData = z.infer<typeof TheatreInfoViewDataSchema>;