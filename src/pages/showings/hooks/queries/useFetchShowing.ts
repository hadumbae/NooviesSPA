import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import useQueryWithRedirect from "@/common/hooks/errors/useQueryWithRedirect.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";

/**
 * Custom hook to fetch a single showing's data by its ID.
 *
 * @param params - The parameters for fetching the showing data.
 * @param params._id - The unique identifier of the showing to fetch.
 * @param [params.populate=false] - Whether to populate related data (default is false).
 *
 * @returns A query result object containing the fetched showing data.
 *
 * @throws {@link ParseError} If the fetched data is invalid according to the schema.
 *
 * @remarks
 * This hook utilizes `useQueryWithRedirect` to fetch the showing data and handle any errors.
 * If the data is invalid, a `ParseError` is thrown.
 */
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