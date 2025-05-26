import {IMovieCreditBase} from "@/pages/moviecredit/interfaces/IMovieCreditBase.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import IPerson from "@/pages/persons/interfaces/IPerson.ts";

/**
 * Represents a fully populated movie credit entry.
 *
 * @remarks
 * Extends {@link IMovieCreditBase} by adding the full {@link IMovie} and {@link IPerson} objects
 * for the `movie` and `person` properties, respectively.
 * This structure is useful when detailed information about the movie and person is required
 * alongside the credit details.
 *
 * @see {@link IMovieCreditBase}
 */
export interface IPopulatedMovieCredit extends IMovieCreditBase {
    /**
     * The full movie object associated with this credit.
     */
    movie: IMovie;

    /**
     * The full person object associated with this credit.
     */
    person: IPerson;
}