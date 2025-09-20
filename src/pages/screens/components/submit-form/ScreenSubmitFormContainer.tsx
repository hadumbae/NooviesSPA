import { FC } from 'react';
import useScreenSubmitForm from "@/pages/screens/hooks/screens/submit-screen-data/useScreenSubmitForm.ts";
import useScreenSubmitMutation, {
    ScreenSubmitMutationParams
} from "@/pages/screens/hooks/screens/submit-screen-data/useScreenSubmitMutation.ts";
import ScreenSubmitFormView from "@/pages/screens/components/submit-form/ScreenSubmitFormView.tsx";
import { Screen } from "@/pages/screens/schema/screen/Screen.types.ts";
import { ScreenForm, ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for `ScreenSubmitFormContainer`.
 *
 * Extends generic `FormContainerProps` for `Screen` entities and `ScreenFormValues`,
 * adding optional styling via `className`.
 */
type ContainerProps = FormContainerProps<Screen, Screen, ScreenFormValues> & {
    /** Optional CSS class names to apply to the form container */
    className?: string;
};

/**
 * Container component responsible for orchestrating a screen submission form.
 *
 * Responsibilities:
 * - Initializes form state using `useScreenSubmitForm`.
 * - Configures and manages mutation via `useScreenSubmitMutation`.
 * - Handles submission of form values, including edit vs create behavior.
 * - Passes all relevant props to `ScreenSubmitFormView`.
 *
 * @param params - Component props including form configuration, editing state, and mutation callbacks
 * @param params.isEditing - Flag indicating if the form is in edit mode
 * @param params.entity - Optional entity being edited (required if `isEditing` is true)
 * @param params.presetValues - Optional values to prefill the form
 * @param params.disableFields - Optional array of form field keys to disable
 * @param params.onSubmitSuccess - Callback fired when submission succeeds
 * @param params.onSubmitError - Callback fired when submission fails
 * @param params.successMessage - Optional success message to display
 * @param params.errorMessage - Optional error message to display
 * @param params.className - Optional CSS class for the container
 * @returns A fully configured form container component managing state, submission, and view
 *
 * @example
 * ```tsx
 * <ScreenSubmitFormContainer
 *   isEditing={true}
 *   entity={screen}
 *   onSubmitSuccess={(screen) => console.log("Submitted:", screen)}
 *   className="my-form-container"
 * />
 * ```
 */
const ScreenSubmitFormContainer: FC<ContainerProps> = (params) => {
    const { className, isEditing, entity: screen, presetValues, disableFields, ...mutationOptions } = params;

    // Initialize the form state (handles default values and optional preset values)
    const form = useScreenSubmitForm({ screen, presetValues });

    // Prepare mutation parameters for create or edit mode
    const mutationParams: ScreenSubmitMutationParams = isEditing
        ? { form, isEditing: true, _id: screen._id, ...mutationOptions }
        : { form, isEditing: false, ...mutationOptions };

    // Initialize the mutation hook (handles submission, validation, and callbacks)
    const mutation = useScreenSubmitMutation(mutationParams);

    /**
     * Handles form submission by triggering the mutation.
     *
     * Converts `ScreenFormValues` to `ScreenForm` and calls the mutation.
     *
     * @param values - Current values from the form
     */
    const onFormSubmit = (values: ScreenFormValues) => {
        console.log("Screen Submit Values: ", values);
        mutation.mutate(values as ScreenForm);
    };

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
