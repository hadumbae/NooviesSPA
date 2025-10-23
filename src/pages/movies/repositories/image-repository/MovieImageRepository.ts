import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import {
    IImageRepository,
    QueryByIDParams,
    UploadPosterImageParams
} from "@/pages/movies/repositories/image-repository/MovieImageRepository.types.ts";

/**
 * Repository implementation for handling movie poster image operations.
 *
 * @remarks
 * Provides methods to upload or delete poster images through the admin movie API.
 */
const MovieImageRepository: IImageRepository = {
    /** Base API URL for movie endpoints. */
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/movies`,

    /**
     * Uploads a poster image to the server for a specific movie.
     *
     * @param params - The movie ID and the image form data to upload.
     * @returns A promise resolving to the fetch response.
     */
    uploadPosterImage: function (params: UploadPosterImageParams): Promise<RequestReturns> {
        const {movieID, data} = params;

        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `update/${movieID}/poster_image`
        });

        return useFetchAPI({url, method: "PATCH", data});
    },

    /**
     * Deletes an existing poster image from the server for a specific movie.
     *
     * @param params - The movie ID whose poster image should be deleted.
     * @returns A promise resolving to the fetch response.
     */
    deletePosterImage: function (params: QueryByIDParams): Promise<RequestReturns> {
        const {movieID} = params;

        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `delete/${movieID}/poster_image`
        });

        return useFetchAPI({url, method: "DELETE"});
    }
};

export default MovieImageRepository;
