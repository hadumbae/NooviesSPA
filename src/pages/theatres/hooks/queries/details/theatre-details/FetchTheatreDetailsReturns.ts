import {PaginatedShowings} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import {PaginatedScreens} from "@/pages/screens/schema/screen/Screen.types.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

type ValidDetailReturns = {
    parseSuccess: true,
    parseError: null,
    data: {
        theatre: TheatreDetails,
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

