import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchPaginatedTheatreScreens from "@/pages/screens/hooks/queries/useFetchPaginatedTheatreScreens.ts";

interface Params {
    theatreID: string;
    page?: number;
    perPage?: number;
    showingsPerScreen?: number;
}

export default function useFetchTheatreAndScreens(params: Params) {
    const {theatreID, page = 1, perPage = 10, showingsPerScreen = 3} = params;

    const theatreQuery = useFetchTheatre({_id: theatreID});
    const screenQuery = useFetchPaginatedTheatreScreens({theatreID, page, perPage, showingsPerScreen});

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