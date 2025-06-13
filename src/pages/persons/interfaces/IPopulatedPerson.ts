import IPersonBase from "@/pages/persons/interfaces/IPersonBase.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

/**
 * Represents a person entity with fully populated movie data.
 *
 * This is typically used in API responses where related movie documents
 * are populated instead of being referenced by ID.
 */
export default interface IPopulatedPerson extends IPersonBase {
    /**
     * An array of fully populated movie objects the person is associated with.
     */
    movies: IMovie[];
}