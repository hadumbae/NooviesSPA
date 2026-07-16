/**
 * @fileoverview Zod schema for validating strings representing dates in yyyy-MM-dd format.
 */

import {z} from "zod";
import {DateTime} from "luxon";
import {NonEmptyStringSchema} from "@/common/_schemas/strings";

/** Zod schema for validating non-empty strings against the yyyy-MM-dd format. */
export const DateOnlyStringSchema = NonEmptyStringSchema
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be yyyy-MM-dd.")
    .refine(v => DateTime.fromFormat(v, "yyyy-MM-dd").isValid, "Must be a valid date.");

/** Type representing a validated date-only string. */
export type DateOnlyString = z.infer<typeof DateOnlyStringSchema>;
