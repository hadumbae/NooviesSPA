import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {GenreArraySchema, GenreArray} from "@/pages/genres/schema/GenreSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {UseQueryResult} from "@tanstack/react-query";

export default function useFetchAllGenres(
    params?: { filters?: QueryFilters, populate?: string[] }
): UseQueryResult<GenreArray> {
    const {filters = {}} = params || {};

    const queryKey = "fetch_all_genres";
    const schema = GenreArraySchema;
    const action = () => GenreRepository.getAll({filters});

    return useFetchValidatedDataWithRedirect<typeof schema, GenreArray>({queryKey, schema, action});
}