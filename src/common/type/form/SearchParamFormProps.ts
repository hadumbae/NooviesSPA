import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormOptions } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for container components that manage forms synchronized with URL search parameters.
 *
 * @template TValues - Type of the form values handled by React Hook Form.
 * @template TForm - Type of the complete form data model. Defaults to `TValues`.
 *
 * @remarks
 * Extends {@link FormOptions}, adding presentation-level configuration
 * (e.g., CSS class handling) for forms that modify or reflect query parameters.
 *
 * Typically used to wrap filter or query option forms in list or index pages.
 *
 * @example
 * ```tsx
 * const props: SearchParamFormContainerProps<MovieQueryOptionFormValues> = {
 *   presetValues: { title: "", genre: "" },
 *   disableFields: ["country"],
 *   className: "space-y-4",
 * };
 * ```
 */
export type SearchParamFormContainerProps<
    TValues extends FieldValues,
    TForm extends FieldValues = TValues,
> = FormOptions<TValues, TForm> & {
    /**
     * Optional CSS class name for styling or layout customization
     * of the form container.
     */
    className?: string;
};

/**
 * Props for view components that render forms synchronized with URL-based search parameters.
 *
 * @template TValues - Type of the form values managed by React Hook Form.
 *
 * @remarks
 * Designed for use in form presentation components (views), this type
 * provides the React Hook Form instance, submit handler, and optional
 * field-level configuration options.
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
    /**
     * The React Hook Form instance containing state, validation,
     * and field registration methods.
     *
     * @see {@link UseFormReturn}
     */
    form: UseFormReturn<TValues>;

    /**
     * Handler function executed when the form is submitted.
     *
     * Typically wrapped with `form.handleSubmit` from React Hook Form.
     *
     * @see {@link SubmitHandler}
     */
    submitHandler: SubmitHandler<TValues>;

    /**
     * Array of field keys to disable in the UI.
     *
     * Useful for read-only states or when specific filters
     * should be locked to preserve URL query consistency.
     *
     * @example
     * ```tsx
     * disableFields: ["country", "year"]
     * ```
     */
    disableFields?: (keyof TValues)[];

    /**
     * Optional CSS class name for styling or layout customization
     * of the form view.
     */
    className?: string;
};
