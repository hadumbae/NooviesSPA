import {ShowingWithMovie, ShowingWithMovieSchema} from "@/domains/showings/_schema/showing/ShowingWithMovieSchema.ts";
import {Showing, ShowingSchema} from "@/domains/showings/_schema/showing/ShowingSchema.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {ShowingConfig, ShowingConfigSchema} from "@/domains/showings/_schema/showing/ShowingConfigSchema.ts";
import {PopulatedShowing, PopulatedShowingSchema} from "@/domains/showings/_schema/showing/PopulatedShowingSchema.ts";

export {
    ShowingSchema,
    ShowingWithMovieSchema,
    ShowingDetailsSchema,
    ShowingConfigSchema,
    PopulatedShowingSchema,
}

export type {
    Showing,
    ShowingWithMovie,
    ShowingDetails,
    ShowingConfig,
    PopulatedShowing,
}