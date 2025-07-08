import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {UseQueryResult} from "@tanstack/react-query";
import {ValidatedQueryReturns} from "@/common/type/validate-queries/ValidatedQueryReturns.ts";

type QueryParams = {
    isPending: boolean;
    queries: {
        theatre: UseQueryResult<TheatreDetails>;
        screen: UseQueryResult<ScreenDetails>;
    };
}

type ReturnData = {
    theatre: TheatreDetails;
    screen: ScreenDetails;
};

export default function useValidateTheatreScreenDetails(params: QueryParams): ValidatedQueryReturns<ReturnData> {
    /**
     * Queries
     */

    const {queries, isPending} = params;
    const {
        theatre: {data: theatre},
        screen: {data: screen},
    } = queries;

    /**
     * Validation
     */

    const theatreValidation = useValidateData({
        isPending,
        data: theatre,
        schema: TheatreDetailsSchema,
        message: "Invalid Theatre Data."
    });

    const screenValidation = useValidateData({
        isPending,
        data: screen,
        schema: ScreenDetailsSchema,
        message: "Invalid Screen Data."
    });

    const success = theatreValidation.success
        && screenValidation.success;

    const error = theatreValidation.error ?? screenValidation.error ?? null;

    /**
     * Returns
     */

    if (!success) return {data: null, success: false, error};

    return {
        data: {theatre: theatreValidation.data, screen: screenValidation.data},
        success: true,
        error: null,
    }
}