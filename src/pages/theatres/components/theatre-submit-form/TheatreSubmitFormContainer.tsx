import { FC } from 'react';
import useTheatreSubmitForm from "@/pages/theatres/hooks/forms/useTheatreSubmitForm.ts";
import useTheatreSubmitMutation, {
    TheatreSubmitMutationParams
} from "@/pages/theatres/hooks/features/submit-form/useTheatreSubmitMutation.ts";
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { TheatreForm, TheatreFormValues } from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import TheatreSubmitFormView from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormView.tsx";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link TheatreSubmitFormContainer}.
 *
 * @property isEditing - Indicates if the form is for editing an existing theatre.
 * @property entity - Theatre entity used to prefill the form when editing.
 * @property disableFields - Optional array of form fields to disable (`"name"`, `"location"`, `"seatCapacity"`).
 * @property presetValues - Optional partial values to prefill the form.
 * @property className - Optional CSS classes applied to the main form container.
 * @property onSubmitSuccess - Optional callback invoked when submission succeeds.
 * @property successMessage - Optional custom success message for toast notifications.
 * @property errorMessage - Optional custom error message for toast notifications.
 */
type SubmitFormProps = FormContainerProps<Theatre, Theatre, TheatreFormValues> & {
    className?: string;
};

/**
 * **TheatreSubmitFormContainer**
 *
 * Container component for creating or editing a theatre.
 *
 * Responsibilities:
 * - Initializes form state via {@link useTheatreSubmitForm}.
 * - Sets up mutation with {@link useTheatreSubmitMutation} for create/update operations.
 * - Handles submission via `onFormSubmit`.
 * - Passes form, mutation, and disabled fields to {@link TheatreSubmitFormView} for rendering.
 *
 * @param params - Props including `isEditing`, `entity`, `disableFields`, `presetValues`, `className`, and mutation callbacks/options.
 *
 * @example
 * ```tsx
 * <TheatreSubmitFormContainer
 *   isEditing={false}
 *   presetValues={{ name: "Grand Theatre" }}
 *   onSubmitSuccess={(theatre) => console.log("Created Theatre:", theatre)}
 *   disableFields={["seatCapacity"]}
 *   className="max-w-lg"
 * />
 * ```
 */
const TheatreSubmitFormContainer: FC<SubmitFormProps> = (params) => {
    const { isEditing, entity, disableFields, presetValues, className, ...mutationOptions } = params;

    const form = useTheatreSubmitForm({ theatre: entity, presetValues });

    const mutationParams: TheatreSubmitMutationParams = isEditing
        ? { isEditing: true, _id: entity._id, form, ...mutationOptions }
        : { isEditing: false, form, ...mutationOptions };

    const mutation = useTheatreSubmitMutation(mutationParams);

    const onFormSubmit = (values: TheatreFormValues) => {
        console.log("Theatre Submit Values : ", values);
        mutation.mutate(values as TheatreForm);
    };

    return (
        <TheatreSubmitFormView
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default TheatreSubmitFormContainer;
