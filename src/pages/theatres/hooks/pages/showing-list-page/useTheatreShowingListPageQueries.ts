/**
 * @file useTheatreShowingListPageQueries.ts
 *
 * Composes the query definitions required for the Theatre Showing List page.
 *
 * Responsibilities:
 * - Fetch the target theatre by slug
 * - Fetch paginated showings scoped to the theatre
 * - Attach runtime schemas for multi-query validation
 */

import useFetchTheatreBySlug from "@/pages/theatres/hooks/fetch-theatre/useFetchTheatreBySlug.ts";
import useFetchPaginatedShowings from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {TheatreSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {PaginatedShowingDetailsSchema} from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";

/**
 * Parameters for {@link useTheatreShowingListPageQueries}.
 */
type ConfigParams = {
    /** Theatre identifier. */
    theatre: {
        slug: string;
    };
    /** Pagination configuration for showings. */
    showing: {
        page: number;
        perPage: number;
    };
};

/**
 * **useTheatreShowingListPageQueries**
 *
 * Returns a list of query definitions used by a multi-query loader
 * to hydrate the Theatre Showing List page.
 *
 * Queries:
 * - `theatre` — fetches theatre details by slug
 * - `paginatedShowings` — fetches paginated showings for the theatre
 *
 * Validation:
 * - Each query is paired with its runtime schema
 *
 * @param params - {@link ConfigParams}
 *
 * @returns Ordered {@link QueryDefinition} array for page hydration.
 */
export default function useTheatreShowingListPageQueries(
    params: ConfigParams
): QueryDefinition[] {
    const {
        theatre: {slug},
        showing: {page, perPage},
    } = params;

    const theatreQuery = useFetchTheatreBySlug({
        slug
    });

    const showingQuery = useFetchPaginatedShowings({
        page,
        perPage,
        config: {populate: true, virtuals: true},
        queries: {theatreSlug: slug},
    });

    return [
        {key: "theatre", query: theatreQuery, schema: TheatreSchema},
        {key: "paginatedShowings", query: showingQuery, schema: PaginatedShowingDetailsSchema},
    ];
}
