import {ScreenFilterQuery} from "@/pages/screens/schema/queries/ScreenFilterQuerySchema.ts";
import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";
import {useQuery} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";

export type FetchScreenQueries = RequestOptions & EntityPaginatedQuery & ScreenFilterQuery;

export default function useFetchScreens(queries: FetchScreenQueries) {
    const queryKey = ["fetch_screen_by_query", queries] as const;

    const queryAction = async () => {
        console.log("Screen Queries: ", queries);

        const {response, result} = await ScreenRepository.query({queries});

        if (!response.ok) {
            const message = "Failed to fetch screen data. Pleas try again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({
        queryKey,
        queryFn: queryAction,
        staleTime: 1000 * 60,
        placeholderData: (previousData) => previousData,
    });

}