import {FC} from 'react';
import usePersonSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonSubmitForm.ts";
import usePersonSubmitMutation, {
    PersonSubmitParams
} from "@/pages/persons/hooks/mutations/admin/usePersonSubmitMutation.ts";
import PersonSubmitFormView from "@/pages/persons/components/form/admin/submit/PersonSubmitFormView.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm, PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for `PersonSubmitFormContainer`.
 *
 * @template TEntity - The entity type being created or edited (here `Person`).
 * @template TFormValues - The shape of the form values (`PersonFormValues`).
 * @property isEditing - Whether the form is in edit mode.
 * @property entity - The existing person entity (required if editing).
 * @property presetValues - Optional preset values for initializing the form.
 * @property disableFields - Optional flag to disable form fields.
 * @property onSubmitParams - Additional callbacks or configuration for submission (success, error, messages, etc.).
 */
type SubmitFormParams = FormContainerProps<Person, Person, PersonFormValues>;

/**
 * Container component for creating or editing a person.
 *
 * @remarks
 * - Initializes a `react-hook-form` instance using `usePersonSubmitForm`.
 * - Configures a mutation via `usePersonSubmitMutation` to handle form submission.
 * - Determines whether the form is creating a new entity or editing an existing one based on `isEditing`.
 * - Passes form instance, submit handler, mutation object, and optional disabled fields to `PersonSubmitFormView`.
 *
 * @example
 * ```tsx
 * <PersonSubmitFormContainer
 *   isEditing={false}
 *   presetValues={{name: "John Doe"}}
 *   onSuccess={() => console.log("Person created successfully")}
 * />
 *
 * <PersonSubmitFormContainer
 *   isEditing={true}
 *   entity={existingPerson}
 *   disableFields={false}
 * />
 * ```
 */
const PersonSubmitFormContainer: FC<SubmitFormParams> = (params) => {
    const {isEditing, entity, presetValues, disableFields, ...onSubmitParams} = params;

    const form = usePersonSubmitForm({person: entity, presetValues, ...onSubmitParams});

    const mutationParams: PersonSubmitParams = isEditing
        ? {form, isEditing: true, _id: entity._id, ...onSubmitParams}
        : {form, isEditing: false, ...onSubmitParams};

    const mutation = usePersonSubmitMutation(mutationParams);

    /**
     * Handles the form submission.
     *
     * @param values - The values collected from the form.
     */
    const onFormSubmit = (values: PersonFormValues) => {
        console.log("Person Submit Values: ", values);
        mutation.mutate(values as PersonForm);
    }

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
