import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {Movie, MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";

export default function useFetchMovie({_id}: { _id: ObjectId }) {
    const queryKey = ["fetch_single_movie", {_id}];
    const schema = MovieSchema;
    const action = () => MovieRepository.get({_id, populate: true});

    return useFetchValidatedDataWithRedirect<typeof MovieSchema, Movie>({queryKey, schema, action});
}