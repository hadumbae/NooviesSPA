import {Genre, GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";

export default function useFetchGenre({_id}: { _id: string }) {
    const queryKey = ["fetch_single_genre", {_id}];
    const action = () => GenreRepository.get({_id});
    const schema = GenreSchema;

    return useFetchValidatedDataWithRedirect<typeof GenreSchema, Genre>({action, schema, queryKey});
}