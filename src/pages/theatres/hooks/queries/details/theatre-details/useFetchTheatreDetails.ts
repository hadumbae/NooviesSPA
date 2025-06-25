import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchScreens from "@/pages/screens/hooks/queries/useFetchScreens.ts";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";

import {
    FetchTheatreDetailsParams
} from "@/pages/theatres/hooks/queries/details/theatre-details/FetchTheatreDetailsParams.ts";
import {
    FetchTheatreDetailsReturns
} from "@/pages/theatres/hooks/queries/details/theatre-details/FetchTheatreDetailsReturns.ts";
import {PaginatedShowingSchema} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import {PaginatedScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";

export default function useFetchTheatreDetails(params: FetchTheatreDetailsParams): FetchTheatreDetailsReturns {
    const {theatreID, pagination: {screen: screenPagination = {}, showing: showingPagination = {}}} = params;

    const paginated = true;
    const baseQueries = {populate: true, theatre: theatreID};
    const {page: screenPage = 1, perPage: screenPerPage = 10} = screenPagination;
    const {page: showingPage = 1, perPage: showingPerPage = 10} = showingPagination;

    // Fetch

    const theatreQuery = useFetchTheatre({_id: theatreID});
    const screenQuery = useFetchScreens({...baseQueries, paginated, page: screenPage, perPage: screenPerPage});
    const showingQuery = useFetchShowings({...baseQueries, paginated, page: showingPage, perPage: showingPerPage});

    // Queries

    const queries = [theatreQuery, screenQuery, showingQuery];

    const isPending = queries.some(query => query.isPending);
    const isError = queries.some(query => query.isError);
    const queryError = queries.find(query => query.isPending)?.error ?? null;

    // Validation

    const theatreValidation = useValidateData({
        isPending,
        data: theatreQuery.data,
        schema: TheatreSchema,
        message: "Invalid Theatre Data."
    });

    const screenValidation = useValidateData({
        isPending,
        data: screenQuery.data,
        schema: PaginatedScreenSchema,
        message: "Invalid Screen Data."
    });

    const showingValidation = useValidateData({
        isPending,
        data: showingQuery.data,
        schema: PaginatedShowingSchema,
        message: "Invalid Screen Data."
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