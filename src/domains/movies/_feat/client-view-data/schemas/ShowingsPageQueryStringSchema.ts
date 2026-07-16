/**
 * @fileoverview Defines the schema and types for the showings page URL query parameters.
 */

import {z} from "zod";
import {PositiveIntegerSchema, StringValueSchema} from "@/common/_schemas";
import {preprocessOptionalField} from "@/common/_feat/validation-preprocessors";

/** Zod schema for validating and parsing showings page query strings. */
export const ShowingsPageQueryStringSchema = z.object({
    page: preprocessOptionalField(PositiveIntegerSchema),
    near: StringValueSchema.optional(),
});

/** Type definition derived from the ShowingsPageQueryStringSchema. */
export type ShowingsPageQueryStrings =
    z.infer<typeof ShowingsPageQueryStringSchema>;