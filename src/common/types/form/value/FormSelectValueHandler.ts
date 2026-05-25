/**
 * @fileoverview Defines a handler type for processing React Select option values within a form field.
 */

import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {ControllerRenderProps, FieldValues, Path} from "react-hook-form";

/** Function type that maps selected options to a specific form field value format. */
export type FormSelectValueHandler<TSubmit extends FieldValues, TValue = any, TReturns = ReactSelectOption<TValue>> = (
    values: ReactSelectOption<TValue>[],
    field: ControllerRenderProps<TSubmit, Path<TSubmit>>
) => TReturns | null;