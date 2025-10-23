import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {FieldValues} from "react-hook-form";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Configuration for handling form submissions in an entity option component.
 *
 * Combines:
 * - {@link MutationOnSubmitParams} for submission callbacks, validation, and messages.
 * - {@link FormOptions} for optional UI behavior (disabled/prefilled fields).
 *
 * @template TModel - Type of the data returned by the submission mutation (e.g., created/updated entity).
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 */
export type EntityOptionOnSubmitProps<
    TModel,
    TFormValues extends FieldValues
> = MutationOnSubmitParams<TModel> & FormOptions<TFormValues>;

/**
 * Props for an entity option component that provides create, edit, and delete actions.
 *
 * @template TModel - Type of the data returned by form submissions.
 * @template TEntity - Type of the entity being managed.
 * @template TFormValues - Type of the form values managed by React Hook Form. Must extend `FieldValues`.
 */
export type EntityOptionProps<
    TModel,
    TEntity,
    TFormValues extends FieldValues
> = {
    /**
     * The entity instance being displayed or managed.
     */
    entity: TEntity;

    /**
     * Optional configuration for handling form submissions.
     *
     * Includes validation schema, callbacks, and UI behavior.
     */
    onSubmit?: EntityOptionOnSubmitProps<TModel, TFormValues>;

    /**
     * Optional configuration for handling entity deletion.
     *
     * Includes success/error messages and callbacks.
     */
    onDelete?: OnDeleteMutationParams;
};
