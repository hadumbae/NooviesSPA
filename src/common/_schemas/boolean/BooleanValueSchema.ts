/**
 * @fileoverview Zod schema for validating boolean values.
 */

import { z } from "zod";

/** Zod schema for a boolean value with custom error messages. */
export const BooleanValueSchema = z.boolean({
    required_error: "Required",
    invalid_type_error: "Must be a boolean",
});