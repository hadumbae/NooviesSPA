import {TheatreScreenRepository} from "@/pages/theatres/repositories/TheatreScreenRepository.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {
    PaginatedTheatreScreens,
    PaginatedTheatreScreenSchema
} from "@/pages/screens/schema/theatre/TheatreScreenPaginationSchema.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface UseFetchTheatreScreensParams {
    theatreID: ObjectId;
    page?: number;
    perPage?: number;
    showingsPerScreen?: number;
}

export default function useFetchPaginatedTheatreScreens(params: UseFetchTheatreScreensParams) {
    const {theatreID, page = 1, perPage = 10, showingsPerScreen = 3} = params;
    const queries = {page, perPage, showingsPerScreen};

    const queryKey = ["fetch_theatre_screens", queries];
    const schema = PaginatedTheatreScreenSchema;
    const action = () => TheatreScreenRepository.fetchTheatreScreens({theatreID, queries});

    return useFetchValidatedDataWithRedirect<typeof PaginatedTheatreScreenSchema, PaginatedTheatreScreens>({queryKey, schema, action});
}