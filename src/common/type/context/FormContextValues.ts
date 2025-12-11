/**
 * @file FormContextValues.ts
 * @summary
 * Shape of the shared context used to manage a form’s full lifecycle.
 *
 * @description
 * Provides a unified contract for form providers handling:
 * - **initialValues**: server-provided or preset defaults
 * - **currentValues**: user-edited working state
 * - **options**: runtime configuration influencing behavior and UI
 *
 * This type centralizes all state transitions required for create/edit flows
 * and ensures that form logic remains consistent across components.
 */

import {Dispatch, SetStateAction} from "react";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {FieldValues} from "react-hook-form";

/**
 * Context values given by a generic form provider.
 *
 * Encapsulates everything required to:
 * - bootstrap a form with initial values
 * - track user-edited values throughout the session
 * - support server-driven edit flows
 * - alter runtime behavior via configuration options
 *
 * @template TFormValues - Values managed by React Hook Form.
 * @template TForm - Payload submitted to the server (defaults to `TFormValues`).
 * @template TEntity - Entity used for contextual behavior (e.g., editing).
 */
export type FormContextValues<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown,
> = {
    /**
     * Initial values used to populate the form.
     *
     * - In **edit flows**, these usually come from the server.
     * - In **create flows**, they may be defaults or system-generated presets.
     */
    initialValues: TFormValues | undefined;

    /** Setter for `initialValues`. */
    setInitialValues: Dispatch<SetStateAction<TFormValues | undefined>>;

    /**
     * The form’s currently edited (live) values.
     *
     * May be undefined before initialization or before synchronization
     * from external sources (e.g., when loading initial values asynchronously).
     */
    currentValues: TFormValues | undefined;

    /** Setter for `currentValues`. */
    setCurrentValues: Dispatch<SetStateAction<TFormValues | undefined>>;

    /**
     * Runtime options controlling form behavior.
     *
     * Includes mechanisms for:
     * - field disabling or contextual restrictions
     * - value presets and transform rules
     * - reset behavior
     * - UI/layout metadata
     * - entity-specific form semantics
     */
    options?: FormOptions<TFormValues, TForm, TEntity>;
};
