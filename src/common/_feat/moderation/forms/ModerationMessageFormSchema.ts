/**
 * @fileoverview Zod validation schema for moderation forms requiring a justification message.
 */

import {z} from "zod";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {AnyValues} from "@/common/types";

/** Validates the justification message provided in administrative moderation forms. */
export const ModerationMessageFormSchema = z.object({
    /** The mandatory explanation for the administrative action being taken. */
    message: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(500, "Must be no more than 500 characters.")
    ),
});

/** TypeScript type inferred from ModerationMessageFormSchema. */
export type ModerationMessageFormData = z.infer<typeof ModerationMessageFormSchema>;

/** Type representing raw input values for the moderation message form. */
export type ModerationMessageFormValues = AnyValues<ModerationMessageFormData>;