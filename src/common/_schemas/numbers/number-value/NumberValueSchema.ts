/**
 * @fileoverview Zod schema for validating generic numeric values.
 */

import { z } from "zod";

/** Zod schema for validating numeric values with custom error messages. */
export const NumberValueSchema = z.number({
    required_error: "Required.",
    invalid_type_error: "Must be a valid number.",
});

/** Type inferred from the NumberValueSchema. */
export type NumberValue = z.infer<typeof NumberValueSchema>;
