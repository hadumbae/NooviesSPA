import {FC} from 'react';
import usePersonSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonSubmitForm.ts";
import usePersonSubmitMutation, {PersonSubmitParams} from "@/pages/persons/hooks/mutations/admin/usePersonSubmitMutation.ts";
import PersonSubmitFormView from "@/pages/persons/components/form/admin/submit/PersonSubmitFormView.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm} from "@/pages/persons/schema/forms/PersonForm.types.ts";

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

    const onFormSubmit = (values: PersonForm) => {
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
