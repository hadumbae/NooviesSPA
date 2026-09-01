/**
 * @fileoverview Zod schema and TypeScript types for movie index query options and form values.
 */

import {MovieQueryOptionSchema} from "@/domains/movies";
import {z} from "zod";
import {AnyValues} from "@/common/_types";

/** Zod schema for filtering and sorting movie index queries. */
export const MovieIndexQueryOptionsSchema = MovieQueryOptionSchema.pick({
    title: true,
    releaseDate: true,
    country: true,
    isReleased: true,
    isAvailable: true,
    sortByTitle: true,
    sortByReleaseDate: true,
    sortByIsReleased: true,
    sortByIsAvailable: true,
    sortByCountry: true,
});

/** Validated movie index query options type inferred from MovieIndexQueryOptionsSchema. */
export type MovieIndexQueryOptions = z.infer<typeof MovieIndexQueryOptionsSchema>;

/** Form values type for movie index query options allowing unvalidated inputs. */
export type MovieIndexQueryOptionsFormValues = AnyValues<MovieIndexQueryOptions>;