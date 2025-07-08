import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FetchQueryReturns} from "@/common/type/validate-queries/FetchQueryReturns.ts";
import {UseQueryResult} from "@tanstack/react-query";

type FetchTheatreAndScreenParams = {
    theatreID: ObjectId;
    screenID: ObjectId;
}

type ReturnQueries = {
    theatre: UseQueryResult<TheatreDetails>;
    screen: UseQueryResult<ScreenDetails>;
};

export default function useTheatreScreenDetailQueries(
    params: FetchTheatreAndScreenParams
): FetchQueryReturns<ReturnQueries> {
    const {theatreID, screenID} = params;

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

    const queries = [theatreQuery, screenQuery];

    const isSuccess = queries.some(q => q.isSuccess);
    const isPending = queries.some(q => q.isPending);
    const isError = queries.some(q => q.isError);
    const error = queries.find(q => q.isError)?.error ?? null;

    return {
        queries: {
            theatre: theatreQuery,
            screen: screenQuery,
        },
        isSuccess,
        isPending,
        isError,
        error,
    };
}