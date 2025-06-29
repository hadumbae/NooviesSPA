import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {PaginatedSeatDetailsSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {PaginatedSeatDetails} from "@/pages/seats/schema/seat/Seat.types.ts";
import {
    PaginatedShowingDetails,
    PaginatedShowingDetailsSchema
} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import {UseQueryResult} from "@tanstack/react-query";
import {ValidatedQueryReturns} from "@/common/type/validate-queries/ValidatedQueryReturns.ts";

type QueryParams = {
    isPending: boolean;
    queries: {
        theatre: UseQueryResult<TheatreDetails>;
        screen: UseQueryResult<ScreenDetails>;
        seats: UseQueryResult<PaginatedSeatDetails>;
        showings: UseQueryResult<PaginatedShowingDetails>;
    };
}

type ReturnData = {
    theatre: TheatreDetails;
    screen: ScreenDetails;
    seats: PaginatedSeatDetails;
    showings: PaginatedShowingDetails;
};

export default function useValidateTheatreScreenDetails(params: QueryParams): ValidatedQueryReturns<ReturnData> {
    /**
     * Queries
     */

    const {queries, isPending} = params;
    const {
        theatre: {data: theatre},
        screen: {data: screen},
        seats: {data: seats},
        showings: {data: showings},
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

    const seatValidation = useValidateData({
        isPending,
        data: seats,
        schema: PaginatedSeatDetailsSchema,
        message: "Invalid Seat Data."
    });

    const showingValidation = useValidateData({
        isPending,
        data: showings,
        schema: PaginatedShowingDetailsSchema,
        message: "Invalid Showing Data."
    });

    const success = theatreValidation.success
        && screenValidation.success
        && seatValidation.success
        && showingValidation.success;

    const error = theatreValidation.error
        ?? screenValidation.error
        ?? theatreValidation.error
        ?? screenValidation.error
        ?? null;

    /**
     * Returns
     */

    if (!success) return {data: null, success: false, error};

    return {
        data: {
            theatre: theatreValidation.data,
            screen: screenValidation.data,
            seats: seatValidation.data,
            showings: showingValidation.data,
        },
        success: true,
        error: null,
    }
}