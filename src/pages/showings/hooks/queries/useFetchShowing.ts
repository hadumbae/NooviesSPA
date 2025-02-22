import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";

export default function useFetchShowing(params: { _id: ObjectId, populate?: boolean }) {
    const {_id, populate = false} = params;


    const queryKey = "fetch_single_showing";
    const fetchData = async () => {
        const action = () => ShowingRepository.get({_id, populate});
        const {result} = await handleFetchError({fetchQueryFn: action});
        return result;
    }

    return useQueryWithRedirect({
        queryKey: [queryKey],
        queryFn: fetchData,
    });
}