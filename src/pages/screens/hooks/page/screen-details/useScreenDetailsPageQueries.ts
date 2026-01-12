/**
 * @file useScreenDetailsPageQueries.ts
 *
 * Composes all data-fetching queries required by the
 * Screen Details admin page.
 *
 * Each query is paired with a validation schema and
 * returned as a {@link QueryDefinition} for use with
 * multi-query loaders and query boundaries.
 */

import useFetchTheatreBySlug
    from "@/pages/theatres/hooks/fetch-theatre/useFetchTheatreBySlug.ts";
import useFetchScreenBySlug
    from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreenBySlug.ts";
import useFetchSeats
    from "@/pages/seats/hooks/query/useFetchSeats.ts";
import {QueryDefinition}
    from "@/common/type/query/loader/MultiQuery.types.ts";
import {TheatreDetailsSchema}
    from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema}
    from "@/pages/screens/schema/screen/Screen.schema.ts";
import {SeatDetailsArraySchema}
    from "@/pages/seats/schema/seat/SeatRelated.schema.ts";

/**
 * Slug parameters required to resolve screen-scoped data.
 */
type SlugParams = {
    /** Theatre identifier (slug) */
    theatreSlug: string;

    /** Screen identifier (slug) */
    screenSlug: string;
};

/**
 * Screen Details page query composer.
 *
 * Fetches:
 * - Theatre details
 * - Screen details
 * - Associated seats
 *
 * All queries enable population and virtuals
 * and are validated against their respective schemas.
 *
 * @param theatreSlug - Theatre slug
 * @param screenSlug - Screen slug
 * @returns Array of query definitions for page loading
 */
export default function useScreenDetailsPageQueries({theatreSlug, screenSlug}: SlugParams): QueryDefinition[] {

    const theatreQuery = useFetchTheatreBySlug({
        slug: theatreSlug,
        config: {populate: true, virtuals: true},
    });

    const screenQuery = useFetchScreenBySlug({
        slug: screenSlug,
        config: {populate: true, virtuals: true},
    });

    const seatQuery = useFetchSeats({
        queries: {screenSlug},
        config: {populate: true, virtuals: true},
    });

    return [
        {key: "theatre", query: theatreQuery, schema: TheatreDetailsSchema},
        {key: "screen", query: screenQuery, schema: ScreenDetailsSchema},
        {key: "seats", query: seatQuery, schema: SeatDetailsArraySchema},
    ];
}
