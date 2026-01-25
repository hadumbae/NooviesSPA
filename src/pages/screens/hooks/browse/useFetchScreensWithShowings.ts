import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { DateOnlyString } from "@/common/schema/dates/DateOnlyStringSchema.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import { ScreenBrowseRepository } from "@/pages/screens/repositories/screen-browse/ScreenBrowseRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for fetching screens with showings.
 */
type FetchParams = {
    /** Target theatre ObjectId */
    theatreID: ObjectId;

    /** Date used to filter showings (YYYY-MM-DD) */
    dateString: DateOnlyString;

    /** Optional React Query overrides */
    options?: UseQueryOptions<unknown>;
};

/**
 * React Query hook for fetching screens with their scheduled showings
 * for a given theatre and date.
 *
 * Integrates:
 * - {@link ScreenBrowseRepository} for API access
 * - Centralized query error handling
 * - Shared React Query option defaults
 *
 * @param params - Theatre, date, and query configuration
 * @returns React Query result for screen browse request
 */
export function useFetchScreensWithShowings(
    { theatreID, dateString, options }: FetchParams
) {
    const fetchScreens = useQueryFnHandler({
        action: () =>
            ScreenBrowseRepository.fetchScreensWithShowings({
                theatreID,
                dateString,
            }),
        errorMessage: "Failed to fetch screens. Please try again.",
    });

    return useQuery({
        queryKey: ["screens", "browse", "lists", "with-showings", { theatreID, dateString }],
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}
