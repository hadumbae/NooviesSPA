import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { DateOnlyString } from "@/common/schema/dates/DateOnlyStringSchema.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameters for fetching screens with showings by theatre and date.
 */
export type FetchScreensWithShowingsParams = {
    /** Target theatre ObjectId */
    theatreID: ObjectId | SlugString;

    /** Date used to filter showings (YYYY-MM-DD) */
    dateString: DateOnlyString;
};

/**
 * Interface defining screen browse repository methods.
 */
export interface ScreenBrowseMethods {
    /** Base API endpoint for screen browse requests */
    baseURL: string;

    /**
     * Fetch screens with their associated showings.
     *
     * @param params - Theatre and date filters
     */
    fetchScreensWithShowings(
        params: FetchScreensWithShowingsParams
    ): Promise<RequestReturns<unknown>>;
}
