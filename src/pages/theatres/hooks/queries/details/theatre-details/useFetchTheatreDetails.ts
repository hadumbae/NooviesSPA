import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchScreens from "@/pages/screens/hooks/queries/useFetchScreens.ts";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";

import {PaginatedShowingSchema} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import {PaginatedScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";

import {
    FetchTheatreDetailsParams
} from "@/pages/theatres/hooks/queries/details/theatre-details/FetchTheatreDetailsParams.ts";

import {
    FetchTheatreDetailsReturns
} from "@/pages/theatres/hooks/queries/details/theatre-details/FetchTheatreDetailsReturns.ts";

/**
 * Composite React Query hook that fetches full theatre details including:
 * - Theatre metadata (with virtuals and population)
 * - Paginated screens
 * - Paginated showings
 *
 * It also performs schema validation using Zod to ensure response integrity.
 * Returns both query and validation state, unified into a single object.
 *
 * @param params - Parameters including the theatre ID and pagination config for screens and showings.
 * @returns An object containing:
 * - `isPending`: Whether any of the queries are still loading
 * - `isError`: Whether any of the queries failed
 * - `queryError`: First query error encountered, if any
 * - `parseSuccess`: Whether all queries passed validation
 * - `parseError`: Combined validation error, if any
 * - `data`: Parsed result or nulls if invalid
 */
export default function useFetchTheatreDetails(params: FetchTheatreDetailsParams): FetchTheatreDetailsReturns {
    const {theatreID, pagination: {screen: screenPagination = {}, showing: showingPagination = {}}} = params;

    const paginated = true;
    const baseQueries = {populate: true, theatre: theatreID};
    const {page: screenPage = 1, perPage: screenPerPage = 10} = screenPagination;
    const {page: showingPage = 1, perPage: showingPerPage = 10} = showingPagination;

    // Queries
    const theatreQuery = useFetchTheatre({
        _id: theatreID,
        populate: true,
        virtuals: true,
    });

    const screenQuery = useFetchScreens({
        ...baseQueries,
        paginated,
        page: screenPage,
        perPage: screenPerPage,
        populate: true,
        virtuals: true
    });

    const showingQuery = useFetchShowings({
        ...baseQueries,
        paginated,
        page: showingPage,
        perPage: showingPerPage,
    });

    const queries = [theatreQuery, screenQuery, showingQuery];

    const isPending = queries.some(query => query.isPending);
    const isError = queries.some(query => query.isError);
    const queryError = queries.find(query => query.isPending)?.error ?? null;

    // Validation

    const theatreValidation = useValidateData({
        isPending,
        data: theatreQuery.data,
        schema: TheatreDetailsSchema,
        message: "Invalid Theatre Data."
    });

    const screenValidation = useValidateData({
        isPending,
        data: screenQuery.data,
        schema: PaginatedScreenDetailsSchema,
        message: "Invalid Screen Data."
    });

    const showingValidation = useValidateData({
        isPending,
        data: showingQuery.data,
        schema: PaginatedShowingSchema,
        message: "Invalid Showing Data."
    });

    const parseSuccess = theatreValidation.success && screenValidation.success && showingValidation.success;
    const parseError = theatreValidation.error ?? screenValidation.error ?? showingValidation.error;

    const baseReturns = {isPending, isError, queryError};

    if (parseSuccess) {
        return {
            ...baseReturns,
            parseSuccess: true,
            parseError: null,
            data: {
                theatre: theatreValidation.data,
                screens: screenValidation.data,
                showings: showingValidation.data
            },
        };
    }

    return {
        ...baseReturns,
        data: {theatre: null, screens: null, showings: null},
        parseSuccess: false,
        parseError,
    }
}