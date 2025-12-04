/**
 * @file SeatSubmitFormContainer.tsx
 *
 * @summary
 * High-level container component orchestrating the lifecycle of creating or updating `Seat` entities.
 *
 * @description
 * `SeatSubmitFormContainer` acts as the top-level controller for seat form operations. It combines:
 * - React Hook Form initialization via `useSeatSubmitForm`
 * - Mutation handling via `useSeatSubmitMutation`
 * - Cross-component state synchronization via `SeatFormContext`
 * - Optional UI customization from `FormContainerProps`
 *
 * By separating orchestration from presentation, rendering is delegated to `SeatSubmitFormView`,
 * which remains stateless and easy to reason about.
 *
 * ## Responsibilities
 * - Initializes form state, optionally pre-filled from an existing `Seat` entity or preset values
 * - Determines mutation mode (create vs. update) and forwards form submissions
 * - Synchronizes `currentValues` and `initialValues` with `SeatFormContext`
 * - Optionally resets form and context state after submission
 *
 * ## Context Integration
 * Uses `SeatFormContext` to:
 * - Keep `currentValues` synchronized as the user modifies the form
 * - Preserve `initialValues` as the baseline for resets
 *
 * ## Reset Behavior
 * When `resetOnSubmit` is `true`:
 * - The form resets to `initialValues` after a successful submission
 * - `currentValues` in context are cleared
 *
 * ## Example
 * ```tsx
 * <SeatSubmitFormContainer
 *   isEditing
 *   entity={seat}
 *   presetValues={{ seatType: "VIP" }}
 *   disableFields={["row"]}
 *   resetOnSubmit
 *   onSubmitSuccess={() => toast.success("Seat updated!")}
 * />
 * ```
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
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";

/**
 * Props accepted by {@link SeatSubmitFormContainer}.
 *
 * Extends {@link FormContainerProps} with optional layout, styling, and preset value options.
 *
 * @template Seat - The entity type being created or updated.
 * @template SeatFormValues - The form value type managed by React Hook Form.
 */
type FormProps = FormContainerProps<Seat, Seat, SeatFormValues> & {
    /**
     * Optional CSS class name applied to the container or underlying form view.
     */
    className?: string;
};

/**
 * @component SeatSubmitFormContainer
 *
 * High-level orchestrator for seat form operations.
 *
 * Handles:
 * - Form initialization with optional preset values
 * - Mutation setup for create or update operations
 * - Context synchronization (`SeatFormContext`)
 * - Optional reset behavior after submission
 *
 * Delegates rendering to `SeatSubmitFormView`.
 *
 * @param params - Props specifying edit mode, entity, preset values, UI options, and mutation callbacks.
 *
 * @returns JSX element rendering the seat form via {@link SeatSubmitFormView}.
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

    // ⚡ Context ⚡

    const {initialValues, currentValues, setCurrentValues} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    // ⚡ Form Initialization ⚡

    const form = useSeatSubmitForm({seat: entity, presetValues});
    const {reset} = form;

    // ⚡ Sync Values ⚡

    useEffect(() => {
        if (currentValues) reset(currentValues);
    }, [reset]);

    useEffect(() => {
        const subscription = form.watch((newValues) => setCurrentValues(newValues));
        return () => subscription.unsubscribe();
    }, [form]);

    // ⚡ Mutation ⚡

    const editParams: MutationEditByIDParams = isEditing
        ? {isEditing: true, _id: entity._id}
        : {isEditing: false};

    const mutation = useSeatSubmitMutation(form, {
        editing: editParams,
        options: formOptions,
    });

    // ⚡ Submission Handler ⚡

    const onFormSubmit = (values: SeatFormValues) => {
        console.log("Seat Submit Values: ", values);

        if (resetOnSubmit && initialValues) {
            form.reset(initialValues);
            setCurrentValues(undefined);
        }

        mutation.mutate(values as SeatForm);
    };

    // ⚡ Render ⚡

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
