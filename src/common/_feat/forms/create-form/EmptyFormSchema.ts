/**
 * @fileoverview Fallback Zod schema and type definitions for empty form states in the form factory.
 */

import {z} from "zod";
import {AnyValues} from "@/common/_types";

/** Placeholder empty Zod schema for form components that do not require form fields. */
export const EmptyFormSchema = z.object({});

/** Inferred TypeScript data type for the empty form schema. */
export type EmptyFormData = z.infer<typeof EmptyFormSchema>;

/** Permissive value type for the empty form data structure. */
export type EmptyFormValues = AnyValues<EmptyFormData>;