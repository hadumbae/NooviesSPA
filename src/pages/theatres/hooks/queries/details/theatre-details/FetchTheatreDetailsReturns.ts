import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {PaginatedScreens} from "@/pages/screens/schema/ScreenPaginationSchema.ts";
import {PaginatedShowings} from "@/pages/showings/schema/ShowingPaginationSchema.ts";

type ValidDetailReturns = {
    parseSuccess: true,
    parseError: null,
    data: {
        theatre: Theatre,
        screens: PaginatedScreens,
        showings: PaginatedShowings,
    }
}

type InvalidDetailReturns = {
    parseSuccess: false,
    parseError: Error | null,
    data: {
        theatre: null,
        screens: null,
        showings: null,
    }
}

export type FetchTheatreDetailsReturns = {
    isPending: boolean,
    isError: boolean,
    queryError: Error | null,
} & (| ValidDetailReturns | InvalidDetailReturns);

