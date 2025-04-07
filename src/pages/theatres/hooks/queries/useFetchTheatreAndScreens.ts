import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import {useFetchPaginatedScreens} from "@/pages/screens/hooks/useFetchPaginatedScreens.ts";

interface Params {
    theatreID: string;
    page?: number;
    perPage?: number;
    populate?: boolean;
}

export default function useFetchTheatreAndScreens({theatreID, page = 1, perPage = 10, populate = false}: Params) {
    const filters = {theatre: theatreID};

    const theatreQuery = useFetchTheatre({_id: theatreID});
    const screenQuery = useFetchPaginatedScreens({page, perPage, filters, populate});

    const isPending = [theatreQuery, screenQuery].some(query => query.isPending);
    const isError = [theatreQuery, screenQuery].some(query => query.isError);
    const error = [theatreQuery, screenQuery].find(query => query.error)?.error ?? null;

    return {
        theatre: theatreQuery.data,
        screens: screenQuery.data?.items,
        totalItems: screenQuery.data?.totalItems,
        isPending,
        isError,
        error,
        refetchTheatre: theatreQuery.refetch,
        refetchScreens: screenQuery.refetch,
    }
}