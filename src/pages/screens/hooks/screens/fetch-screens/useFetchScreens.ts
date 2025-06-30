import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";
import {useQuery} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenQueryFilters} from "@/pages/screens/schema/queries/ScreenQuery.types.ts";

export type FetchScreenQueries = RequestOptions & EntityPaginatedQuery & ScreenQueryFilters;

export default function useFetchScreens(queries: FetchScreenQueries) {
    const queryKey = ["fetch_screens_by_query", queries] as const;

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