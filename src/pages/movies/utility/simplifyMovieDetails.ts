import {Movie, MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {format} from "date-fns";

/**
 * Simplifies a `MovieDetails` object into a `Movie` object by extracting only the necessary fields.
 *
 * Specifically, it transforms the `genres` array of objects into an array of genre IDs
 * (`_id`), then validates the resulting object against `MovieSchema`.
 *
 * @param movieDetails - The detailed movie object to simplify.
 * @returns The simplified `Movie` object if validation succeeds.
 *
 * @throws {ParseError} Thrown if the simplified movie object does not pass schema validation.
 *
 * @example
 * ```ts
 * const movieDetails: MovieDetails = {
 *   title: "Inception",
 *   genres: [{ _id: "sci-fi", name: "Science Fiction" }],
 *   releaseDate: "2010-07-16",
 *   // other fields...
 * };
 *
 * const movie: Movie = simplifyMovieDetails(movieDetails);
 * console.log(movie.genres); // ["sci-fi"]
 * ```
 */
export default function simplifyMovieDetails(movieDetails: MovieDetails): Movie {
    const genres = movieDetails.genres.map(({_id}) => _id);
    const releaseDate = movieDetails.releaseDate && format(movieDetails.releaseDate, "yyyy-MM-dd");

    const movie = {...movieDetails, genres, releaseDate};

    const {data: parsedMovie, success, error} = MovieSchema.safeParse(movie);

    if (success && !error) return parsedMovie;


    throw new ParseError({
        message: "Failed to simplify movie details.",
        errors: error.errors,
        raw: movie,
    });
}