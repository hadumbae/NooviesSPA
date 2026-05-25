/**
 * @fileoverview Defines a type alias for form change handlers used with multi-select inputs.
 */

import {FormOnChangeHandler} from "src/common/types/form/on-change/FormOnChangeHandler.ts";
import {MultiValue} from "react-select";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {FieldValues} from "react-hook-form";

/** Function signature for handling change events in multi-select form fields. */
export type FormMultiSelectOnChangeHandler<TSubmit extends FieldValues, TItem = any> = FormOnChangeHandler<
    TSubmit,
    MultiValue<ReactSelectOption<TItem>>
>;