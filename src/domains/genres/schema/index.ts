import {Genre, GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {GenreArray, GenreArraySchema} from "@/domains/genres/schema/genre/GenreArraySchema.ts";
import {PaginatedGenres, PaginatedGenresSchema} from "@/domains/genres/schema/genre/PaginatedGenresSchema.ts";
import {GenreQuerySorts, GenreQuerySortSchema} from "@/domains/genres/schema/filters/GenreQuerySortSchema.ts";
import {GenreQueryFilters, GenreQueryFilterSchema} from "@/domains/genres/schema/filters/GenreQueryFilterSchema.ts";
import {GenreQueryOptions, GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptionsSchema.ts";

export {
    GenreSchema,
    GenreArraySchema,
    PaginatedGenresSchema,
    GenreQueryFilterSchema,
    GenreQuerySortSchema,
    GenreQueryOptionSchema,
}

export type {
    Genre,
    GenreArray,
    PaginatedGenres,
    GenreQueryFilters,
    GenreQuerySorts,
    GenreQueryOptions,
}