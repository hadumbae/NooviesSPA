/**
 * @fileoverview Defines types for conditional rendering and grouping of form fields within react-hook-form.
 */

import {FieldValues} from "react-hook-form";
import {ReactElement} from "react";

/** Configuration for conditionally rendering a React element based on a boolean flag. */
export type ConditionalRenderConfig = {
    render: boolean;
    key: string;
    element: ReactElement;
};

/** Configuration for a fieldset that maps conditional rendering logic to specific form field keys. */
export type HookFormFieldsetConfig<TValues extends FieldValues> = ConditionalRenderConfig & {
    fields: (keyof TValues)[];
};
