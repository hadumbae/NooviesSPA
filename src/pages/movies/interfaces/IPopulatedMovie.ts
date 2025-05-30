import IGenre from "@/pages/genres/interfaces/IGenre.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

/**
 * Represents a movie object with `genres` and `showings` fields optionally populated.
 *
 * @remarks
 * This interface extends {@link IMovie}, but the `genres` and `showings` fields can be
 * either plain `ObjectId`s or their fully populated objects (`IGenre` and `IShowing` respectively).
 *
 * This is commonly used in frontend applications or database operations where partial
 * population is supported (e.g., with Mongoose `.populate()`).
 */
export default interface IPopulatedMovie extends IMovie {
    /**
     * An array of genre references, which may be either `ObjectId`s or fully populated `IGenre` objects.
     *
     * @override
     */
    genres: (ObjectId | IGenre)[];

    /**
     * An array of showing references, which may be either `ObjectId`s or fully populated `IShowing` objects.
     *
     * @override
     */
    showings: (ObjectId | IShowing)[];
}