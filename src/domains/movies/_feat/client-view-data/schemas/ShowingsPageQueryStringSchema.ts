/**
 * @fileoverview Defines the schema and types for the showings page URL query parameters.
 */

import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";

/** Zod schema for validating and parsing showings page query strings. */
export const ShowingsPageQueryStringSchema = z.object({
    page: CleanedPositiveNumberSchema.optional(),
    near: StringValueSchema.optional(),
});

/** Type definition derived from the ShowingsPageQueryStringSchema. */
export type ShowingsPageQueryStrings =
    z.infer<typeof ShowingsPageQueryStringSchema>;