import {Movie, MovieBaseSchema, MovieSchema} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {
    ExtendedMovieDetailsSchema,
    MovieDetails,
    MovieDetailsSchema
} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieReleaseDateRefinement} from "@/domains/movies/_schema/movie/MovieSchemaUtilities.ts";
import {
    ExtendedMovieWithGenresSchema,
    MovieWithGenres,
    MovieWithGenresSchema
} from "@/domains/movies/_schema/movie/MovieWithGenresSchema.ts";
import {
    ExtendedMovieWithRatingSchema,
    MovieWithRating,
    MovieWithRatingSchema
} from "@/domains/movies/_schema/movie/MovieWithRatingSchema.ts";

export {
    MovieBaseSchema,
    MovieSchema,
    ExtendedMovieDetailsSchema,
    MovieDetailsSchema,
    ExtendedMovieWithGenresSchema,
    MovieWithGenresSchema,
    ExtendedMovieWithRatingSchema,
    MovieWithRatingSchema,
    MovieReleaseDateRefinement,
}

export type {
    Movie,
    MovieDetails,
    MovieWithGenres,
    MovieWithRating,
}