import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {Theatre, TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default function useFetchTheatre({_id, populate = false}: { _id: ObjectId, populate?: boolean }) {
    const queryKey = ["fetch_single_theatre", {_id, populate}];
    const schema = TheatreSchema;
    const action = () => TheatreRepository.get({_id, populate});

    return useFetchValidatedDataWithRedirect<typeof TheatreSchema, Theatre>({queryKey, schema, action});
}