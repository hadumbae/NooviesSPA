import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";
import {Movie, MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";

export default function useFetchMovie({_id}: { _id: ObjectId }) {
    const queryKey = "fetch_single_movie";
    const schema = MovieSchema;
    const action = () => MovieRepository.get({_id});

    return useFetchSchemaData<typeof MovieSchema, Movie>({queryKey, schema, action});
}