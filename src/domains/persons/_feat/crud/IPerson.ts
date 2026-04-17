import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import IPersonBase from "@/domains/persons/_feat/crud/IPersonBase.ts";
import {IMovieCredit} from "@/domains/moviecredit/interfaces/IMovieCredit.ts";

/**
 * Represents a person with basic attributes and associated movies.
 *
 * This interface extends {@link IPersonBase} and includes a `movies` field
 * that may contain either references (`ObjectId`) or partially/full populated
 * {@link IMovieCredit} objects, depending on the request options used.
 */
export default interface IPerson extends IPersonBase {
    /**
     * An array of movie credits associated with the person.
     * Items may be raw `ObjectId`s or populated `IMovieCredit` objects.
     */
    movies?: (ObjectId | IMovieCredit)[];
}
