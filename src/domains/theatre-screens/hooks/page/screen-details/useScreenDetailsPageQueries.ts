/**
 * @fileoverview Composes the data-fetching queries required for the Screen Details administrative page.
 */

import {useFetchScreenBySlug} from "@/domains/theatre-screens/_feat/crud-hooks";
import useFetchSeats from "@/domains/seats/hooks/query/useFetchSeats.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import {SeatDetailsArraySchema} from "@/domains/seats/schema/seat/SeatRelated.schema.ts";
import {TheatreScreenDetailsSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenDetailsSchema.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";

/** Props for the useScreenDetailsPageQueries hook. */
type SlugParams = {
    theatreSlug: string;
    screenSlug: string;
};

/**
 * Aggregates theatre, screen, and seat queries into a unified definition for page-level data loading.
 */
export default function useScreenDetailsPageQueries({theatreSlug, screenSlug}: SlugParams): QueryDefinition[] {
    const theatreQuery = useFetchTheatreBySlug({
        schema: TheatreDetailsSchema,
        slug: theatreSlug,
        config: {populate: true, virtuals: true},
    });

    const screenQuery = useFetchScreenBySlug({
        schema: TheatreScreenDetailsSchema,
        slug: screenSlug,
        config: {populate: true, virtuals: true},
    });

    const seatQuery = useFetchSeats({
        queries: {screenSlug},
        config: {populate: true, virtuals: true},
    });

    return [
        {key: "theatre", query: theatreQuery, schema: TheatreDetailsSchema},
        {key: "screen", query: screenQuery, schema: TheatreScreenDetailsSchema},
        {key: "seats", query: seatQuery, schema: SeatDetailsArraySchema},
    ];
}