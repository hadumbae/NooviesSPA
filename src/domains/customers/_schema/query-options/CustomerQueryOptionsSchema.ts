/**
 * @fileoverview Defines the Zod schema and type for customer-specific query options.
 */

import {z} from "zod";
import {UserQueryOptionsSchema} from "@/domains/users/_schema/query-options";

/** Zod schema for customer query options, omitting user roles. */
export const CustomerQueryOptionsSchema = UserQueryOptionsSchema.omit({roles: true});

/** Type definition for customer query options derived from the Zod schema. */
export type CustomerQueryOptions = z.infer<typeof CustomerQueryOptionsSchema>;