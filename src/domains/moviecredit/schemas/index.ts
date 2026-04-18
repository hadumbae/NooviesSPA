import {
    CastMovieCredit,
    CrewMovieCredit, MovieCredit,
    MovieCreditBaseSchema,
    MovieCreditCastSchema,
    MovieCreditCrewSchema, MovieCreditSchema
} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {UndefinedForCrewFieldSchema} from "@/domains/moviecredit/schemas/model/UndefinedForCrewFieldSchema.ts";
import {
    MovieCreditDetails,
    MovieCreditDetailsCast,
    MovieCreditDetailsCastSchema, MovieCreditDetailsCrew,
    MovieCreditDetailsCrewSchema, MovieCreditDetailsSchema
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";
import {
    GroupedCrewCreditsExceptMovie,
    GroupedCrewCreditsExceptMovieSchema
} from "@/domains/moviecredit/schemas/model/GroupedCrewCreditsExceptMovieSchema.ts";
import {
    MovieCreditArray,
    MovieCreditArraySchema
} from "@/domains/moviecredit/schemas/model/MovieCreditArraySchema.ts";
import {
    MovieCreditDetailsArray,
    MovieCreditDetailsArraySchema
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsArraySchema.ts";
import {
    PaginatedMovieCreditDetails,
    PaginatedMovieCreditDetailsSchema
} from "@/domains/moviecredit/schemas/model/PaginatedMovieCreditDetailsSchema.ts";
import {
    PaginatedMovieCredit,
    PaginatedMovieCreditSchema
} from "@/domains/moviecredit/schemas/model/PaginatedMovieCreditSchema.ts";
import {
    MovieCreditQueryFilters,
    MovieCreditQueryFiltersSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryFiltersSchema.ts";
import {
    MovieCreditQueryMatchFilters,
    MovieCreditQueryMatchFiltersSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryMatchFiltersSchema.ts";
import {
    MovieCreditQueryMatchSorts,
    MovieCreditQueryMatchSortsSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryMatchSortsSchema.ts";
import {
    MovieCreditQueryOptions,
    MovieCreditQueryOptionsSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryOptionsSchema.ts";
import {
    MovieCreditQueryReferenceFilters,
    MovieCreditQueryReferenceFiltersSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryReferenceFiltersSchema.ts";

export {
    MovieCreditBaseSchema,
    MovieCreditCrewSchema,
    MovieCreditCastSchema,
    MovieCreditSchema,
    UndefinedForCrewFieldSchema,
    MovieCreditDetailsCrewSchema,
    MovieCreditDetailsCastSchema,
    MovieCreditDetailsSchema,
    GroupedCrewCreditsExceptMovieSchema,
    MovieCreditArraySchema,
    MovieCreditDetailsArraySchema,
    PaginatedMovieCreditDetailsSchema,
    PaginatedMovieCreditSchema,
    MovieCreditQueryFiltersSchema,
    MovieCreditQueryMatchFiltersSchema,
    MovieCreditQueryMatchSortsSchema,
    MovieCreditQueryOptionsSchema,
    MovieCreditQueryReferenceFiltersSchema,
}

export type {
    CrewMovieCredit,
    CastMovieCredit,
    MovieCredit,
    MovieCreditDetailsCrew,
    MovieCreditDetailsCast,
    MovieCreditDetails,
    GroupedCrewCreditsExceptMovie,
    MovieCreditArray,
    MovieCreditDetailsArray,
    PaginatedMovieCreditDetails,
    PaginatedMovieCredit,
    MovieCreditQueryFilters,
    MovieCreditQueryMatchFilters,
    MovieCreditQueryMatchSorts,
    MovieCreditQueryOptions,
    MovieCreditQueryReferenceFilters,
}