/** @fileoverview Utility for conditionally rendering a list of form fields. */

import {cloneElement, ReactElement} from "react";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";

/** Configuration for rendering form field elements. */
type RenderFieldsConfig = {
    fields: HookFormField[];
};

/** Iterates through a collection of fields and clones the visible elements with an associated key. */
export function renderFields({fields}: RenderFieldsConfig): (ReactElement | null)[] {
    return fields.map(({key, render, element}) => render ? cloneElement(element, {key}) : null)
}