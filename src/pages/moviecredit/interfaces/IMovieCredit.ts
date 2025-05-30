import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {IMovieCreditBase} from "@/pages/moviecredit/interfaces/IMovieCreditBase.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import IPerson from "@/pages/persons/interfaces/IPerson.ts";

/**
 * Represents a complete movie credit entry, extending {@link IMovieCreditBase} with specific identifiers.
 *
 * @remarks
 * This interface includes all properties from {@link IMovieCreditBase} and adds:
 * - `movie`: The unique identifier of the associated movie.
 * - `person`: The unique identifier of the person credited.
 *
 * These additions link the credit entry to specific movie and person records.
 *
 * @see {@link IMovieCreditBase}
 */
export interface IMovieCredit extends IMovieCreditBase {
    /**
     * Unique identifier for the associated movie.
     */
    movie: ObjectId | IMovie;

    /**
     * Unique identifier for the associated person.
     */
    person: ObjectId | IPerson;
}