import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Query parameters for paginated requests.
 *
 * Combines pagination values with dynamic query filters.
 */
type RequestPaginatedQueryParams = PaginationValues & RequestQueryParams;

export default RequestPaginatedQueryParams;
