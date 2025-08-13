import {FC} from 'react';
import usePersonSubmitForm from "@/pages/persons/hooks/forms/admin/usePersonSubmitForm.ts";
import usePersonSubmitMutation, {
    PersonSubmitParams
} from "@/pages/persons/hooks/mutations/admin/usePersonSubmitMutation.ts";
import PersonSubmitFormView from "@/pages/persons/components/form/admin/submit/PersonSubmitFormView.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm, PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";


/**
 * Editing mode parameters for the form container.
 *
 * - If `isEditing` is `true`, a `person` must be provided.
 * - If `isEditing` is `false` or omitted, `person` must not be provided.
 */
type EditingParams =
    | {
    /**
     * Whether the form is in editing mode.
     */
    isEditing: true;

    /**
     * The `Person` being edited.
     */
    person: Person;
} | {
    /**
     * Whether the form is in editing mode.
     */
    isEditing?: false;

    /**
     * No person is provided in create mode.
     */
    person?: never;
};

/**
 * Props for the `PersonSubmitFormContainer` component.
 *
 * Combines form submission configuration from {@link FormMutationOnSubmitParams}
 * with editing mode parameters and additional UI customization options.
 */
type SubmitFormParams =
    Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> &
    EditingParams & {
    /**
     * Callback invoked when the form submission succeeds.
     *
     * @param person - The successfully created or updated `Person` object.
     */
    onSubmitSuccess?: (person: Person) => void;

    /**
     * Callback invoked when the form submission fails.
     *
     * @param error - The error returned from the failed submission.
     */
    onSubmitError?: (error: unknown) => void;

    /**
     * Optional preset values to populate the form before rendering.
     * These will override values from the `person` prop if provided.
     */
    presetValues?: Partial<GenreFormValues>;

    /**
     * Array of form field names to disable in the UI.
     */
    disableFields?: (keyof PersonFormValues)[];
};

/**
 * Container component that wires together the `Person` form,
 * form state management, and the submit mutation logic.
 *
 * - Initializes the form with `usePersonSubmitForm`.
 * - Sets up the mutation via `usePersonSubmitMutation`.
 * - Passes props to the presentational `PersonSubmitFormView` component.
 *
 * @param params - Props controlling form initialization, editing mode, mutation callbacks, and UI behavior.
 *
 * @example
 * ```tsx
 * <PersonSubmitFormContainer
 *   isEditing={true}
 *   person={existingPerson}
 *   successMessage="Person updated successfully!"
 *   onSubmitSuccess={(person) => console.log("Saved:", person)}
 *   disableFields={["name"]}
 * />
 * ```
 */
const PersonSubmitFormContainer: FC<SubmitFormParams> = (params) => {
    const {isEditing, person, presetValues, disableFields, ...onSubmitParams} = params;

    const form = usePersonSubmitForm({person, presetValues, ...onSubmitParams});

    const mutationParams: PersonSubmitParams = isEditing
        ? {form, isEditing: true, _id: person._id, ...onSubmitParams}
        : {form, isEditing: false, ...onSubmitParams};

    const mutation = usePersonSubmitMutation(mutationParams);

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
