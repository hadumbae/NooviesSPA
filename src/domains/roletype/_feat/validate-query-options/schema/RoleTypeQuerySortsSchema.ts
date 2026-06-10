/**
 * @fileoverview Zod schema and type definitions for sorting RoleType query results.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";

/**
 * Zod schema for validating RoleType sorting parameters.
 */
export const RoleTypeQuerySortsSchema = z.object({
    sortByRoleName: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ).optional(),
    sortByDepartment: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ).optional(),
});

/** Type definition for RoleType query sorting options. */
export type RoleTypeQuerySorts = z.infer<typeof RoleTypeQuerySortsSchema>;