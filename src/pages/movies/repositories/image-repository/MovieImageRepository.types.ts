import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";

/**
 * Parameters for querying a movie by its unique identifier.
 */
export type QueryByIDParams = {
    /** The unique identifier of the movie. */
    movieID: ObjectId;
};

/**
 * Parameters for uploading a movie poster image.
 */
export type UploadPosterImageParams = QueryByIDParams & {
    /** The form data containing the poster image file and metadata. */
    data: FormData;
};

/**
 * Repository interface for managing movie poster images.
 *
 * @remarks
 * Provides methods for uploading and deleting poster images associated with a movie.
 */
export interface IImageRepository {
    /** Base API endpoint for movie-related requests. */
    baseURL: string;

    /**
     * Uploads a poster image for a specific movie.
     *
     * @param params - The movie ID and image form data.
     * @returns A promise that resolves with the API response.
     */
    uploadPosterImage: (params: UploadPosterImageParams) => Promise<FetchReturns>;

    /**
     * Deletes the poster image for a specific movie.
     *
     * @param params - The movie ID of the poster image to delete.
     * @returns A promise that resolves with the API response.
     */
    deletePosterImage: (params: QueryByIDParams) => Promise<FetchReturns>;
}