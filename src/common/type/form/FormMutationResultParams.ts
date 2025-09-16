import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {ZodTypeAny} from "zod";

/**
 * Parameters for configuring a form mutation submission.
 *
 * @template TData - The type of the data returned on a successful submit.
 * @template TSchema - The Zod schema type used for validation.
 */
export type FormMutationOnSubmitParams<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny> = {
    /**
     * Zod validation schema to validate form input before submission.
     */
    validationSchema?: TSchema;

    /**
     * Optional success message to display when the submission succeeds.
     */
    successMessage?: string;

    /**
     * Callback fired when the submission succeeds.
     *
     * @param data - The returned data from the mutation.
     */
    onSubmitSuccess?: (data: TData) => void;

    /**
     * Optional error message to display when the submission fails.
     */
    errorMessage?: string;

    /**
     * Callback fired when the submission fails.
     *
     * @param error - The error thrown during submission.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Parameters for configuring a delete mutation submission.
 */
export type OnDeleteMutationParams = {
    /**
     * Optional success message to display when the deletion succeeds.
     */
    successMessage?: string;

    /**
     * Callback fired when the deletion succeeds.
     */
    onDeleteSuccess?: () => void;

    /**
     * Optional error message to display when the deletion fails.
     */
    errorMessage?: string;

    /**
     * Callback fired when the deletion fails.
     *
     * @param error - The error thrown during deletion.
     */
    onDeleteError?: (error: unknown) => void;
};

/**
 * Parameters that describe whether a form is in editing mode and,
 * if so, the entity being edited.
 *
 * @template TEntity - The shape of the entity being edited.
 */
export type FormEditingParams<TEntity = any> =
    | {
    /** Indicates the form is in editing mode. */
    isEditing: true;

    /** The entity instance currently being edited. */
    entity: TEntity;
} | {
    /** Indicates the form is in create mode (default). */
    isEditing?: false;

    /** Entity is not provided in create mode. */
    entity?: never;
};


/**
 * Parameters describing whether a form mutation is creating or editing a record.
 *
 * - If `isEditing: true`, an `_id` must be provided.
 * - If omitted or `isEditing: false`, `_id` must not be set.
 */
export type FormMutationEditingParams =
    | {
    /** Indicates the form is in editing mode. */
    isEditing: true;

    /** The unique identifier of the record being edited. */
    _id: ObjectId;
} | {
    /** Indicates the form is in create mode (default). */
    isEditing?: false;

    /** Not allowed in create mode. */
    _id?: never;
};

/**
 * Combination of form submission parameters and editing state.
 *
 * @template TData - The type of the data returned on a successful submit.
 * @template TSchema - The Zod schema type used for validation.
 */
export type FormMutationResultParams<
    TData = unknown,
    TSchema extends ZodTypeAny = ZodTypeAny
> = FormMutationOnSubmitParams<TData, TSchema> & FormMutationEditingParams;