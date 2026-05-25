/**
 * @fileoverview Defines a type for handling change events in select input forms.
 */

import {FormOnChangeHandler} from "@/common/types/form/on-change/FormOnChangeHandler.ts";
import {SingleValue} from "react-select";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {FieldValues} from "react-hook-form";

/** Type definition for a form change handler specifically for single-select components. */
export type FormSelectOnChangeHandler<TSubmit extends FieldValues, TItem = any> = FormOnChangeHandler<
    TSubmit,
    SingleValue<ReactSelectOption<TItem>>
>;