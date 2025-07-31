import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

/**
 * **IMovieWithData**
 *
 * Extended movie interface that includes related data.
 *
 * Extends {@link IMovie} and adds:
 * - `genres`: Associated genres.
 * - `showings`: Scheduled showings for the movie.
 * - `crew`: Crew members (credits).
 * - `cast`: Cast members (credits).
 */
export default interface IMovieWithData extends IMovie {
    /**
     * List of genres associated with the movie.
     */
    genres: Genre[];

    /**
     * Showings where this movie is scheduled.
     */
    showings: IShowing[];

    /**
     * Crew credits (e.g., director, writers).
     */
    crew: IMovieCredit[];

    /**
     * Cast credits (e.g., actors).
     */
    cast: IMovieCredit[];
}