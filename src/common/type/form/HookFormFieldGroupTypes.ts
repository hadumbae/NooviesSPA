/**
 * @file HookFormFieldGroup.ts
 *
 * Type definitions for grouping and conditionally rendering
 * React Hook Form fields alongside their UI components.
 *
 * These types enable:
 * - Declarative grouping of schema fields
 * - Conditional rendering of field sections
 * - A clear mapping between form schema keys and UI layout
 *
 * Common use cases include multi-step forms, dynamic sections,
 * and feature-flagged or state-driven field visibility.
 */

import { FieldValues } from "react-hook-form";
import { ReactElement } from "react";

/**
 * Represents a renderable form field group unit.
 *
 * Used as a building block for composing larger form layouts.
 */
export type HookFormField = {
    /**
     * Whether this field group should be rendered.
     *
     * When `false`, the associated UI element is omitted entirely.
     */
    render: boolean;

    /**
     * Stable key used for rendering lists of field groups.
     */
    key: string;

    /**
     * React element responsible for rendering this group of fields.
     *
     * Typically a component that consumes `react-hook-form`
     * context or receives form props.
     *
     * @example
     * ```tsx
     * {
     *   key: "name",
     *   render: true,
     *   element: <NameSection />
     * }
     * ```
     */
    element: ReactElement;
};

/**
 * Represents a group of related form fields with schema awareness.
 *
 * Extends {@link HookFormField} by associating the UI group
 * with specific keys from the form schema.
 *
 * @template TValues - Shape of the form values.
 */
export type HookFormFieldGroup<TValues extends FieldValues> = HookFormField & {
    /**
     * Schema field keys included in this group.
     *
     * Used for ordering, validation scoping, and conditional
     * step or section logic.
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
     *   key: "personal-info",
     *   render: true,
     *   fields: ["firstName", "lastName"],
     *   element: <PersonalInfoSection />
     * };
     * ```
     */
    fields: (keyof TValues)[];
};
