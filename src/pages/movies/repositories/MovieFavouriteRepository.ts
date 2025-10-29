import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

interface IMovieFavouriteRepository {
    baseURL: string;
    addToFavourites: (params: {movieID: ObjectId}) => Promise<RequestReturns>;
    removeFromFavourites: (params: {movieID: ObjectId}) => Promise<RequestReturns>;
    fetchFavouriteMovieAndShowings: (params: {movieID: ObjectId}) => Promise<RequestReturns>;
}

const MovieFavouriteRepository: IMovieFavouriteRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/movies`,

    async fetchFavouriteMovieAndShowings({movieID}: {movieID: ObjectId}): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: `get/${movieID}/favourites`});
        return useFetchAPI({method: "GET", url});
    },

    async addToFavourites({movieID}: {movieID: ObjectId}) {
        const url = buildQueryURL({baseURL: this.baseURL, path: `edit/${movieID}/favourites/add`});
        return useFetchAPI({method: "PATCH", url});
    },

    async removeFromFavourites({movieID}: {movieID: ObjectId}) {
        const url = buildQueryURL({baseURL: this.baseURL, path: `edit/${movieID}/favourites/remove`});
        return useFetchAPI({method: "PATCH", url});
    }
}

export default MovieFavouriteRepository;