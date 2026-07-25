/**
 * @fileoverview Zod schema for defining sortable fields in user queries.
 */

import {preprocessOptionalField} from "@/common/_feat";
import {MongooseSortOrderSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating user sort parameters. */
export const UserQuerySortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByEmail: preprocessOptionalField(MongooseSortOrderSchema),
    sortByUniqueCode: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type definition for user query sort options. */
export type UserQuerySorts = z.infer<typeof UserQuerySortSchema>;