import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenSchema, Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default function useFetchScreen({_id}: { _id: ObjectId }) {
    const queryKey = ["fetch_single_screen", {_id}];
    const schema = ScreenSchema;
    const action = () => ScreenRepository.get({_id, populate: true});

    return useFetchValidatedDataWithRedirect<typeof ScreenSchema, Screen>({queryKey, schema, action});
}