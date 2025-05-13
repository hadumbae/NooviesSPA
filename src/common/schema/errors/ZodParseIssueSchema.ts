import {z} from "zod";

import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";

export const ZodParseIssueSchema = z.object({
    message: NonEmptyStringSchema,
    code: NonEmptyStringSchema.refine((code) => code in z.ZodIssueCode, "Invalid Code."),
    path: z.array(
        z.union([z.string(), z.number()], {invalid_type_error: "Must be strings or numbers."}),
        {required_error: "Required.", invalid_type_error: "Must be an array."},
    ),
});

