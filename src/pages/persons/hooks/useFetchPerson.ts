import {useQuery, UseQueryResult} from "@tanstack/react-query";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

type FetchProps = RequestOptions & {
    _id: ObjectId,
};

/**
 * React Query hook to fetch a person by ID, allowing optional population and virtual fields.
 *
 * This is a raw fetch hook that returns unvalidated data.
 * Use a separate validation hook or schema if the result shape needs to be enforced.
 *
 * @param params - The person ID and optional request options (`populate`, `virtuals`).
 * @returns A React Query result with raw person data or error information.
 */
export default function useFetchPerson(params: FetchProps): UseQueryResult<unknown> {
    const {_id, populate = false, virtuals = false, limit} = params;

    const queryKey = ["fetch_single_person", {_id, populate, virtuals, limit}] as const;

    const fetchPerson = async (): Promise<unknown> => {
        const {result, response} = await PersonRepository.get({_id, populate, virtuals, limit});

        if (!response.ok) {
            const message = "Failed to fetch person. Please try again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({
        queryKey: queryKey,
        queryFn: fetchPerson,
    });
}