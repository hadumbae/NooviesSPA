import {z} from "zod";
import {TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";

const ZodParseIssueSchema = z.object({
    message: TrimmedStringSchema,
    code: TrimmedStringSchema.refine((code) => code in z.ZodIssueCode, "Invalid Code."),
    path: z.array(
        z.union([z.string(), z.number()], {invalid_type_error: "Must be strings or numbers."}),
        {required_error: "Required.", invalid_type_error: "Must be an array."},
    ),
});

export const ZodParseErrorResponseSchema = z.object({
    message: TrimmedStringSchema,
    errors: z.array(ZodParseIssueSchema).length(1, "Must have at least one issue."),
});

export type ZodParseErrorResponse = z.infer<typeof ZodParseErrorResponseSchema>;