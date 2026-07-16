/**
 * @fileoverview Zod schema for model timestamps supporting ISO-8601 strings or DateTime instances.
 */

import {z} from "zod";
import {ISO8601DateTimeSchema} from "@/common/_schemas/iso-8601/ISO8601DateTimeSchema.ts";
import {DateTimeInstanceSchema} from "@/common/_schemas/date-time/DateTimeInstanceSchema.ts";

/** Zod schema for validating model timestamps as ISO-8601 strings or DateTime instances. */
export const ModelTimestampDateTimeSchema = z.union(
    [ISO8601DateTimeSchema, DateTimeInstanceSchema],
    {
        required_error: "Required",
        invalid_type_error: "Must be a ISO-8601 string or a DateTime instance.",
    },
);

/** Type representing a model timestamp. */
export type ModelTimestampDateTime = z.infer<typeof ModelTimestampDateTimeSchema>;