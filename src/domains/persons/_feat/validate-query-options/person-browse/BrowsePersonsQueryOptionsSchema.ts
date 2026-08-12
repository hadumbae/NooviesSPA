/**
 * @fileoverview Zod schemas and types for person browsing query parameters.
 */

import {z} from "zod";
import {PersonQueryOptionsSchema} from "@/domains/persons/_schema";

/** Schema for validating person browsing query options. */
export const BrowsePersonsQueryOptionsSchema = PersonQueryOptionsSchema.pick({
    name: true,
    sortByName: true,
});

/** Type definition for person browsing query options. */
export type BrowsePersonsQueryOptions = z.infer<typeof BrowsePersonsQueryOptionsSchema>;