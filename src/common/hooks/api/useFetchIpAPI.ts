import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {ExternalRepository} from "@/common/repositories/ExternalRepository.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

export const useFetchIpAPI = (options?: UseQueryOptions<unknown>) => {
    const fetchIpData = useQueryFnHandler({
        action: () => ExternalRepository.fetchIpAPIData(),
        errorMessage: "Failed to fetch data from ipapi.co."
    });

    return useQuery({
        queryKey: ["api", "ipAPI"],
        queryFn: fetchIpData,
        ...useQueryOptionDefaults(options),
    });
}