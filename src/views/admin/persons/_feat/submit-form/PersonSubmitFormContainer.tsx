/**
 * @fileoverview Container component for Person entity management.
 * Orchestrates the relationship between form state, server-side mutations,
 * and the presentational view.
 */

import {FC} from 'react';
import usePersonSubmitForm from "@/domains/persons/_feat/submit-form/usePersonSubmitForm.ts";
import usePersonSubmitMutation from "@/domains/persons/_feat/submit-form/usePersonSubmitMutation.ts";
import PersonSubmitFormView from "@/views/admin/persons/_feat/submit-form/PersonSubmitFormView.tsx";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {PersonFormData, PersonFormValues} from "@/domains/persons/_feat/submit-form";

/**
 * Props for the {@link PersonSubmitFormContainer}.
 */
type SubmitFormParams =
    FormContainerProps<Person, Person, PersonFormValues>;

/**
 * Logic-heavy container for the Person submission flow.
 */
const PersonSubmitFormContainer: FC<SubmitFormParams> = (params) => {
    const {isEditing, entity, presetValues, disableFields, ...onSubmitParams} = params;

    const form = usePersonSubmitForm({
        person: entity,
        presetValues,
        ...onSubmitParams,
    });

    const mutation = usePersonSubmitMutation({
        form,
        editID: entity?._id,
        ...onSubmitParams,
    });

    const onFormSubmit = (values: PersonFormData) => {
        mutation.mutate(values);
    };

    return (
        <PersonSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
            disableFields={disableFields}
        />
    );
};

export default PersonSubmitFormContainer;