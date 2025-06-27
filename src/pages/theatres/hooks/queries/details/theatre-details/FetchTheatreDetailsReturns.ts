import {PaginatedShowings} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import {PaginatedScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

/**
 * Return shape when theatre detail parsing is successful.
 */
type ValidDetailReturns = {
    parseSuccess: true;
    parseError: null;
    data: {
        theatre: TheatreDetails;
        screens: PaginatedScreenDetails;
        showings: PaginatedShowings;
    };
};

/**
 * Return shape when theatre detail parsing fails.
 */
type InvalidDetailReturns = {
    parseSuccess: false;
    parseError: Error | null;
    data: {
        theatre: null;
        screens: null;
        showings: null;
    };
};

/**
 * Unified return type for fetching and parsing theatre details.
 *
 * This includes:
 * - Fetch state flags (`isPending`, `isError`)
 * - Query-level error (`queryError`)
 * - And either:
 *   - A successful result with parsed data
 *   - Or an error case with null data
 */
export type FetchTheatreDetailsReturns = {
    isPending: boolean;
    isError: boolean;
    queryError: Error | null;
} & (ValidDetailReturns | InvalidDetailReturns);