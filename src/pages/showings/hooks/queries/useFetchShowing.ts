import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";
import {Showing, ShowingSchema} from "@/pages/showings/schema/ShowingSchema.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {QueryFilters} from "@tanstack/react-query";

export default function useFetchShowing(params: { _id: ObjectId, populate?: boolean, filters?: QueryFilters }) {
    const {_id, populate = false} = params;

    const queryKey = "fetch_single_showing";
    const schema = ShowingSchema;
    const action = () => ShowingRepository.get({_id, populate});

    return useFetchSchemaData<typeof ShowingSchema, Showing>({queryKey, schema, action});
}