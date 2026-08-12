/**
 * @fileoverview Validation schemas and type definitions for person index query options.
 */

import {z} from "zod";
import {PersonQueryOptionsSchema} from "@/domains/persons/_schema/query-options";
import {AnyValues} from "@/common/_types";

/** Zod schema validating query parameters for filtering and sorting persons in an index list. */
export const PersonIndexQueryOptionSchema = PersonQueryOptionsSchema.pick({
    name: true,
    nationality: true,
    sortByName: true,
    sortByNationality: true,
});

/** Type definition for query options inferred from PersonIndexQueryOptionSchema. */
export type PersonIndexQueryOptions = z.infer<typeof PersonIndexQueryOptionSchema>;

/** Type representing loose or unparsed form field values corresponding to PersonIndexQueryOptions. */
export type PersonIndexQueryOptionsFormValues = AnyValues<PersonIndexQueryOptions>;