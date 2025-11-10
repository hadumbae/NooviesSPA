import {FieldValues, SubmitHandler, UseFormReturn} from "react-hook-form";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for container components managing forms that synchronize with search parameters.
 *
 * @typeParam TValues - The type of form values handled by React Hook Form.
 *
 * @remarks
 * This type extends the base {@link FormOptions} interface, adding presentation-related
 * properties suitable for wrapping form views that interact with URL query parameters.
 *
 * @property {string} [className] - Optional CSS class name for styling the form container.
 *
 * @example
 * ```tsx
 * const props: SearchParamFormContainerProps<MovieQueryOptionFormValues> = {
 *   onSubmit: handleSearch,
 *   defaultValues: { title: "", genre: "" },
 *   className: "space-y-4",
 * };
 * ```
 */
export type SearchParamFormContainerProps<TValues extends FieldValues> =
    FormOptions<TValues> & {
    className?: string;
};

/**
 * Props for view components rendering forms that interact with URL-based search parameters.
 *
 * @typeParam TValues - The type of form values managed by React Hook Form.
 *
 * @remarks
 * This type is designed for use with form presentation components.
 * It provides the form instance, submit handler, and field-level configuration options.
 *
 * @property {UseFormReturn<TValues>} form - The React Hook Form instance containing methods and state.
 * @property {SubmitHandler<TValues>} submitHandler - Handler function triggered on form submission.
 * @property {(keyof TValues)[]} [disableFields] - Optional list of field names to disable in the form.
 * @property {string} [className] - Optional CSS class name for customizing layout or appearance.
 *
 * @example
 * ```tsx
 * const props: SearchParamFormViewProps<MovieQueryOptionFormValues> = {
 *   form: formMethods,
 *   submitHandler: handleSubmit,
 *   disableFields: ["_id", "country"],
 *   className: "grid grid-cols-2 gap-4",
 * };
 * ```
 */
export type SearchParamFormViewProps<TValues extends FieldValues> = {
    form: UseFormReturn<TValues>;
    submitHandler: SubmitHandler<TValues>;
    disableFields?: (keyof TValues)[];
    className?: string;
};
