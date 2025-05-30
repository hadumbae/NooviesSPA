import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

/**
 * Represents a movie object with all related entities referenced by their IDs.
 *
 * @remarks
 * This interface extends {@link IMovie} but restricts the `genres` and `showings`
 * fields to contain only `ObjectId`s instead of allowing populated objects.
 *
 * It is useful in contexts such as API responses, DB operations, or caching
 * layers where normalized or non-populated data structures are preferred.
 */
export default interface IReferenceMovie extends IMovie {
    /**
     * List of ObjectId references to genres associated with the movie.
     *
     * @override
     */
    genres: ObjectId[];

    /**
     * List of ObjectId references to showings scheduled for the movie.
     *
     * @override
     */
    showings: ObjectId[];
}