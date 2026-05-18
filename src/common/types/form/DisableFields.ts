/**
 * @fileoverview Defines a type for managing the disabled state of form fields.
 */

import {FieldValues} from "react-hook-form";

/** A map of form field keys to boolean values indicating if the field is disabled. */
export type DisableFields<TFormValues extends FieldValues> = Partial<Record<keyof TFormValues, boolean>>;