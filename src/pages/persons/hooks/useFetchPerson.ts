import {useQuery} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {Person, PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default function useFetchPerson({_id}: { _id: ObjectId }) {
    const queryFn = async () => {
        const fetchQueryFn = () => PersonRepository.get({_id});
        const {result} = await useFetchErrorHandler({fetchQueryFn});

        return parseResponseData<typeof PersonSchema, Person>({
            schema: PersonSchema,
            data: result
        });
    }

    return useQuery({queryKey: ['fetch_single_person'], queryFn});
}