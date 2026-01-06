/**
 * @file SeatSubmitFormContainer.tsx
 *
 * ⚡ SeatSubmitFormContainer
 *
 * Top-level orchestrator for creating or updating Seat entities.
 * Combines form initialization, mutation handling, and context synchronization.
 * Delegates rendering to {@link SeatSubmitFormView}.
 *
 * Responsibilities:
 * - Initialize form state (preset or entity values)
 * - Handle create/update mutation via `useSeatSubmitMutation`
 * - Sync `currentValues` and `initialValues` with {@link SeatFormContext}
 * - Optionally reset form/context on successful submission (`resetOnSubmit`)
 *
 * Example:
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

import {FC, useEffect} from "react";
import useSeatSubmitForm from "@/pages/seats/hooks/features/admin/submit-seat-data/useSeatSubmitForm.ts";
import useSeatSubmitMutation from "@/pages/seats/hooks/features/admin/submit-seat-data/useSeatSubmitMutation.ts";
import SeatSubmitFormView from "@/pages/seats/components/forms/submit-form/seat-form-view/SeatSubmitFormView.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";

/**
 * Props for {@link SeatSubmitFormContainer}
 */
type FormProps = FormContainerProps<SeatDetails, Seat, SeatFormValues> & {
    className?: string;
};

/**
 * ⚡ SeatSubmitFormContainer component
 *
 * Manages the full lifecycle of creating or updating seats, including:
 * - Form initialization and pre-filling
 * - Mutation handling (create/update)
 * - Context state synchronization (`SeatFormContext`)
 * - Optional reset behavior after submission
 */
const SeatSubmitFormContainer: FC<FormProps> = (props) => {
    // --- Props ---
    const {className, entity, ...formOptions} = props;

    // --- Access Context ---
    const {initialValues, currentValues, setCurrentValues, options = {}} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    const {presetValues, resetOnSubmit} = options;

    // --- Form ---
    const form = useSeatSubmitForm({seat: entity, presetValues});
    const {reset} = form;

    // --- Sync Form Values ---
    useEffect(() => {
        if (currentValues) {
            reset(currentValues);
        }
    }, [reset]);

    useEffect(() => {
        const subscription = form.watch((newValues) => setCurrentValues(newValues));
        return () => subscription.unsubscribe();
    }, [form]);

    // --- Mutation ---
    const mutation = useSeatSubmitMutation({
        form,
        editID: entity?._id,
        options: formOptions,
    });

    // --- Submission ---
    const onFormSubmit = (values: SeatFormValues) => {
        if (resetOnSubmit && initialValues) {
            form.reset(initialValues);
            setCurrentValues(undefined);
        }
        mutation.mutate(values as SeatForm);
    };

    // --- Render ---
    return (
        <SeatSubmitFormView
            className={className}
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
        />
    );
};

export default SeatSubmitFormContainer;
