import {FC, useEffect} from 'react';

import useShowingSubmitForm from "@/pages/showings/hooks/forms/useShowingSubmitForm.ts";
import useShowingSubmitMutation from "@/pages/showings/hooks/mutations/useShowingSubmitMutation.ts";

import ShowingSubmitFormView from "@/pages/showings/components/forms/ShowingSubmitFormView.tsx";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {ShowingForm, ShowingFormValues} from "@/pages/showings/schema/form/ShowingForm.types.ts";
import {IANATimezone} from "@/common/schema/datetime/IANATimezone.schema.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props used when the form is in editing mode.
 *
 * @property isEditing - Whether the form is editing an existing `Showing` entity.
 * @property entity - The `Showing` entity currently being edited.
 * @property theatreTimezone - The theatre's IANA timezone, used for showing date/time calculations.
 */
type ShowingEditingProps =
    | { isEditing: true, entity: Showing, theatreTimezone: IANATimezone }
    | { isEditing?: false, entity?: never, theatreTimezone?: never };

/**
 * Props for the `ShowingSubmitFormContainer` component.
 *
 * Combines mutation callbacks, form options, and optional editing parameters.
 *
 * @template Showing - The entity type being submitted or updated.
 *
 * @property className - Optional custom CSS class for layout or styling.
 * @property disableFields - Optional list of form field names to disable.
 * @property presetValues - Optional preset form values (for default initialization).
 * @property onSubmitSuccess - Callback fired after successful submission.
 * @property onSubmitError - Callback fired after failed submission.
 * @property isEditing - Whether the form is in edit mode (affects prefilled values and mutation behavior).
 * @property entity - The `Showing` being edited, if applicable.
 * @property theatreTimezone - The timezone context for showing date/time fields.
 */
type SubmitContainerProps =
    MutationOnSubmitParams<Showing> &
    FormOptions<ShowingFormValues> &
    ShowingEditingProps &
    {
        className?: string;
    };

/**
 * `ShowingSubmitFormContainer` manages the logic and data flow for creating or editing a showing.
 *
 * It:
 * - Initializes a form via `useShowingSubmitForm`.
 * - Sets up mutation logic via `useShowingSubmitMutation`.
 * - Handles field resets when the theatre changes.
 * - Provides submission handlers and passes form/mutation props to `ShowingSubmitFormView`.
 *
 * This component abstracts away form and mutation wiring so the UI layer remains clean.
 */
const ShowingSubmitFormContainer: FC<SubmitContainerProps> = (props) => {
    const {
        isEditing,
        entity,
        theatreTimezone,
        disableFields,
        presetValues,
        ...onSubmitProps
    } = props;

    const {onSubmitSuccess} = onSubmitProps;

    // ⚡ Initialize form ⚡

    const formEditingProps = isEditing ? {showing: entity, theatreTimezone} : {};
    const form = useShowingSubmitForm({presetValues, ...formEditingProps});
    const theatre = form.watch("theatre");

    // Reset the screen field when the theatre changes
    useEffect(() => {
        form.resetField("screen");
    }, [theatre]);

    /**
     * Custom submit success handler that resets the form and invokes the parent callback.
     *
     * @param showing - The newly created or updated `Showing` entity.
     */
    const resetOnSuccess = (showing: Showing) => {
        form.reset();
        onSubmitSuccess?.(showing);
    };

    // ⚡ Initialize mutation ⚡

    const mutationProps: MutationEditByIDParams = isEditing
        ? {isEditing: true, _id: entity._id}
        : {isEditing: false};

    const mutation = useShowingSubmitMutation({
        form,
        ...mutationProps,
        ...onSubmitProps,
        onSubmitSuccess: resetOnSuccess,
    });

    // ⚡ Submit Handler ⚡

    /**
     * Handles the form submission by invoking the mutation with the form values.
     *
     * @param values - The validated `ShowingFormValues` to submit.
     */
    const onFormSubmit = (values: ShowingFormValues) => {
        console.log("Showing Submit Value: ", values);
        mutation.mutate(values as ShowingForm);
    };

    return (
        <ShowingSubmitFormView
            mutation={mutation}
            form={form}
            submitHandler={onFormSubmit}
            disableFields={disableFields}
        />
    );
};

export default ShowingSubmitFormContainer;
