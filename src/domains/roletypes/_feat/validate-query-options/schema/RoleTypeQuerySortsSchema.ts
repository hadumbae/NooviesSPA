/**
 * @fileoverview Zod schema and type definitions for sorting RoleType query results.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/_schemas/enums/MongooseSortOrderSchema.ts";
import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";

/**
 * Zod schema for validating RoleType sorting parameters.
 */
export const RoleTypeQuerySortsSchema = z.object({
    sortByRoleName: preprocessEmptyToUndefined(
        MongooseSortOrderSchema.optional()
    ).optional(),
    sortByDepartment: preprocessEmptyToUndefined(
        MongooseSortOrderSchema.optional()
    ).optional(),
});

/** Type definition for RoleType query sorting options. */
export type RoleTypeQuerySorts = z.infer<typeof RoleTypeQuerySortsSchema>;