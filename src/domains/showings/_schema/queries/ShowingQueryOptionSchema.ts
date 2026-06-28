/**
 * @fileoverview Defines the unified schema and type for Showing query parameters.
 */

import {z} from "zod";
import {ShowingQueryMatchFilterSchema} from "@/domains/showings/_schema/queries/ShowingQueryMatchFilterSchema";
import {ShowingQueryMatchSortSchema} from "@/domains/showings/_schema/queries/ShowingQueryMatchSortSchema";
import {ShowingQueryReferenceFilterSchema} from "@/domains/showings/_schema/queries/ShowingQueryReferenceFilterSchema";

/** Unified Zod schema combining match filters, sort options, and reference filters for Showings. */
export const ShowingQueryOptionSchema =
    ShowingQueryMatchFilterSchema
        .merge(ShowingQueryMatchSortSchema)
        .merge(ShowingQueryReferenceFilterSchema);

/** Combined query options for fetching Showings inferred from the schema. */
export type ShowingQueryOptions =
    z.infer<typeof ShowingQueryOptionSchema>;