import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";

interface IMovieFavouriteRepository {
    baseURL: string;
    addToFavourites: (params: {movieID: ObjectId}) => Promise<FetchReturns>;
    removeFromFavourites: (params: {movieID: ObjectId}) => Promise<FetchReturns>;
    fetchFavouriteMovieAndShowings: (params: {movieID: ObjectId}) => Promise<FetchReturns>;
}

const MovieFavouriteRepository: IMovieFavouriteRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/movies`,

    async fetchFavouriteMovieAndShowings({movieID}: {movieID: ObjectId}): Promise<FetchReturns> {
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