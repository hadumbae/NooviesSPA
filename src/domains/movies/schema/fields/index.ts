import {MovieTitle, MovieTitleSchema} from "@/domains/movies/schema/fields/MovieTitleSchema.ts";
import {MovieTagline, MovieTaglineSchema} from "@/domains/movies/schema/fields/MovieTaglineSchema.ts";
import {MovieSynopsis, MovieSynopsisSchema} from "@/domains/movies/schema/fields/MovieSynopsisSchema.ts";
import {MovieGenreIDs, MovieGenreIDsSchema} from "@/domains/movies/schema/fields/MovieGenreIDsSchema.ts";
import {MovieTrailerURL, MovieTrailerURLSchema} from "@/domains/movies/schema/fields/MovieTrailerURLSchema.ts";

export {
    MovieTitleSchema,
    MovieTaglineSchema,
    MovieSynopsisSchema,
    MovieGenreIDsSchema,
    MovieTrailerURLSchema,
}

export type {
    MovieTitle,
    MovieTagline,
    MovieSynopsis,
    MovieGenreIDs,
    MovieTrailerURL,
}