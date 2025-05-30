import IGenre from "@/pages/genres/interfaces/IGenre.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";

/**
 * Represents a fully populated movie object with related entities.
 *
 * @remarks
 * This interface extends {@link IMovie} but assumes that related fields have been fully populated.
 * Specifically, the `genres` and `showings` fields contain full objects rather than IDs,
 * and the `crew` and `cast` fields contain virtual Mongoose relationships.
 *
 * This is typically used when the movie data has been enriched with related records,
 * such as in admin views or API responses where full entity data is needed.
 */
export default interface IMovieWithData extends IMovie {
    /**
     * Fully populated list of genres associated with the movie.
     *
     * @override
     */
    genres: IGenre[];

    /**
     * Fully populated list of showings associated with the movie.
     *
     * @override
     */
    showings: IShowing[];

    /**
     * Virtual field populated by Mongoose containing all crew member credits for the movie.
     */
    crew: IMovieCredit[];

    /**
     * Virtual field populated by Mongoose containing all cast member credits for the movie.
     */
    cast: IMovieCredit[];
}