/**
 * @fileoverview Zod schema for a normalised string value.
 */

import {z} from "zod";

/** Zod schema that validates and ensures the input is a string. */
export const StringValueSchema = z.string({
    required_error: "Required",
    invalid_type_error: "Must Be A String",
});

/** Inferred TypeScript type for StringValueSchema. */
export type StringValue = z.infer<typeof StringValueSchema>;
