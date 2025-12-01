/**
 * SeatSubmitFormContainer
 *
 * This module provides a container component responsible for orchestrating the full
 * lifecycle of creating or updating a `Seat` entity:
 *
 * - Initializes form state and validation via `useSeatSubmitForm`.
 * - Configures and triggers mutations through `useSeatSubmitMutation`.
 * - Applies optional UI configuration from `FormContainerProps`, such as
 *   disabling specific fields or providing initial preset values.
 * - Automatically resets dependent fields when parent fields change
 *   (e.g., resetting `screen` when `theatre` changes).
 *
 * This container separates logic from presentation and delegates UI rendering to
 * `SeatSubmitFormView`.
 */

import {FC, useEffect} from 'react';
import useSeatSubmitForm from "@/pages/seats/hooks/features/admin/submit-seat-data/useSeatSubmitForm.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import SeatSubmitFormView from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormView.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import useSeatSubmitMutation from "@/pages/seats/hooks/features/admin/submit-seat-data/useSeatSubmitMutation.ts";
import {MutationEditByIDParams} from "@/common/type/form/MutationSubmitParams.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";

/**
 * Props for the `SeatSubmitFormContainer` component.
 *
 * Extends {@link FormContainerProps} with additional UI options for the container.
 * Includes:
 * - Editing state: `isEditing: true` (with an existing `Seat`) or `isEditing: false`.
 * - Optional preset values and disabled field configuration passed to the form.
 * - `className` to style the container or the internal form view.
 *
 * @template Seat           - The entity type being created or updated.
 * @template Seat           - Full form model type returned on submit.
 * @template SeatFormValues - Type of values managed internally by React Hook Form.
 */
type FormProps = FormContainerProps<Seat, Seat, SeatFormValues> & {
    className?: string;
};

/**
 * Component: SeatSubmitFormContainer
 *
 * Orchestrates form initialization, validation, mutation handling, and field dependency resets
 * for creating or editing a `Seat` entity.
 *
 * ### Responsibilities
 * - Initializes the form with `useSeatSubmitForm`, optionally providing preset values.
 * - Determines mutation mode (create or update) using `useSeatSubmitMutation`.
 * - Resets the `screen` field whenever `theatre` changes.
 * - Provides the `submitHandler` used by the view layer.
 *
 * ### Form Behavior
 * - If `isEditing` is true, the form is prefilled using the provided `entity`.
 * - Fields listed in `disableFields` (via `FormContainerProps`) are disabled in the view.
 * - `onSubmitSuccess` from parent props is automatically handled by the mutation hook.
 *
 * @param params - Props specifying edit mode, form UI options, mutation callbacks, and styling.
 *
 * @example
 * ```tsx
 * <SeatSubmitFormContainer
 *   isEditing={true}
 *   entity={seat}
 *   disableFields={['rowNumber']}
 *   presetValues={{ type: 'VIP' }}
 *   onSubmitSuccess={() => toast.success("Seat updated!")}
 * />
 * ```
 */
const SeatSubmitFormContainer: FC<FormProps> = (params) => {
    const {
        className,
        isEditing,
        entity,
        presetValues,
        disableFields,
        resetOnSubmit = false,
        ...formOptions
    } = params;

    // Initialize the form state, optionally with preset values for editing
    const form = useSeatSubmitForm({seat: entity, presetValues});

    // Configure the mutation parameters depending on edit mode
    const mutationParams: MutationEditByIDParams = isEditing
        ? {isEditing: true, _id: entity._id}
        : {isEditing: false};

    const mutation = useSeatSubmitMutation({
        form,
        ...formOptions,
        ...mutationParams,
    });

    // Reset the screen field any time the theatre changes
    const theatre = form.watch("theatre");

    useEffect(() => {
        form.resetField("screen");
    }, [theatre]);

    /**
     * Handles form submission by forwarding the values to the mutation hook.
     *
     * @param values - The validated form values submitted by the user.
     */
    const onFormSubmit = (values: SeatFormValues) => {
        console.log("Seat Submit Values: ", values);

        resetOnSubmit && form.reset();
        mutation.mutate(values as SeatForm);
    };

    return (
        <SeatSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
            disableFields={disableFields}
        />
    );
};

export default SeatSubmitFormContainer;
