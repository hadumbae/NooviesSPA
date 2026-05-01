import {ShowingWithMovie, ShowingWithMovieSchema} from "@/domains/showings/schema/showing/ShowingWithMovieSchema.ts";
import {Showing, ShowingSchema} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ShowingConfig, ShowingConfigSchema} from "@/domains/showings/schema/showing/ShowingConfigSchema.ts";
import {PopulatedShowing, PopulatedShowingSchema} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {
    PaginatedPopulatedShowings,
    PaginatedPopulatedShowingSchema,
    PaginatedShowingDetails,
    PaginatedShowingDetailsSchema,
    PaginatedShowings,
    PaginatedShowingSchema
} from "@/domains/showings/schema/showing/PaginatedShowingSchemas.ts";

export {
    ShowingSchema,
    ShowingWithMovieSchema,
    ShowingDetailsSchema,
    ShowingConfigSchema,
    PopulatedShowingSchema,
}

export {
    PaginatedShowingSchema,
    PaginatedPopulatedShowingSchema,
    PaginatedShowingDetailsSchema,
}

export type {
    Showing,
    ShowingWithMovie,
    ShowingDetails,
    ShowingConfig,
    PopulatedShowing,
}

export type {
    PaginatedShowings,
    PaginatedPopulatedShowings,
    PaginatedShowingDetails,
}