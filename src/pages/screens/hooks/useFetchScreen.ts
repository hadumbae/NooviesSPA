import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenSchema, Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import useFetchSchemaData from "@/common/hooks/useFetchSchemaData.ts";

export default function useFetchScreen({_id}: { _id: ObjectId }) {
    const queryKey = "fetch_single_screen";
    const schema = ScreenSchema;
    const action = () => ScreenRepository.get({_id});

    return useFetchSchemaData<typeof ScreenSchema, Screen>({queryKey, schema, action});
}