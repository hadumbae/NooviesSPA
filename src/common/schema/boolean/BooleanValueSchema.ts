import { z } from "zod";

/**
 * A schema that validates a strict boolean value.
 *
 * - **Input:** must be a boolean (`true` or `false`).
 * - **Output:** the same boolean value.
 * - **Errors:** required or invalid type errors if input is missing or not a boolean.
 */
export const BooleanValueSchema = z.boolean({
    required_error: "Required",
    invalid_type_error: "Must be a boolean",
});
