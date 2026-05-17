/**
 * @fileoverview Defines the Zod schema and type for the showings page query form values.
 */

import {
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/_feat/client-view-data/schemas/ShowingsPageQueryStringSchema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema";
import {AnyValues} from "@/common/types";

/** Zod schema for the showings page query form, derived from the query string schema. */
export const ShowingsPageQueryFormValuesSchema = generateFormValueSchema(ShowingsPageQueryStringSchema);

/** Type definition for the showings page query form values. */
export type ShowingsPageQueryFormStarterValues = AnyValues<ShowingsPageQueryStrings>;