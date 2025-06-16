import IPersonBase from "@/pages/persons/interfaces/IPersonBase.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";

/**
 * Extended person interface that includes full movie credit objects.
 *
 * This interface builds upon {@link IPersonBase} by replacing the `movies` field with
 * fully populated {@link IMovieCredit} entries instead of raw IDs or partial data.
 */
export default interface IPopulatedPerson extends IPersonBase {
    /**
     * An array of fully populated movie credits associated with the person.
     */
    movies: IMovieCredit[];
}