/**
 * @file Zod validation schema for moderation forms requiring a justification message.
 * @filename ModerationMessageFormSchema.ts
 */

import {z} from "zod";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validates the justification message provided in administrative moderation forms.
 * ---
 */
export const ModerationMessageFormSchema = z.object({
    /** The mandatory explanation for the administrative action being taken. */
    message: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(500, "Must be no more than 500 characters.")
    ),
});

/**
 * TypeScript type inferred from {@link ModerationMessageFormSchema}.
 * Used for typing the local state of moderation modal forms.
 */
export type ModerationMessageFormData = z.infer<typeof ModerationMessageFormSchema>;