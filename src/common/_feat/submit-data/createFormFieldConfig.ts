/**
 * @fileoverview Utility function for generating conditional render configurations for form fields.
 */

import {FieldValues} from "react-hook-form";
import {DisableFields, HideFields} from "@/common/_types";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {ReactElement} from "react";

/** Configuration options for initializing the form field config generator. */
type CreateConfig<TValues extends FieldValues> = {
    disableFields?: DisableFields<TValues>;
    hideFields?: HideFields<TValues>;
    extraDisabled?: boolean;
}

/**
 * Creates a factory function that produces conditional rendering and disabled configurations for specific form field keys.
 */
export function createFormFieldConfig<TValues extends FieldValues>(
    {disableFields, hideFields, extraDisabled}: CreateConfig<TValues>
) {
    return <TKeys extends keyof TValues & string>(
        {key, element}: { key: TKeys, element: ReactElement }
    ): ConditionalRenderConfig => ({
        key,
        render: !hideFields?.[key],
        disabled: extraDisabled || disableFields?.[key],
        element,
    });
}