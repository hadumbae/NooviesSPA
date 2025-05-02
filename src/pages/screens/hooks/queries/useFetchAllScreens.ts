import QueryFilters from "@/common/type/QueryFilters.ts";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {ScreenArray, ScreenArraySchema} from "@/pages/screens/schema/base/ScreenSchema.ts";

export default function useFetchAllScreens(params?: {filters?: QueryFilters}) {
    const {filters = {}} = params || {};

    const queryKey = "fetch_all_screens";
    const schema = ScreenArraySchema;
    const action = () => ScreenRepository.getAll({filters});

    return useFetchValidatedDataWithRedirect<typeof ScreenArraySchema, ScreenArray>({schema, action, queryKey});
}