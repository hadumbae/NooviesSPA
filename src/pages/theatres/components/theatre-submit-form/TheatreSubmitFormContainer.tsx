import {FC} from 'react';
import useTheatreSubmitForm from "@/pages/theatres/hooks/forms/useTheatreSubmitForm.ts";
import useTheatreSubmitMutation, {
    TheatreSubmitMutationParams
} from "@/pages/theatres/hooks/features/submit-form/useTheatreSubmitMutation.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreForm, TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import TheatreSubmitFormView from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormView.tsx";

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

type SubmitEditProps = (
    { isEditing: true, theatre: Theatre } |
    { isEditing?: false, theatre?: never }
);

type SubmitFormProps = Omit<MutationOnSubmitParams<Theatre>, "onSubmitSuccess"> & {
    className?: string;
    disableFields?: (keyof TheatreFormValues)[];
    presetValues?: Partial<TheatreFormValues>;
    onSubmitSuccess?: (theatre: Theatre) => void;
} & SubmitEditProps;

const TheatreSubmitFormContainer: FC<SubmitFormProps> = (params) => {
    const {isEditing, theatre, disableFields, presetValues, className, ...mutationOptions} = params;

    const form = useTheatreSubmitForm({theatre, presetValues});

    const mutationParams: TheatreSubmitMutationParams = isEditing
        ? {isEditing: true, _id: theatre._id, form, ...mutationOptions}
        : {isEditing: false, form, ...mutationOptions};

    const mutation = useTheatreSubmitMutation(mutationParams);

    const onFormSubmit = (values: TheatreFormValues) => {
        console.log("Theatre Submit Values : ", values);
        mutation.mutate(values as TheatreForm);
    }

    return (
        <TheatreSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default TheatreSubmitFormContainer;
