import {FC} from 'react';
import useScreenSubmitForm from "@/pages/screens/hooks/screens/submit-screen-data/useScreenSubmitForm.ts";
import useScreenSubmitMutation, {
    ScreenSubmitMutationParams
} from "@/pages/screens/hooks/screens/submit-screen-data/useScreenSubmitMutation.ts";
import ScreenSubmitFormView from "@/pages/screens/components/forms/ScreenSubmitFormView.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";

type Props = FormMutationOnSubmitParams<Screen> & { 
    className?: string;
    presetValues?: Partial<ScreenForm>;
    disableFields?: (keyof ScreenFormValues)[];
} & (| {
    isEditing: true;
    screen: Screen;
} | {
    isEditing?: false;
    screen?: never;
});

const ScreenSubmitFormContainer: FC<Props> = (params) => {
    const {className, isEditing, screen, presetValues, disableFields, ...mutationOptions} = params;
    const form = useScreenSubmitForm({screen, presetValues});

    const mutationParams: ScreenSubmitMutationParams = isEditing
        ? {form, isEditing: true, _id: screen._id, ...mutationOptions}
        : {form, isEditing: false, ...mutationOptions};

    const mutation = useScreenSubmitMutation(mutationParams);

    const onFormSubmit = (values: ScreenFormValues) => {
        console.log("Screen Submit Values: ", values);
        mutation.mutate(values as ScreenForm);
    }

    return (
        <ScreenSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
            className={className}
            disableFields={disableFields}
        />
    );
};

export default ScreenSubmitFormContainer;
