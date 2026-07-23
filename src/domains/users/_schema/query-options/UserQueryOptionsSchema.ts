/**
 * @fileoverview Defines the combined schema for user query filtering and sorting options.
 */

import {UserQueryFilterSchema} from "@/domains/users/_schema/query-options/UserQueryFilterSchema.ts";
import {UserQuerySortSchema} from "@/domains/users/_schema/query-options/UserQuerySortSchema.ts";
import { z } from "zod";

/** Zod schema that merges user filtering and sorting criteria. */
export const UserQueryOptionsSchema = UserQueryFilterSchema.merge(UserQuerySortSchema);

/** Type definition for user query options inferred from the schema. */
export type UserQueryOptions = z.infer<typeof UserQueryOptionsSchema>;