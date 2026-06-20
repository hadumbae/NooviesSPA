/**
 * @fileoverview Zod schema and type for strings that require automatic whitespace trimming.
 */

import { z } from "zod";

/** Zod schema that validates a string and trims leading and trailing whitespace. */
export const TrimmedStringSchema = z
    .string({ required_error: "Required", invalid_type_error: "Must be a string." })
    .trim();

/** TypeScript type inferred from TrimmedStringSchema. */
export type TrimmedString = z.infer<typeof TrimmedStringSchema>;
