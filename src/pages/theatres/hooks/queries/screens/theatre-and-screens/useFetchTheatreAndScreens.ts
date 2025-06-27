import useFetchTheatre from "@/pages/theatres/hooks/queries/useFetchTheatre.ts";
import useFetchScreens, {FetchScreenQueries} from "@/pages/screens/hooks/queries/useFetchScreens.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {PaginatedScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {
    FetchTheatreAndScreensReturns
} from "@/pages/theatres/hooks/queries/screens/theatre-and-screens/FetchTheatreAndScreensReturns.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {PaginatedScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";

interface Params {
    theatreID: string;
    screenOptions?: {
        page?: number;
        perPage?: number;
    }
}

export default function useFetchTheatreAndScreens(
    params: Params
): FetchTheatreAndScreensReturns<TheatreDetails, PaginatedScreenDetails> {
    const {theatreID, screenOptions} = params;
    const {page = 1, perPage = 10} = screenOptions || {};

    const screenQueryParams: FetchScreenQueries = {
        paginated: true,
        theatre: theatreID,
        page,
        perPage,
        populate: true,
        virtuals: true,
    };

    // Query

    const theatreQuery = useFetchTheatre({_id: theatreID, virtuals: true, populate: true});
    const screenQuery = useFetchScreens(screenQueryParams);

    const isPending = theatreQuery.isPending || screenQuery.isPending;
    const isError = theatreQuery.isPending || screenQuery.isPending;
    const queryError = [theatreQuery, screenQuery].find(query => query.error)?.error ?? null;

    // Validation

    const theatreValidation = useValidateData({isPending, data: theatreQuery.data, schema: TheatreDetailsSchema});
    const screenValidation = useValidateData({isPending, data: screenQuery.data, schema: PaginatedScreenDetailsSchema});

    const parseSuccess = theatreValidation.success && screenValidation.success;
    const parseError = theatreValidation.error ?? screenValidation.error ?? null;

    // Returns

    const baseReturns = {isPending, isError, queryError};

    if (!parseSuccess) {
        return {
            data: {theatre: null, screens: null},
            parseSuccess: false,
            parseError,
            ...baseReturns,
        };
    }

    return {
        data: {theatre: theatreValidation.data, screens: screenValidation.data},
        parseSuccess: true,
        parseError: null,
        ...baseReturns,
    }
}