/**
 * @fileoverview Defines a type for handling custom change events within react-hook-form controllers.
 */

import {ControllerRenderProps, FieldValues, Path} from "react-hook-form";

/** Type definition for a function that handles form field value changes. */
export type FormOnChangeHandler<TSubmit extends FieldValues, TItem = any> = (
    val: TItem | null,
    field: ControllerRenderProps<TSubmit, Path<TSubmit>>,
) => void;

