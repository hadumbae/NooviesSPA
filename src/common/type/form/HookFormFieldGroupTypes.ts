/**
 * @file HookFormFieldGroup.ts
 *
 * @summary
 * Type definitions for logical groups of React Hook Form fields and their
 * corresponding UI components.
 *
 * @description
 * Provides a structure to define:
 * - Conditional rendering of form field groups (`render`)
 * - Association between form schema fields and UI components (`fields` and `element`)
 *
 * These types are useful for building dynamic, modular forms where certain
 * field sections may be shown or hidden based on application state or business logic.
 */

import { FieldValues } from "react-hook-form";
import { ReactElement } from "react";

/**
 * Represents a single renderable unit in a form.
 *
 * @property render - Whether the group should currently be rendered.
 * @property element - The React element that renders this group in the UI.
 */
export type HookFormField = {
    /**
     * Controls if this group should be rendered.
     *
     * When `false`, the `element` will not be displayed.
     */
    render: boolean;

    /**
     * The React element responsible for rendering this group of fields.
     *
     * Typically a component that uses `useFormContext()` or receives form props.
     *
     * @example
     * ```tsx
     * const nameGroup: HookFormField = {
     *   render: true,
     *   element: <NameSection />
     * };
     * ```
     */
    element: ReactElement;
};

/**
 * Represents a group of form fields with associated metadata for rendering.
 *
 * @template TValues - Type extending `FieldValues` describing the form schema.
 *
 * @property fields - Array of field keys from the form schema that belong to this group.
 *   Serves as a bridge between schema and UI for ordering, grouping, and conditional logic.
 */
export type HookFormFieldGroup<TValues extends FieldValues> = HookFormField & {
    /**
     * The keys of the form schema included in this group.
     *
     * @example
     * ```ts
     * type MyFormValues = {
     *   firstName: string;
     *   lastName: string;
     *   age: number;
     * };
     *
     * const personalInfoGroup: HookFormFieldGroup<MyFormValues> = {
     *   render: true,
     *   fields: ["firstName", "lastName"],
     *   element: <PersonalInfoSection />
     * };
     * ```
     */
    fields: (keyof TValues)[];
};
