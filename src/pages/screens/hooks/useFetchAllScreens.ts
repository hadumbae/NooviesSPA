import QueryFilters from "@/common/type/QueryFilters.ts";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";
import {ScreenArray, ScreenArraySchema} from "@/pages/screens/schema/ScreenSchema.ts";

export default function useFetchAllScreens(params?: {filters?: QueryFilters}) {
    const {filters = {}} = params || {};

    const queryKey = "fetch_all_screens";
    const schema = ScreenArraySchema;
    const action = () => ScreenRepository.getAll({filters});

    return useFetchSchemaData<typeof ScreenArraySchema, ScreenArray>({schema, action, queryKey});
}