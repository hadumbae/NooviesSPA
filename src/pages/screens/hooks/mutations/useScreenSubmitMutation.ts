import {UseFormReturn} from "react-hook-form";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import mutationFormSubmitHandler from "@/common/handlers/mutation/MutationFormSubmitHandler.ts";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm} from "@/pages/screens/schema/forms/ScreenForm.types.ts";

interface Params {
    _id?: string,
    form: UseFormReturn<ScreenForm>,
    onSubmit?: (screen: Screen) => void,
}

export default function useScreenSubmitMutation(
    {_id, form, onSubmit}: Params
) {
    const repository = ScreenRepository;
    const entityName = "Screen";
    const mutationKey = ['submit_screen_data'];
    const schema = ScreenSchema;

    return mutationFormSubmitHandler<Screen, typeof ScreenSchema, ScreenForm>({
        _id,
        repository,
        entityName,
        mutationKey,
        form,
        schema,
        onSubmit,
    });
}