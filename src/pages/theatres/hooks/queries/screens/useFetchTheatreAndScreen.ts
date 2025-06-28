import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchScreen from "@/pages/screens/hooks/queries/useFetchScreen.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FetchHookReturns} from "@/common/type/fetch/FetchHookReturns.ts";

type FetchTheatreAndScreenParams = {
    theatreID: ObjectId;
    screenID: ObjectId;
}

type ReturnData = {
    theatre: TheatreDetails;
    screen: ScreenDetails;
};

export default function useFetchTheatreAndScreen(params: FetchTheatreAndScreenParams): FetchHookReturns<ReturnData> {
    const {theatreID, screenID} = params;

    const theatreQuery = useFetchTheatre({_id: theatreID, virtuals: true, populate: true});
    const screenQuery = useFetchScreen({_id: screenID, virtuals: true, populate: true});

    const isPending = theatreQuery.isPending || screenQuery.isPending;
    const isError = theatreQuery.isError || screenQuery.isError;
    const queryError = theatreQuery.error ?? screenQuery.error ?? null;

    const theatreValidation = useValidateData({
        isPending,
        data: theatreQuery.data,
        schema: TheatreDetailsSchema,
        message: "Invalid Theatre Data."
    });

    const screenValidation = useValidateData({
        isPending,
        data: screenQuery.data,
        schema: ScreenDetailsSchema,
        message: "Invalid Screen Data."
    });

    const parseSuccess = theatreValidation.success && screenValidation.success;
    const parseError = theatreValidation.error ?? screenValidation.error ?? null;

    const baseReturns = {isPending, isError, queryError};

    if (!parseSuccess) return {data: null, parseSuccess: false, parseError, ...baseReturns,};

    return {
        data: {theatre: theatreValidation.data, screen: screenValidation.data},
        parseSuccess: true,
        parseError: null,
        ...baseReturns,
    }
}