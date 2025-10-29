import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * A Zod schema describing the structure of a single Zod validation issue.
 *
 * - **Input:** an object with `message`, `code`, and `path` fields.
 * - **Output:** a validated Zod issue object compatible with `z.ZodIssue`.
 *
 * Fields:
 * - `message`: Non-empty string describing the error.
 * - `code`: A valid `ZodIssueCode` key.
 * - `path`: Array of strings or numbers indicating where the error occurred.
 */
export const ZodParseIssueSchema = z.object({
    message: NonEmptyStringSchema,
    code: NonEmptyStringSchema.refine((code) => code in z.ZodIssueCode, "Invalid Code."),
    path: z.array(
        z.union([z.string(), z.number()], { invalid_type_error: "Must be strings or numbers." }),
        { required_error: "Required.", invalid_type_error: "Must be an array." },
    ),
});
