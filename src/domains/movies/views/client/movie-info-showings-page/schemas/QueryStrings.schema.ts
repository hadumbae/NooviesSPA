/**
 * @file Query string schemas for the movie showings page.
 * @filename QueryStrings.schema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {
    PaginationSearchParamSchema
} from "@/common/schema/features/pagination-search-params/PaginationSearchParamsSchema.ts";

/**
 * Query string schema for the showings page.
 */
export const ShowingsPageQueryStringSchema = PaginationSearchParamSchema.extend({
    /** Optional location filter for nearby showings. */
    near: StringValueSchema.optional(),
});

/**
 * Form values derived from {@link ShowingsPageQueryStringSchema}.
 */
export const ShowingsPageQueryFormValuesSchema =
    generateFormValueSchema(ShowingsPageQueryStringSchema);