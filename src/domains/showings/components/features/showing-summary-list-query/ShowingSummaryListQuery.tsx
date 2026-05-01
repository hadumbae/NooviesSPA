/**
 * @file ShowingSummaryListQuery.tsx
 *
 * @summary
 * Fetches and renders a validated list of showings as summary cards.
 */

import useFetchShowings from "@/domains/showings/hooks/queries/useFetchShowings.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import ShowingSummaryCardList
    from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCardList.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

import {ShowingQueryOptions} from "../../../schema/queries/ShowingQueryOptionSchema";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";

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
        <ValidatedDataLoader query={query} schema={generateArraySchema(ShowingDetailsSchema)}>
            {(showings: ShowingDetails[]) => (
                <ShowingSummaryCardList showings={showings}/>
            )}
        </ValidatedDataLoader>
    );
};

export default ShowingSummaryListQuery;
