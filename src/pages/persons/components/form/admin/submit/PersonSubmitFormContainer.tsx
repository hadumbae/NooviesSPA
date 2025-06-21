import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import usePersonSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonSubmitForm.ts";
import usePersonSubmitMutation, {PersonSubmitParams} from "@/pages/persons/hooks/mutations/admin/usePersonSubmitMutation.ts";
import {PersonSubmit} from "@/pages/persons/schema/PersonSubmitSchema.ts";
import PersonSubmitFormView from "@/pages/persons/components/form/admin/submit/PersonSubmitFormView.tsx";

type SubmitFormParams = {
    onSubmit: (data: Person) => void;
} & ( | {
    isEditing: true;
    person: Person;
} | {
    isEditing?: false;
    person?: never;
})

const PersonSubmitFormContainer: FC<SubmitFormParams> = ({onSubmit, isEditing, person}) => {
    const form = usePersonSubmitForm({person});

    const mutationParams: PersonSubmitParams = isEditing
        ? {form, onSubmitSuccess: onSubmit, isEditing: true, _id: person._id }
        : {form, onSubmitSuccess: onSubmit, isEditing: false};

    const mutation = usePersonSubmitMutation(mutationParams);

    const onFormSubmit = (values: PersonSubmit) => {
        console.log("Person Submit Values: ", values);
        mutation.mutate(values);
    }

    return (
        <PersonSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
        />
    );
};

export default PersonSubmitFormContainer;
