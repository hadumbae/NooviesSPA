/**
 * @fileoverview Zod schema for validating and coercing boolean values.
 */

import { z } from "zod";

/** Zod schema that coerces input values into booleans. */
export const CoercedBooleanValueSchema = z.coerce.boolean({
    required_error: "Required",
    invalid_type_error: "Must Be A Boolean",
});
