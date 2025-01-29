import {UseFormReturn} from "react-hook-form";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenSchema} from "@/pages/screens/schema/ScreenSchema.ts";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import {ScreenSubmit} from "@/pages/screens/schema/ScreenSubmitSchema.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<ScreenSubmit>,
    onSubmit?: (screen: Screen) => void,
}

export default function useScreenSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = ScreenRepository;
    const entityName = "Screen";
    const mutationKey = ['submit_screen_data'];
    const schema = ScreenSchema;

    return mutationFormSubmitHandler<Screen, typeof ScreenSchema, ScreenSubmit>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}