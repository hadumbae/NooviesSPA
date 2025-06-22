import {z} from "zod";
import {SeatFormSchema, SeatFormValuesSchema} from "@/pages/seats/schema/form/SeatForm.schema.ts";

/**
 * Type representing the raw values from the seat form before validation.
 *
 * This corresponds to the shape defined by `SeatFormValuesSchema`, where
 * each field may still be in a "starter" state (e.g., empty string, null, etc.).
 *
 * Typically used:
 * - For initializing form inputs
 * - As the type for form state (`useForm<SeatFormValues>()`)
 * - Before strict validation is applied
 *
 * @see SeatFormValuesSchema
 */
export type SeatFormValues = z.infer<typeof SeatFormValuesSchema>;

/**
 * Type representing the validated and transformed seat form submission.
 *
 * This is inferred from `SeatFormSchema`, which applies strict rules
 * such as non-empty strings, valid enums, non-negative numbers, and
 * proper ID formatting.
 *
 * Typically used:
 * - As the final validated data sent to the backend
 * - When defining submission handlers or API payloads
 *
 * @see SeatFormSchema
 */
export type SeatForm = z.infer<typeof SeatFormSchema>;