/**
 * @fileoverview Zod schemas and TypeScript types for RoleType query options, filters, and sorting.
 */

import {z} from "zod";
import {AnyValues} from "@/common/types";
import {
    RoleTypeQueryFiltersSchema
} from "@/domains/roletype/_feat/validate-query-options/schema/RoleTypeQueryFiltersSchema";
import {
    RoleTypeQuerySortsSchema
} from "@/domains/roletype/_feat/validate-query-options/schema/RoleTypeQuerySortsSchema";

/** Zod schema for full RoleType query options, combining filters and sort options. */
export const RoleTypeQueryOptionsSchema = RoleTypeQueryFiltersSchema.merge(RoleTypeQuerySortsSchema);

/** Combines both filters and sorts into a single type for querying RoleType records. */
export type RoleTypeQueryOptions = z.infer<typeof RoleTypeQueryOptionsSchema>;

/** Represents the values used to initialize the RoleType query form. */
export type RoleTypeQueryOptionsFormValues = AnyValues<RoleTypeQueryOptions>;
