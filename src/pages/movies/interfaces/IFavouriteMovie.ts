import IMovie from "@/pages/movies/interfaces/IMovie.ts";

/**
 * Extends the base {@link IMovie} interface to include additional metadata
 * indicating whether the movie is marked as a favourite by the user.
 */
export default interface IFavouriteMovie extends IMovie {
    /** Indicates whether the movie is marked as a favourite by the current user. */
    isFavourite: boolean;
}

