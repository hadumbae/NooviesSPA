import { FC, useEffect, useRef } from 'react';
import useSeatSubmitForm from "@/pages/seats/hooks/forms/useSeatSubmitForm.ts";
import useSeatSubmitMutation, {
    SeatSubmitMutationFormParams
} from "@/pages/seats/hooks/mutations/useSeatSubmitMutation.ts";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import { SeatForm, SeatFormValues } from "@/pages/seats/schema/form/SeatForm.types.ts";
import SeatSubmitFormView from "@/pages/seats/components/forms/submit-form/SeatSubmitFormView.tsx";
import { FormMutationOnSubmitParams } from "@/common/type/form/FormMutationResultParams.ts";

/**
 * Props for the SeatSubmitFormContainer component.
 *
 * Combines:
 * - Form mutation callbacks and messages (excluding `onSubmitSuccess` which is handled internally).
 * - Editing state: either `isEditing: true` with a `seat` or `isEditing: false`.
 * - Optional form UI behavior: `className`, `presetValues`, `disableFields`.
 * - Optional callback `onSubmitSuccess` invoked after a successful submission.
 */
type FormProps =
    Omit<FormMutationOnSubmitParams<Seat>, "onSubmitSuccess"> &
    (| { isEditing: true; seat: Seat } | { isEditing?: false; seat?: never }) &
    {
        /** Optional CSS class for the container */
        className?: string;

        /** Optional initial values to prefill the form */
        presetValues?: Partial<SeatFormValues>;

        /** Optional fields to disable in the form */
        disableFields?: (keyof SeatFormValues)[];

        /** Callback invoked after a successful form submission */
        onSubmitSuccess?: (seat: Seat) => void;
    };

/**
 * SeatSubmitFormContainer
 *
 * Handles the logic for creating or updating a Seat entity.
 * Integrates:
 * - `useSeatSubmitForm` for form state and validation.
 * - `useSeatSubmitMutation` for the async mutation.
 * - Resetting dependent fields on changes (e.g., `screen` resets when `theatre` changes).
 *
 * @param params - Props defining editing state, mutation callbacks, and optional form UI behavior.
 */
const SeatSubmitFormContainer: FC<FormProps> = (params) => {
    const { className, isEditing, seat, presetValues, disableFields, ...formOptions } = params;

    // Initialize the form state, optionally with preset values for editing
    const form = useSeatSubmitForm({ seat, presetValues });

    // Configure the mutation for creating or editing a seat
    const mutationParams: SeatSubmitMutationFormParams = isEditing
        ? { isEditing: true, form, _id: seat._id, ...formOptions }
        : { isEditing: false, form, ...formOptions };

    const mutation = useSeatSubmitMutation(mutationParams);

    // Watch theatre selection to reset the screen field if it changes
    const theatre = form.watch("theatre");
    const isFirstRender = useRef<boolean>(false);
    const isSecondRender = useRef<boolean>(false);

    useEffect(() => {
        // Skip first two renders to prevent unnecessary resets
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (isSecondRender.current) {
            isSecondRender.current = false;
            return;
        }

        form.resetField("screen");
    }, [theatre]);

    /**
     * Handles form submission by triggering the mutation.
     *
     * @param values - The values submitted from the form
     */
    const onFormSubmit = (values: SeatFormValues) => {
        console.log("Seat Submit Values: ", values);
        mutation.mutate(values as SeatForm);
    }

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
