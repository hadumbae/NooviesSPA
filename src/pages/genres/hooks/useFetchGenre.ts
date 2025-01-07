import {Genre, GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";

export default function useFetchGenre({_id}: { _id: string }) {
    const action = () => GenreRepository.get({_id});
    const schema = GenreSchema;
    const queryKey = "fetch_single_genre";

    return useFetchSchemaData<typeof GenreSchema, Genre>({action, schema, queryKey});
}