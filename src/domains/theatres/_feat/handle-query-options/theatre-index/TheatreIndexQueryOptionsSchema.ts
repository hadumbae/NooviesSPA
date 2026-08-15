/**
 * @fileoverview Defines the validation schema and types for theatre index query options.
 */

import {TheatreQueryOptionSchema} from "@/domains/theatres";
import {z} from "zod";
import {AnyValues} from "@/common/_types";

/** Zod schema for validating query options when listing theatres in the index view. */
export const TheatreIndexQueryOptionsSchema = TheatreQueryOptionSchema.pick({
    name: true,
    country: true,
    postalCode: true,
    sortByName: true,
    sortByCountry: true,
    sortByPostalCode: true,
});

/** Inferred TypeScript type for theatre index query options. */
export type TheatreIndexQueryOptions = z.infer<typeof TheatreIndexQueryOptionsSchema>;

/** Form values type for theatre index query options. */
export type TheatreIndexQueryOptionsFormValues = AnyValues<TheatreIndexQueryOptions>;