/**
 * @file PersonSubmitFormContainer.tsx
 *
 * Container component for creating or editing `Person` entities.
 *
 * Responsibilities:
 * - Initializes the form via `usePersonSubmitForm`
 * - Configures submit mutation via `usePersonSubmitMutation`
 * - Bridges form state and mutation logic to the presentational view
 */

import {FC} from 'react';
import usePersonSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonSubmitForm.ts";
import usePersonSubmitMutation from "@/pages/persons/hooks/mutations/admin/usePersonSubmitMutation.ts";
import PersonSubmitFormView from "@/pages/persons/components/form/admin/submit/PersonSubmitFormView.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm, PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link PersonSubmitFormContainer}.
 */
type SubmitFormParams =
    FormContainerProps<Person, Person, PersonFormValues>;

/**
 * Form container for submitting `Person` data.
 *
 * Determines create vs update mode based on `isEditing`,
 * and passes all required state and handlers to
 * {@link PersonSubmitFormView}.
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

    /**
     * Handles form submission.
     */
    const onFormSubmit = (values: PersonFormValues) => {
        mutation.mutate(values as PersonForm);
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
