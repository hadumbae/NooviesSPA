import {UseFormReturn} from "react-hook-form";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import {ShowingSubmit} from "@/pages/showings/schema/ShowingSubmitSchema.ts";
import {Showing, ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<ShowingSubmit>,
    onSubmit?: (showing: Showing) => void,
}

export default function useShowingSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = ShowingRepository;
    const entityName = "Showing";
    const mutationKey = ['submit_showing_data'];
    const schema = ShowingSchema;

    return mutationFormSubmitHandler<Showing, typeof schema, ShowingSubmit>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}