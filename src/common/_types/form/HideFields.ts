/**
 * @fileoverview Type definition for specifying form fields to hide in React Hook Form components.
 */

import {FieldValues} from "react-hook-form";

/** Represents a mapping of form field keys to boolean flags indicating if a field should be hidden. */
export type HideFields<TFormValues extends FieldValues> = Partial<Record<keyof TFormValues, boolean>>;