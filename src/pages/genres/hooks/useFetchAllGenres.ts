import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {GenreArraySchema, GenreArray} from "@/pages/genres/schema/GenreSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {UseQueryResult} from "@tanstack/react-query";

export default function useFetchAllGenres(
    params?: { filters?: QueryFilters, populate?: boolean }
): UseQueryResult<GenreArray> {
    const {filters = {}, populate = false} = params || {};

    const queryKey = ["fetch_all_genres", {filters, populate}];
    const schema = GenreArraySchema;
    const action = () => GenreRepository.getAll({filters, populate});

    return useFetchValidatedDataWithRedirect<typeof schema, GenreArray>({queryKey, schema, action});
}