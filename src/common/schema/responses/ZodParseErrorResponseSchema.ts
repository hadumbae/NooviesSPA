import {z} from "zod";
import {TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {ZodParseIssueSchema} from "@/common/schema/errors/ZodParseIssueSchema.ts";

export const ZodParseErrorResponseSchema = z.object({
    message: TrimmedStringSchema,
    errors: z.array(ZodParseIssueSchema).length(1, "Must have at least one issue."),
});

export type ZodParseErrorResponse = z.infer<typeof ZodParseErrorResponseSchema>;