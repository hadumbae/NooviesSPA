/** @fileoverview Utility for conditionally rendering a list of form fields. */

import {cloneElement, ReactElement} from "react";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/** Configuration for rendering form field elements. */
type RenderFieldsConfig = {
    fields: ConditionalRenderConfig[];
};

/** Iterates through a collection of fields and clones the visible elements with an associated key. */
export function renderFields({fields}: RenderFieldsConfig): (ReactElement | null)[] {
    return fields.map(({key, render, element}) => render ? cloneElement(element, {key}) : null)
}