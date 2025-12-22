import { FC } from 'react';
import useTheatreSubmitForm from "@/pages/theatres/hooks/submit-form/useTheatreSubmitForm.ts";
import useTheatreSubmitMutation, {
    TheatreSubmitMutationParams
} from "@/pages/theatres/hooks/submit-form/useTheatreSubmitMutation.ts";
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { TheatreForm, TheatreFormValues } from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";
import TheatreSubmitFormView
    from "@/pages/theatres/components/admin/form/theatre-submit-form/TheatreSubmitFormView.tsx";

/**
 * Props for {@link TheatreSubmitFormContainer}.
 *
 * Extends a generic {@link FormContainerProps} used across the app for
 * entity-based `react-hook-form` containers.
 *
 * @property isPanel - If `true`, renders the form inside a panel-styled container.
 * @property className - Optional CSS class names applied to the root container.
 *
 * Inherited from {@link FormContainerProps}:
 * - **isEditing** – Whether the form is editing an existing theatre.
 * - **entity** – Theatre entity used for pre-filling values when editing.
 * - **presetValues** – Partial form values applied before user input.
 * - **disableFields** – Form fields that should be disabled.
 * - **onSubmitSuccess** – Callback invoked when mutation succeeds.
 * - **successMessage** – Custom success toast message.
 * - **errorMessage** – Custom error toast message.
 */
type SubmitFormProps = FormContainerProps<Theatre, Theatre, TheatreFormValues> & {
    isPanel?: boolean;
    className?: string;
};

/**
 * **TheatreSubmitFormContainer**
 *
 * High-level container responsible for:
 *
 * ### ✔ Initializing the form
 * Uses {@link useTheatreSubmitForm} to generate a fully typed `react-hook-form`
 * instance with:
 * - Default values (new form)
 * - Prefilled values (editing mode or preset values)
 *
 * ### ✔ Configuring mutations
 * Uses {@link useTheatreSubmitMutation} to build the mutation for:
 * - Creating a new theatre
 * - Updating an existing theatre
 *
 * The mutation behavior is automatically determined by the `isEditing` flag.
 *
 * ### ✔ Handling form submission
 * The `onFormSubmit` handler forwards validated form values to the mutation.
 *
 * ### ✔ Rendering the view
 * Delegates UI responsibilities to {@link TheatreSubmitFormView}, passing:
 * - Form instance
 * - Mutation state
 * - Disabled fields
 * - Visual layout mode (`isPanel`)
 *
 * ---
 *
 * @param props - Combined props from {@link SubmitFormProps} and mutation options.
 *
 * @example
 * ```tsx
 * <TheatreSubmitFormContainer
 *   isEditing={false}
 *   presetValues={{ name: "Grand Theatre" }}
 *   onSubmitSuccess={(t) => console.log("Created theatre:", t)}
 *   disableFields={["seatCapacity"]}
 *   className="max-w-xl"
 * />
 * ```
 *
 * @component
 */
const TheatreSubmitFormContainer: FC<SubmitFormProps> = (props) => {
    const {
        isEditing,
        entity,
        disableFields,
        presetValues,
        className,
        isPanel = false,
        ...mutationOptions
    } = props;

    // ⚡ Form ⚡

    const form = useTheatreSubmitForm({ theatre: entity, presetValues });

    // ⚡ Mutation ⚡

    const mutationParams: TheatreSubmitMutationParams = isEditing
        ? { isEditing: true, _id: entity._id, form, ...mutationOptions }
        : { isEditing: false, form, ...mutationOptions };

    const mutation = useTheatreSubmitMutation(mutationParams);

    // ⚡ Submit Handler ⚡

    const onFormSubmit = (values: TheatreFormValues) => mutation.mutate(values as TheatreForm);

    return (
        <TheatreSubmitFormView
            isPanel={isPanel}
            form={form}
            submitHandler={onFormSubmit}
            mutation={mutation}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default TheatreSubmitFormContainer;
