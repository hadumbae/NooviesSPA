import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { DateOnlyString } from "@/common/schema/dates/DateOnlyStringSchema.ts";

/**
 * Parameters used to scope screen browse queries with showings.
 */
type WithShowingParams = {
    /** Target theatre ObjectId */
    theatreID: ObjectId;

    /** Date used to filter showings (YYYY-MM-DD) */
    dateString: DateOnlyString;
};

/**
 * React Query keys for screen browse operations.
 *
 * Provides stable, namespaced keys for caching and invalidation.
 */
export const ScreenBrowseQueryKeys = {
    /** Root key for all screen browse queries */
    all: ["screens", "browse"],

    /**
     * Query key for screens fetched with showings by theatre and date.
     *
     * @param params - Theatre and date scope
     */
    withShowings: (params: WithShowingParams) => [
        ...ScreenBrowseQueryKeys.all,
        "lists",
        "with-showings",
        params,
    ],
};
