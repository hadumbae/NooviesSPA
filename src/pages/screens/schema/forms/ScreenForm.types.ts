import { z } from "zod";
import { ScreenFormSchema, ScreenFormValuesSchema } from "@/pages/screens/schema/forms/ScreenForm.schema.ts";

/**
 * Type representing the initial values of a screen form.
 * Mirrors the structure defined by `ScreenFormValuesSchema`.
 * Typically used for form state management (defaults, optional values).
 */
export type ScreenFormValues = z.infer<typeof ScreenFormValuesSchema>;

/**
 * Type representing a validated screen form submission.
 * Mirrors the structure defined by `ScreenFormSchema`.
 * Ensures all required fields are correctly typed and constrained.
 */
export type ScreenForm = z.infer<typeof ScreenFormSchema>;
