import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";

/**
 * Query parameters for paginated requests.
 *
 * Combines pagination values with dynamic query filters.
 */
type RequestPaginatedQueryParams = PaginationValues & RequestQueryParams;

export default RequestPaginatedQueryParams;
