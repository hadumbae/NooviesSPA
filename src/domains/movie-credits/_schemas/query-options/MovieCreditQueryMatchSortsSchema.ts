/**
 * @fileoverview Sort options for MovieCredit queries.
 * Defines the schema and types for ordering movie credit results based on
 * specific document fields.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema} from "@/common/schema/enums/MongooseNumericSortOrderSchema.ts";

/**
 * Sort options for MovieCredit queries.
 */
export const MovieCreditQueryMatchSortsSchema = z.object({
    sortByCreditedAs: MongooseNumericSortOrderSchema.optional(),
    sortByCharacterName: MongooseNumericSortOrderSchema.optional(),
    sortByBillingOrder: MongooseNumericSortOrderSchema.optional(),
});

/**
 * Validated sorting parameters for movie credit queries.
 */
export type MovieCreditQueryMatchSorts =
    z.infer<typeof MovieCreditQueryMatchSortsSchema>;