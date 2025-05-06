import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {Showing, ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";

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

    const queryKey = ["fetch_single_showing", {_id, populate}];
    const schema = ShowingSchema;
    const action = () => ShowingRepository.get({_id, populate});

    return useFetchValidatedDataWithRedirect<typeof ShowingSchema, Showing>({queryKey, schema, action});
}