import {UseFormReturn} from "react-hook-form";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {Theatre, TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {TheatreSubmit} from "@/pages/theatres/schema/TheatreSubmitSchema.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<TheatreSubmit>,
    onSubmit?: (theatre: Theatre) => void,
}

export default function useTheatreSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = TheatreRepository;
    const entityName = "Theatre";
    const mutationKey = ['submit_theatre_data'];
    const schema = TheatreSchema;

    return mutationFormSubmitHandler<Theatre, typeof schema, TheatreSubmit>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}