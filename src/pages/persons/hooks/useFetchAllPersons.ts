import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {PersonArraySchema, Persons} from "@/pages/persons/schema/PersonSchema.ts";
import {useQuery} from "@tanstack/react-query";

export default function useFetchAllPersons({filters}: { filters: QueryFilters }) {
    const fetchPersons = async () => {
        const fetchQueryFn = () => PersonRepository.getAll({filters});
        const {result} = await useFetchErrorHandler({fetchQueryFn});

        return parseResponseData<typeof PersonArraySchema, Persons>({
            schema: PersonArraySchema,
            data: result,
        });
    }

    return useQuery({queryKey: ['fetch_all_persons'], queryFn: fetchPersons});
}