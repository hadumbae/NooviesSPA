import {UseFormReturn} from "react-hook-form";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreForm} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<TheatreForm>,
    onSubmit?: (theatre: TheatreDetails) => void,
}

export default function useTheatreSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = TheatreRepository;
    const entityName = "Theatre";
    const mutationKey = ['submit_theatre_data'];
    const schema = TheatreSchema;

    return mutationFormSubmitHandler<TheatreDetails, typeof schema, TheatreForm>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}