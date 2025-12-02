/**
 * @file Defines the `HookFormFieldGroup` type, a utility structure used to
 *       represent a logical grouping of related form fields and the React
 *       element responsible for rendering them within a React Hook Form context.
 *
 * This type is typically used when constructing dynamic form sections
 * that may be conditionally displayed based on application state.
 */

import { FieldValues } from "react-hook-form";
import { ReactElement } from "react";

/**
 * Represents a grouped set of fields within a form, along with metadata
 * controlling whether the group should be displayed and what component should
 * be rendered to represent it.
 *
 * @template TValues - A type extending `FieldValues` that defines the
 * structure of the form fields available within this group.
 */
export type HookFormFieldGroup<TValues extends FieldValues> = {
    /**
     * Whether this group should be rendered.
     *
     * Typically controlled by form state or business rules. When `false`,
     * the renderer should skip the group's `element`.
     */
    render: boolean;

    /**
     * The list of field names (keys of the form schema) associated with this
     * group.
     *
     * This represents a *mapping layer* between the form schema and the UI,
     * allowing grouping, ordering, or conditional logic based on field sets.
     *
     * @example
     * For a form type:
     * ```ts
     * type MyFormValues = {
     *   firstName: string;
     *   lastName: string;
     *   age: number;
     * };
     * ```
     *
     * A group may specify:
     * ```ts
     * fields: ["firstName", "lastName"]
     * ```
     */
    fields: (keyof TValues)[];

    /**
     * The React element responsible for rendering this group in the UI.
     *
     * This is usually a form section component. The component typically uses
     * React Hook Form’s `useFormContext()` or receives props externally.
     *
     * @example
     * ```tsx
     * const nameGroup: HookFormFieldGroup<MyFormValues> = {
     *   render: true,
     *   fields: ["firstName", "lastName"],
     *   element: <NameSection />
     * };
     * ```
     */
    element: ReactElement;
};
