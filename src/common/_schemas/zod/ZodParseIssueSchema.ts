/**
 * @fileoverview Schema and type definitions for Zod parsing issues.
 */

import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/_schemas/strings/simple-strings/NonEmptyStringSchema.ts";

/** Zod schema for validating individual issues returned during Zod parsing. */
export const ZodParseIssueSchema = z.object({
    message: NonEmptyStringSchema,
    code: NonEmptyStringSchema.refine((code) => code in z.ZodIssueCode, "Invalid Code."),
    path: z.array(
        z.union([z.string(), z.number()], { invalid_type_error: "Must be strings or numbers." }),
        { required_error: "Required.", invalid_type_error: "Must be an array." },
    ),
});

/** TypeScript type inferred from the ZodParseIssueSchema. */
export type ZodParseIssue = z.infer<typeof ZodParseIssueSchema>;
