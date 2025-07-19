import {FC} from 'react';
import useTheatreSubmitForm from "@/pages/theatres/hooks/forms/useTheatreSubmitForm.ts";
import useTheatreSubmitMutation, {
    TheatreSubmitMutationParams
} from "@/pages/theatres/hooks/mutations/useTheatreSubmitMutation.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreForm, TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import TheatreSubmitFormView from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormView.tsx";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";

type Props = FormMutationOnSubmitParams<Theatre> & {
    className?: string;
    disableFields?: (keyof TheatreFormValues)[];
    presetValues?: Partial<TheatreFormValues>;
} & ( | {
    isEditing: true;
    theatre: Theatre;
} | {
    isEditing?: false;
    theatre?: never;
});

const TheatreSubmitFormContainer: FC<Props> = (params) => {
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
