import {useQuery} from "@tanstack/react-query";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import useFetchErrorHandler from "@/common/utility/useFetchErrorHandler.ts";
import parseResponseData from "@/common/utility/parseResponseData.ts";
import {GenreArraySchema, GenreArray} from "@/pages/genres/schema/GenreSchema.ts";

export default function useFetchAllGenres({filters}: {filters: QueryFilters}) {
    const queryFn = async () => {
        const fetchQueryFn = () => GenreRepository.getAll({filters: filters});
        const {result} = await useFetchErrorHandler({fetchQueryFn});

        return parseResponseData<typeof GenreArraySchema, GenreArray>({
            schema: GenreArraySchema,
            data: result,
        });
    }

    return useQuery({
        queryKey: ['fetch_all_genres'],
        queryFn,
    });
}