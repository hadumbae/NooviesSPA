/**
 * @file Query string schemas for the showings page.
 * @filename QueryStrings.schema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Query string schema for the showings page.
 */
export const ShowingsPageQueryStringSchema = z.object({
    /** Optional pagination page. */
    page: CleanedPositiveNumberSchema.optional(),

    /** Optional location filter for nearby showings. */
    near: StringValueSchema.optional(),
});

/**
 * Form-compatible values derived from {@link ShowingsPageQueryStringSchema}.
 */
export const ShowingsPageQueryFormValuesSchema =
    generateFormValueSchema(ShowingsPageQueryStringSchema);