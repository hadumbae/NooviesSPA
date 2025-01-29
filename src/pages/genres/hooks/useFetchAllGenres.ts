import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {GenreArraySchema, GenreArray} from "@/pages/genres/schema/GenreSchema.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";

export default function useFetchAllGenres(params?: {filters?: QueryFilters, populate?: string[]}) {
    const {filters = {}} = params || {};

    const queryKey = "fetch_all_genres";
    const schema = GenreArraySchema;
    const action = () => GenreRepository.getAll({filters});

    return useFetchSchemaData<typeof schema, GenreArray>({queryKey, schema, action});
}