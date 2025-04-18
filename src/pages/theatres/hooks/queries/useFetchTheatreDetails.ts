import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import {useFetchPaginatedScreens} from "@/pages/screens/hooks/queries/useFetchPaginatedScreens.ts";
import {useFetchPaginatedShowings} from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";

interface Params {
    theatreID: ObjectId;
    screen?: { page?: number, perPage?: number };
    showing?: { page?: number; perPage?: number };
}

export default function useFetchTheatreDetails({theatreID, screen, showing}: Params) {
    const {page: screenPage = 1, perPage: screenPerPage = 10} = screen || {};
    const {page: showingPage = 1, perPage: showingPerPage = 10} = showing || {};

    const filters = {theatre: theatreID};

    const theatreQuery = useFetchTheatre({_id: theatreID});

    const screenQuery = useFetchPaginatedScreens({
        page: screenPage,
        perPage: screenPerPage,
        populate: true,
        filters
    });

    const showingQuery = useFetchPaginatedShowings({
        page: showingPage,
        perPage: showingPerPage,
        populate: true,
        filters
    });

    const queries = [theatreQuery, screenQuery, showingQuery];

    const isPending = queries.some(query => query.isPending);
    const isError = queries.some(query => query.isError);
    const error = queries.find(query => query.isPending)?.error ?? null;

    return {
        theatre: theatreQuery.data,
        paginatedScreens: screenQuery.data,
        paginatedShowings: showingQuery.data,
        isPending,
        isError,
        error,
    }
}