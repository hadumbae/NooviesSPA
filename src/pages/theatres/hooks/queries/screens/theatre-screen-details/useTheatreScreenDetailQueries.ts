import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchSeats from "@/pages/seats/hooks/fetch/useFetchSeats.ts";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";
import {PaginatedSeatDetails} from "@/pages/seats/schema/seat/Seat.types.ts";
import {PaginatedShowingDetails} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import {FetchQueryReturns} from "@/common/type/validate-queries/FetchQueryReturns.ts";
import {UseQueryResult} from "@tanstack/react-query";

type FetchTheatreAndScreenParams = {
    theatreID: ObjectId;
    screenID: ObjectId;
    paginationOptions: {
        seatPage: number;
        seatsPerPage: number;
        showingPage: number;
        showingsPerPage: number;
    }
}

type ReturnQueries = {
    theatre: UseQueryResult<TheatreDetails>;
    screen: UseQueryResult<ScreenDetails>;
    seats: UseQueryResult<PaginatedSeatDetails>;
    showings: UseQueryResult<PaginatedShowingDetails>;
};

export default function useTheatreScreenDetailQueries(
    params: FetchTheatreAndScreenParams
): FetchQueryReturns<ReturnQueries> {
    const {theatreID, screenID, paginationOptions} = params;
    const {seatPage, seatsPerPage, showingPage, showingsPerPage} = paginationOptions;

    const theatreQuery = useFetchTheatre<TheatreDetails>({
        _id: theatreID,
        virtuals: true,
        populate: true,
    });

    const screenQuery = useFetchScreen<ScreenDetails>({
        _id: screenID,
        virtuals: true,
        populate: true,
    });

    const seatQuery = useFetchSeats<PaginatedSeatDetails>({
        screen: screenID,
        virtuals: true,
        populate: true,
        paginated: true,
        page: seatPage,
        perPage: seatsPerPage,
    });

    const showingQuery = useFetchShowings<PaginatedShowingDetails>({
        screen: screenID,
        virtuals: true,
        populate: true,
        paginated: true,
        page: showingPage,
        perPage: showingsPerPage,
    });

    const queries = [theatreQuery, screenQuery, seatQuery, showingQuery];

    const isSuccess = queries.some(q => q.isSuccess);
    const isPending = queries.some(q => q.isPending);
    const isError = queries.some(q => q.isError);
    const error = queries.find(q => q.isError)?.error ?? null;

    return {
        queries: {
            theatre: theatreQuery,
            screen: screenQuery,
            seats: seatQuery,
            showings: showingQuery,
        },
        isSuccess,
        isPending,
        isError,
        error,
    };
}