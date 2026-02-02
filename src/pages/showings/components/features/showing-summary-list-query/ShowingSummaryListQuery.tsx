/**
 * @file ShowingSummaryListQuery.tsx
 *
 * @summary
 * Fetches and renders a validated list of showings as summary cards.
 */

import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";
import {ShowingQueryOptions} from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import ShowingSummaryCardList
    from "@/pages/showings/components/admin/card/showing-summary-card/ShowingSummaryCardList.tsx";
import {ShowingDetailsArraySchema} from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";
import {ShowingDetailsArray} from "@/pages/showings/schema/showing/ShowingRelated.types.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Props for {@link ShowingSummaryListQuery}.
 *
 * Combines showing query filters with a request-level `limit`.
 */
type ListProps = ShowingQueryOptions & Pick<RequestOptions, "limit">;

/**
 * Executes a showing query and renders the result as a summary card list.
 *
 * - Automatically applies `populate` and `virtuals`
 * - Filters out nullish request options
 * - Guards rendering with query lifecycle and schema validation
 *
 * @param props Query filters and request options.
 */
const ShowingSummaryListQuery = (props: ListProps) => {
    const {limit, ...queries} = props;

    const query = useFetchShowings({
        queries,
        config: {virtuals: true, populate: true, limit},
    });

    return (
        <ValidatedDataLoader query={query} schema={ShowingDetailsArraySchema}>
            {(showings: ShowingDetailsArray) => (
                <ShowingSummaryCardList showings={showings}/>
            )}
        </ValidatedDataLoader>
    );
};

export default ShowingSummaryListQuery;
