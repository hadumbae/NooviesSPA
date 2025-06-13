import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import IPersonBase from "@/pages/persons/interfaces/IPersonBase.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

/**
 * Extends the base person structure with a list of associated movies.
 *
 * This interface is useful for hydrated entities where the person may have
 * references to movie documents, or populated movie data.
 */
export default interface IPerson extends IPersonBase {
    /**
     * A list of movies the person is associated with (e.g., as actor, director).
     *
     * Each entry can be either:
     * - An {@link ObjectId} referencing a movie (unpopulated)
     * - A fully populated {@link IMovie} object
     */
    movies: (ObjectId | IMovie)[];
}
