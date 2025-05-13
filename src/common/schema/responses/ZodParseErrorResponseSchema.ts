import {z} from "zod";
import {ZodParseIssueSchema} from "@/common/schema/errors/ZodParseIssueSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";

export const ZodParseErrorResponseSchema = z.object({
    message: NonEmptyStringSchema,
    errors: z.array(ZodParseIssueSchema).length(1, "Must have at least one issue."),
});

export type ZodParseErrorResponse = z.infer<typeof ZodParseErrorResponseSchema>;