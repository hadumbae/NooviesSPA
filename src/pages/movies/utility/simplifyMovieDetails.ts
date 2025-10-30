import { Movie, MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import { MovieSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import { ParseError } from "@/common/errors/ParseError.ts";

/**
 * Simplifies a `MovieDetails` object into a `Movie` object suitable for storage or API submission.
 *
 * @remarks
 * - Converts `genres` from an array of objects to an array of `_id`s.
 * - Formats the `releaseDate` from a Luxon `DateTime` to an ISO-style string (`yyyy-MM-dd'T'HH:mm:ss'Z'`) for consistent comparison.
 * - Validates the resulting simplified movie object against `MovieSchema`.
 * - Throws a `ParseError` if validation fails, including the original object and validation errors.
 *
 * @param movieDetails - The full movie details object containing detailed information such as genres, title, runtime, and release date.
 *
 * @returns A validated `Movie` object with simplified genres and formatted release date.
 *
 * @throws {ParseError} When the simplified movie object fails validation against `MovieSchema`.
 *
 * @example
 * ```ts
 * const movieDetails: MovieDetails = {
 *   _id: "123",
 *   title: "Example Movie",
 *   genres: [{ _id: "action", name: "Action" }, { _id: "drama", name: "Drama" }],
 *   releaseDate: DateTime.fromISO("2024-11-15T12:00:00Z"),
 *   runtime: 120,
 *   // ...other fields
 * };
 *
 * const movie: Movie = simplifyMovieDetails(movieDetails);
 * // movie.genres === ["action", "drama"]
 * // movie.releaseDate === "2024-11-15T12:00:00Z"
 * ```
 */
export default function simplifyMovieDetails(movieDetails: MovieDetails): Movie {
    const { genres, releaseDate, ...rem } = movieDetails;

    /** Array of genre IDs extracted from `genres` objects. */
    const simplifiedGenres = genres.map(({ _id }) => _id);

    /** Release date formatted as an ISO-style string for storage and comparison. */
    const dateString = releaseDate
        ? releaseDate.toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
        : undefined;

    const movie = { ...rem, genres: simplifiedGenres, releaseDate: dateString };

    const { data: parsedMovie, success, error } = MovieSchema.safeParse(movie);
    if (success && !error) return parsedMovie;

    throw new ParseError({
        message: "Failed to simplify movie details.",
        errors: error.errors,
        raw: movie,
    });
}
