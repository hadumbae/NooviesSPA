import {useQuery} from "@tanstack/react-query";
import IGenre, {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import useFetchErrorHandler from "@/common/utility/useFetchErrorHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import parseResponseData from "@/common/utility/parseResponseData.ts";

export default function useFetchGenre({_id}: {_id: string}) {
    const fetchGenreByID = async () => {
        const {result} = await useFetchErrorHandler({
            fetchQueryFn: () => GenreRepository.get({_id})
        });

        return parseResponseData({
            schema: GenreSchema,
            data: result
        });
    };

    return useQuery<IGenre>({
        queryKey: ['fetch_single_genre'],
        queryFn: fetchGenreByID,
    });
}