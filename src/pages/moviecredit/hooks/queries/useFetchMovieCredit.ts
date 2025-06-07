import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useQuery} from "@tanstack/react-query";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

type FetchParams = {
    _id: ObjectId;
    populate?: boolean;
}


export default function useFetchMovieCredit(params: FetchParams) {
    const {_id, populate = false} = params;

    const queryKey = ["fetch_movie_credit", {_id, populate}];
    const action = async () => {
        const {response, result} = await MovieCreditRepository.get({_id, populate});

        if (!response.ok) {
            const message = "Failed to fetch movie credit. Please try again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({
        queryKey,
        queryFn: action,
    });
}