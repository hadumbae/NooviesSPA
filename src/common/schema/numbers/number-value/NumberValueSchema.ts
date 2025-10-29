import { z } from "zod";

/**
 * A schema that validates a number.
 *
 * - **Input:** a number (e.g., `1`, `3.14`).
 * - **Output:** the same number if valid.
 * - **Errors:** throws if the value is missing or not a number.
 */
export const NumberValueSchema = z.number({
    required_error: "Required.",
    invalid_type_error: "Must be a valid number.",
});

/**
 * Type inferred from `NumberValueSchema`.
 */
export type NumberValue = z.infer<typeof NumberValueSchema>;
