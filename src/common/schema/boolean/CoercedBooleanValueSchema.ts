import { z } from "zod";

/**
 * A schema that coerces input to a boolean value.
 *
 * - **Input:** any value that can be coerced to boolean (`0`, `1`, `"true"`, `"false"`, etc.).
 * - **Output:** a boolean (`true` or `false`).
 * - **Errors:** required or invalid type errors if coercion fails.
 */
export const CoercedBooleanValueSchema = z.coerce.boolean({
    required_error: "Required",
    invalid_type_error: "Must be a boolean",
});
