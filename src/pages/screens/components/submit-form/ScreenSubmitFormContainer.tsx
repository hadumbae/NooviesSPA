import { FC } from 'react';
import useScreenSubmitMutation from "@/pages/screens/hooks/screens/submit-screen-data/useScreenSubmitMutation.ts";
import ScreenSubmitFormView from "@/pages/screens/components/submit-form/ScreenSubmitFormView.tsx";
import {Screen, ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import { ScreenForm, ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { ScreenFormContext } from "@/pages/screens/contexts/screen-form/ScreenFormContext.ts";
import useSyncFormContextCurrentValues from "@/common/hooks/context/useSyncFormContextCurrentValues.ts";
import useScreenSubmitForm
    from "@/pages/screens/hooks/screens/submit-screen-data/screen-submit-form/useScreenSubmitForm.ts";

/**
 * Props for the `ScreenSubmitFormContainer` component.
 *
 * Extends `FormContainerProps` for handling `Screen` entities using
 * `ScreenFormValues`, with optional wrapper-level styling.
 *
 * @template TEntity - Always `ScreenDetails`
 * @template TForm - Always `Screen`
 * @template TFormValues - Always `ScreenFormValues`
 */
type ContainerProps = FormContainerProps<ScreenDetails, Screen, ScreenFormValues> & {
    /** Optional CSS class names applied to the container wrapper. */
    className?: string;
};

/**
 * Container component that coordinates the entire submit/edit flow
 * for a `Screen` form.
 *
 * Responsibilities:
 * - Initializes form state using `useScreenSubmitForm`
 * - Synchronizes current form values with `ScreenFormContext`
 * - Determines mutation mode (edit/create) and configures mutation handlers
 * - Executes `useScreenSubmitMutation` to handle backend submission
 * - Passes the prepared form instance, mutation object, and submit handler
 *   to `ScreenSubmitFormView`
 *
 * This component centralizes logic and mutation behavior, keeping the view
 * component purely presentational.
 *
 * @param params - Full form container configuration.
 * @param params.isEditing - Whether the form edits an existing `Screen`.
 * @param params.entity - The target entity (required if editing).
 * @param params.presetValues - Initial override values applied to the form.
 * @param params.disableFields - Field paths disabled in the form UI.
 * @param params.onSubmitSuccess - Callback after successful mutation.
 * @param params.onSubmitError - Callback when the mutation fails.
 * @param params.successMessage - Optional custom success message.
 * @param params.errorMessage - Optional custom error message.
 * @param params.className - Optional wrapper CSS class.
 *
 * @returns A configured container wrapping `ScreenSubmitFormView`.
 *
 * @example
 * ```tsx
 * <ScreenSubmitFormContainer
 *   isEditing
 *   entity={screen}
 *   onSubmitSuccess={(data) => console.log("Saved:", data)}
 *   presetValues={{ name: "Hall A" }}
 * />
 * ```
 */
const ScreenSubmitFormContainer: FC<ContainerProps> = (params) => {
    // --- Props ---
    const { className, ...mutationOptions } = params;

    // --- Context Access ---
    const {
        initialValues,
        setCurrentValues,
        options: { presetValues, resetOnSubmit, editEntity: screen } = {},
    } = useRequiredContext({ context: ScreenFormContext });

    // --- Form Initialization ---
    const form = useScreenSubmitForm({ screen, presetValues });
    useSyncFormContextCurrentValues({ form, context: ScreenFormContext });

    // --- Mutation Setup ---
    const mutation = useScreenSubmitMutation({
        form,
        editID: screen?._id,
        ...mutationOptions,
    });

    /**
     * Handles form submission.
     *
     * Applies optional reset behavior (if configured), updates form context,
     * and executes the mutation with the submitted values.
     *
     * @param values - Current form values submitted by the user.
     */
    const onFormSubmit = (values: ScreenFormValues) => {
        if (resetOnSubmit && initialValues) {
            form.reset(initialValues);
            setCurrentValues(undefined);
        }

        console.log("Screen Submit Values:", values);
        mutation.mutate(values as ScreenForm);
    };

    return (
        <ScreenSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
            className={className}
        />
    );
};

export default ScreenSubmitFormContainer;
