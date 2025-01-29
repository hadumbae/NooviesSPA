import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";
import {Theatre, TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";

export default function useFetchTheatre({_id}: { _id: ObjectId }) {
    const queryKey = "fetch_single_theatre";
    const schema = TheatreSchema;
    const action = () => TheatreRepository.get({_id});

    return useFetchSchemaData<typeof TheatreSchema, Theatre>({queryKey, schema, action});
}